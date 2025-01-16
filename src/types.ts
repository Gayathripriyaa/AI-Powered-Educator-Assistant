export interface InterviewResponse {
  time: string;
  gradeLevel: string;
  environment: string;
  confidence: string;
  assessment: boolean;
}

export interface LessonPlan {
  title: string;
  objectives: string[];
  materials: string[];
  procedure: string[];
  extensions: string[];
}

export interface Assessment {
  questions: {
    question: string;
    type: 'multiple-choice' | 'open-ended';
    options?: string[];
  }[];
}