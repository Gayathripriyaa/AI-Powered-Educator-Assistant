import React, { useState } from 'react';
import { Rocket, Book, Wrench, HelpCircle, Lightbulb, ClipboardCheck } from 'lucide-react';
import InterviewForm from './components/InterviewForm';
import Results from './components/Results';
import BuildGuide from './components/BuildGuide';
import FacilitationGuide from './components/FacilitationGuide';
import AssessmentGuide from './components/AssessmentGuide';
import type { InterviewResponse, LessonPlan, Assessment } from './types';
import { generateAIResponse } from './services/aiService';

function App() {
  const [responses, setResponses] = useState<InterviewResponse | null>(null);
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [activeTab, setActiveTab] = useState('interview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formResponses: InterviewResponse) => {
    setLoading(true);
    setError(null);
    try {
      const aiResponse = await generateAIResponse(formResponses);
      setResponses(formResponses);
      setLessonPlan(aiResponse.lessonPlan);
      setAssessment(aiResponse.assessment || null);
    } catch (err) {
      setError('Unable to generate lesson plan. Please try again later.');
      console.error('Error generating lesson plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'interview', label: 'Interview', icon: Book },
    { id: 'build', label: 'Build Guide', icon: Wrench },
    { id: 'facilitate', label: 'Facilitation', icon: Lightbulb },
    { id: 'assess', label: 'Assessment', icon: ClipboardCheck },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Rocket className="h-8 w-8 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Flying Machines Guide
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              FutureMakers Flying Machines
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'interview' && (
          !responses ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Design Your Flying Machines Lesson
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Answer a few questions to get a customized lesson plan for teaching aerodynamics and engineering through hands-on flying machine activities.
                </p>
              </div>
              <InterviewForm onSubmit={handleSubmit} disabled={loading} />
              {loading && (
                <div className="mt-4 text-center text-gray-600">
                  Generating your customized lesson plan...
                </div>
              )}
              {error && (
                <div className="mt-4 text-center text-red-600">
                  {error}
                </div>
              )}
            </>
          ) : (
            <Results
              responses={responses}
              lessonPlan={lessonPlan!}
              assessment={assessment}
            />
          )
        )}
        {activeTab === 'build' && <BuildGuide />}
        {activeTab === 'facilitate' && <FacilitationGuide />}
        {activeTab === 'assess' && <AssessmentGuide />}
        {activeTab === 'faq' && (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">What if the machines just won't fly?</h3>
                <p>Biggest culprit - not allowing the propeller to build momentum and lift prior to launching. Try adjusting the timing of the release using the "tick-tock" technique. Second biggest culprit - just not enough stored potential energy. Have learners turn the propeller until they can see many bumps in the rubber band.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">How can I adapt this project for older students?</h3>
                <p>Incorporate the iterative design process using different wing and fuselage designs, as outlined in the Flying Machines Extension document and explore how each iteration impacts flight. Older learners are all for testing and repeating, instead of one and done!</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Is this project reusable/extendable?</h3>
                <p>Yes! By using masking tape to attach different wing designs, learners can iterate on their designs without damaging the core fuselage, enabling a deeper exploration of the engineering design process. Each learner will keep their flying machine - so it's a perfect "make-and-take" activity for further playful engineering at home.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;