import type { InterviewResponse, Assessment } from '../types';

// Helper to get exact grade level
function getExactGrade(gradeLevel: string): string {
  const grade = gradeLevel.toLowerCase();
  if (grade.includes('k') || grade.includes('kind')) return 'kindergarten';
  if (grade.includes('1') || grade.includes('first')) return '1st';
  if (grade.includes('2') || grade.includes('second')) return '2nd';
  if (grade.includes('3') || grade.includes('third')) return '3rd';
  if (grade.includes('4') || grade.includes('fourth')) return '4th';
  if (grade.includes('5') || grade.includes('fifth')) return '5th';
  if (grade.includes('middle') || grade.includes('6') || grade.includes('7') || grade.includes('8')) return 'middle';
  return 'middle'; // Default to middle school if unclear
}

// Get grade-specific questions
function getGradeSpecificQuestions(grade: string): Assessment['questions'] {
  const questions: Record<string, Assessment['questions']> = {
    'kindergarten': [
      {
        question: "What did you like most about flying your machine?",
        type: 'open-ended'
      },
      {
        question: "What is one thing you could try to make your machine fly better?",
        type: 'open-ended'
      }
    ],
    '1st': [
      {
        question: "What happened when you made your flying machine move through the air?",
        type: 'open-ended'
      },
      {
        question: "What is one way you could change your machine to make it fly differently?",
        type: 'open-ended'
      }
    ],
    '2nd': [
      {
        question: "What did you notice about how your flying machine moved through the air?",
        type: 'open-ended'
      },
      {
        question: "If you could make another flying machine, what would you do differently?",
        type: 'open-ended'
      }
    ],
    '3rd': [
      {
        question: "What did you learn about how your flying machine works?",
        type: 'open-ended'
      },
      {
        question: "How could you change your machine to make it fly farther or faster?",
        type: 'open-ended'
      }
    ],
    '4th': [
      {
        question: "What forces (like push, pull, or air) did you notice affecting your flying machine?",
        type: 'open-ended'
      },
      {
        question: "If you wanted your machine to fly farther, what would you change or add?",
        type: 'open-ended'
      }
    ],
    '5th': [
      {
        question: "How did you use what you know about forces to design your flying machine?",
        type: 'open-ended'
      },
      {
        question: "What adjustments would you make to improve its performance?",
        type: 'open-ended'
      }
    ],
    'middle': [
      {
        question: "How did the design of your flying machine impact the way it moved through the air?",
        type: 'open-ended'
      },
      {
        question: "What changes would you make to the design if you wanted it to fly with more stability or accuracy?",
        type: 'open-ended'
      }
    ]
  };

  return questions[grade] || questions['middle'];
}

// Adjust question complexity based on teacher confidence
function adjustQuestionComplexity(questions: Assessment['questions'], confidence: string): Assessment['questions'] {
  const isLowConfidence = confidence.toLowerCase().includes('not very') || 
    confidence.toLowerCase().includes('need support');

  if (isLowConfidence) {
    return questions.map(q => ({
      ...q,
      question: q.question + ' (There are no wrong answers, share your thoughts!)'
    }));
  }
  return questions;
}

// Adapt questions for different learning environments
function adaptForEnvironment(questions: Assessment['questions'], environment: string): Assessment['questions'] {
  const isInformal = environment.toLowerCase().includes('after-school') || 
    environment.toLowerCase().includes('library') ||
    environment.toLowerCase().includes('camp');

  if (isInformal) {
    return questions.map(q => ({
      ...q,
      question: q.question.replace(/performance|results/gi, 'experience')
    }));
  }
  return questions;
}

export function generateCustomizedAssessment(responses: InterviewResponse): Assessment {
  const grade = getExactGrade(responses.gradeLevel);
  let questions = getGradeSpecificQuestions(grade);

  // Apply modifications based on other responses
  questions = adjustQuestionComplexity(questions, responses.confidence);
  questions = adaptForEnvironment(questions, responses.environment);

  // Add an optional reflection question for longer sessions
  const availableMinutes = parseInt(responses.time) || 30;
  if (availableMinutes >= 45) {
    questions.push({
      question: "What was your favorite part of today's flying machine activity?",
      type: 'open-ended'
    });
  }

  return { questions };
}