import React from 'react';
import { GraduationCap } from 'lucide-react';

const gradeAssessments = [
  {
    grade: "Kindergarten",
    questions: [
      "What did you like most about flying your machine?",
      "What is one thing you could try to make your machine fly better?"
    ]
  },
  {
    grade: "1st Grade",
    questions: [
      "What happened when you made your flying machine move through the air?",
      "What is one way you could change your machine to make it fly differently?"
    ]
  },
  {
    grade: "2nd Grade",
    questions: [
      "What did you notice about how your flying machine moved through the air?",
      "If you could make another flying machine, what would you do differently?"
    ]
  },
  {
    grade: "3rd Grade",
    questions: [
      "What did you learn about how your flying machine works?",
      "How could you change your machine to make it fly farther or faster?"
    ]
  },
  {
    grade: "4th Grade",
    questions: [
      "What forces (like push, pull, or air) did you notice affecting your flying machine?",
      "If you wanted your machine to fly farther, what would you change or add?"
    ]
  },
  {
    grade: "5th Grade",
    questions: [
      "How did you use what you know about forces to design your flying machine?",
      "What adjustments would you make to improve its performance?"
    ]
  },
  {
    grade: "Middle School",
    questions: [
      "How did the design of your flying machine impact the way it moved through the air?",
      "What changes would you make to the design if you wanted it to fly with more stability or accuracy?"
    ]
  }
];

export default function AssessmentGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Assessment Guide</h2>
        <p className="mt-4 text-lg text-gray-600">
          Grade-level appropriate exit tickets to assess understanding and encourage reflection.
        </p>
      </div>

      <div className="space-y-6">
        {gradeAssessments.map((grade, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <GraduationCap className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">{grade.grade}</h3>
            </div>
            <div className="space-y-4">
              {grade.questions.map((question, qIndex) => (
                <div key={qIndex} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <span className="font-medium">Q{qIndex + 1}:</span> {question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Assessment Guidelines</h3>
        <ul className="space-y-2 text-blue-800">
          <li>• Questions are designed to be age-appropriate and developmentally suitable</li>
          <li>• Focus on reflection and critical thinking</li>
          <li>• Encourage learners to think about improvements and applications</li>
          <li>• Use clear, engaging language appropriate for each grade level</li>
        </ul>
      </div>
    </div>
  );
}