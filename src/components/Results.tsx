import React, { useState, useEffect } from 'react';
import type { InterviewResponse, LessonPlan, Assessment } from '../types';
import { Book, CheckCircle2, ClipboardList, Lightbulb, HelpCircle } from 'lucide-react';
import { getAIFeedback, getAIExplanation } from '../services/aiService';

interface Props {
  responses: InterviewResponse;
  lessonPlan: LessonPlan;
  assessment?: Assessment;
}

export default function Results({ responses, lessonPlan, assessment }: Props) {
  const [feedback, setFeedback] = useState<{
    suggestions: string[];
    improvements: string[];
    tips: string[];
  } | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFeedback = async () => {
      const result = await getAIFeedback(lessonPlan);
      setFeedback(result);
    };
    loadFeedback();
  }, [lessonPlan]);

  const handleConceptExplanation = async (concept: string) => {
    setSelectedConcept(concept);
    setLoading(true);
    const explanation = await getAIExplanation(concept);
    setExplanation(explanation);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Interview Responses</h2>
        </div>
        <dl className="grid grid-cols-1 gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-500">Available Time</dt>
            <dd className="mt-1 text-lg text-gray-900">{responses.time}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Grade Level</dt>
            <dd className="mt-1 text-lg text-gray-900">{responses.gradeLevel}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Learning Environment</dt>
            <dd className="mt-1 text-lg text-gray-900">{responses.environment}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Confidence Level</dt>
            <dd className="mt-1 text-lg text-gray-900">{responses.confidence}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Include Assessment</dt>
            <dd className="mt-1 text-lg text-gray-900">{responses.assessment ? 'Yes' : 'No'}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Book className="w-6 h-6 text-blue-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Generated Lesson Plan</h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{lessonPlan.title}</h3>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">Learning Objectives</h4>
            <ul className="list-disc list-inside space-y-2">
              {lessonPlan.objectives.map((objective, index) => (
                <li key={index} className="text-gray-600 cursor-pointer hover:text-blue-600" onClick={() => handleConceptExplanation(objective)}>
                  {objective}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">Materials Needed</h4>
            <ul className="list-disc list-inside space-y-2">
              {lessonPlan.materials.map((material, index) => (
                <li key={index} className="text-gray-600">{material}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">Procedure</h4>
            <ol className="list-decimal list-inside space-y-2">
              {lessonPlan.procedure.map((step, index) => (
                <li key={index} className="text-gray-600">{step}</li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">Extensions</h4>
            <ul className="list-disc list-inside space-y-2">
              {lessonPlan.extensions.map((extension, index) => (
                <li key={index} className="text-gray-600">{extension}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {selectedConcept && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Lightbulb className="w-6 h-6 text-yellow-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Concept Explanation</h2>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">{selectedConcept}</h3>
            {loading ? (
              <p className="text-gray-600">Loading explanation...</p>
            ) : (
              <p className="text-gray-600">{explanation}</p>
            )}
          </div>
        </div>
      )}

      {feedback && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <HelpCircle className="w-6 h-6 text-purple-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">AI Feedback</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Suggestions</h3>
              <ul className="list-disc list-inside space-y-2">
                {feedback.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-600">{suggestion}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Improvements</h3>
              <ul className="list-disc list-inside space-y-2">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="text-gray-600">{improvement}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Teaching Tips</h3>
              <ul className="list-disc list-inside space-y-2">
                {feedback.tips.map((tip, index) => (
                  <li key={index} className="text-gray-600">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {assessment && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <ClipboardList className="w-6 h-6 text-purple-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Assessment Questions</h2>
          </div>
          <div className="space-y-6">
            {assessment.questions.map((q, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <p className="text-lg font-medium text-gray-800 mb-3">
                  {index + 1}. {q.question}
                </p>
                {q.type === 'multiple-choice' && q.options && (
                  <div className="ml-6 space-y-2">
                    {q.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center">
                        <span className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full mr-2">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span className="text-gray-600">{option}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}