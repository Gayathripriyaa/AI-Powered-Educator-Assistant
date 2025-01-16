import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { InterviewResponse } from '../types';

const questions = [
  {
    id: 'time',
    question: 'How much time do you have for this activity?',
    type: 'text',
    placeholder: 'e.g., 45 minutes, 1 hour',
  },
  {
    id: 'gradeLevel',
    question: 'What grade(s) or age group(s) are your learners?',
    type: 'text',
    placeholder: 'e.g., 5th grade, 10-12 years old',
  },
  {
    id: 'environment',
    question: 'What is the learning environment?',
    type: 'text',
    placeholder: 'e.g., classroom, library, after-school',
  },
  {
    id: 'confidence',
    question: 'How confident are you in using hands-on projects?',
    type: 'select',
    options: ['Very confident', 'Somewhat confident', 'Not very confident', 'Need support'],
  },
  {
    id: 'assessment',
    question: 'Do you want to include an assessment?',
    type: 'radio',
    options: ['Yes', 'No'],
  },
];

interface Props {
  onSubmit: (responses: InterviewResponse) => void;
  disabled?: boolean;
}

export default function InterviewForm({ onSubmit, disabled }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Partial<InterviewResponse>>({});

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      onSubmit(responses as InterviewResponse);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(curr => curr - 1);
  };

  const handleInputChange = (value: string | boolean) => {
    setResponses(prev => ({
      ...prev,
      [questions[currentStep].id]: value,
    }));
  };

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">
            Question {currentStep + 1} of {questions.length}
          </span>
          <div className="h-2 flex-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {currentQuestion.question}
        </h3>

        <div className="space-y-4">
          {currentQuestion.type === 'text' && (
            <input
              type="text"
              value={responses[currentQuestion.id] as string || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}

          {currentQuestion.type === 'select' && (
            <select
              value={responses[currentQuestion.id] as string || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              {currentQuestion.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {currentQuestion.type === 'radio' && (
            <div className="space-y-2">
              {currentQuestion.options?.map((option) => (
                <label key={option} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option}
                    checked={responses[currentQuestion.id] === (option === 'Yes')}
                    onChange={() => handleInputChange(option === 'Yes')}
                    className="w-4 h-4 text-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={disabled}
          className={`flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {isLastQuestion ? 'Submit' : 'Next'}
          {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-1" />}
        </button>
      </div>
    </div>
  );
}