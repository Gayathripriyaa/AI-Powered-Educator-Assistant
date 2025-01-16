import OpenAI from 'openai';
import type { InterviewResponse, LessonPlan, Assessment } from '../types';

// Rate limiting implementation
const rateLimiter = {
  lastRequestTime: 0,
  requestCount: 0,
  resetTime: 0,
  dailyCount: 0,
  dailyResetTime: 0,

  async checkRateLimit() {
    const now = Date.now();
    
    // Reset daily counter if needed
    if (now > this.dailyResetTime) {
      this.dailyCount = 0;
      this.dailyResetTime = now + 24 * 60 * 60 * 1000; // 24 hours
    }

    // Check daily limit
    if (this.dailyCount >= 200) {
      const resetIn = Math.ceil((this.dailyResetTime - now) / (1000 * 60 * 60));
      throw new Error(`Daily limit reached. Resets in ${resetIn} hours.`);
    }

    // Reset minute counter if needed
    if (now > this.resetTime) {
      this.requestCount = 0;
      this.resetTime = now + 60 * 1000; // 1 minute
    }

    // Check requests per minute
    if (this.requestCount >= 3) {
      const waitTime = Math.ceil((this.resetTime - now) / 1000);
      throw new Error(`Please wait ${waitTime} seconds before trying again.`);
    }

    // Ensure minimum time between requests (20 seconds)
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < 20000) {
      await new Promise(resolve => setTimeout(resolve, 20000 - timeSinceLastRequest));
    }

    this.requestCount++;
    this.dailyCount++;
    this.lastRequestTime = Date.now();
  }
};

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface AIResponse {
  lessonPlan: LessonPlan;
  assessment?: Assessment;
}

interface AIFeedback {
  suggestions: string[];
  improvements: string[];
  tips: string[];
}

export async function generateAIResponse(responses: InterviewResponse): Promise<AIResponse> {
  await rateLimiter.checkRateLimit();

  const prompt = `Create a detailed flying machines lesson plan and assessment for ${responses.gradeLevel} students. 
Available time: ${responses.time}
Learning environment: ${responses.environment}
Teacher confidence level: ${responses.confidence}

The lesson plan should include:
1. A title
2. Learning objectives that incorporate STEM concepts and hands-on learning
3. Required materials with specific quantities and alternatives
4. Detailed step-by-step procedure with time allocations
5. Extension activities for different skill levels

${responses.assessment ? 'Include age-appropriate assessment questions that test both knowledge and application.' : ''}

Format the response as a JSON object with:
{
  "lessonPlan": {
    "title": string,
    "objectives": string[],
    "materials": string[],
    "procedure": string[],
    "extensions": string[]
  }${responses.assessment ? ',\n  "assessment": {\n    "questions": Array<{\n      "question": string,\n      "type": "multiple-choice" | "open-ended",\n      "options"?: string[]\n    }>\n  }' : ''}
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an expert STEM educator specializing in hands-on learning and project-based instruction. You excel at creating engaging, age-appropriate content that balances fun with educational value."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content) as AIResponse;
}

export async function getAIFeedback(lessonPlan: LessonPlan): Promise<AIFeedback> {
  await rateLimiter.checkRateLimit();

  const prompt = `Analyze this lesson plan and provide detailed feedback:
${JSON.stringify(lessonPlan, null, 2)}

Consider:
1. Age appropriateness
2. Time management
3. Safety considerations
4. Learning effectiveness
5. Engagement level
6. Potential challenges

Provide specific, actionable feedback formatted as a JSON object with:
{
  "suggestions": string[],
  "improvements": string[],
  "tips": string[]
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an experienced STEM education consultant who specializes in reviewing and improving lesson plans."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content) as AIFeedback;
}

export async function getAIExplanation(concept: string): Promise<string> {
  await rateLimiter.checkRateLimit();

  const prompt = `Explain this STEM concept in an engaging, age-appropriate way: ${concept}

Consider:
1. Use simple, clear language
2. Include real-world examples
3. Connect to flying machines where relevant
4. Make it engaging and memorable`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a gifted STEM educator known for making complex concepts easy to understand through clear explanations and relatable examples."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return completion.choices[0].message.content || "Loading explanation...";
}