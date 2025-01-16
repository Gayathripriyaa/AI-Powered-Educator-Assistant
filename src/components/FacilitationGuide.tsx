import React from 'react';
import { Clock, Users, Lightbulb, AlertTriangle } from 'lucide-react';

export default function FacilitationGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Facilitate With Confidence</h2>
        <p className="mt-4 text-lg text-gray-600">
          Guide learners through their flying machine journey with these helpful tips and strategies.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold">Classroom Planning</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• 30-minute base activity</li>
            <li>• Can be extended with additional activities</li>
            <li>• Organize workspaces with easy access to materials</li>
            <li>• Ensure extra cardstock for wing modifications</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Facilitation Tips</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Let learners take ownership of designs</li>
            <li>• Use open-ended questions</li>
            <li>• Promote student-led inquiry</li>
            <li>• Emphasize perseverance and teamwork</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
            <h3 className="text-lg font-semibold">Troubleshooting Tips</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Ensure clockwise propeller rotation</li>
            <li>• Check rubber band tension (70-100 twists)</li>
            <li>• Practice "tick-tock" technique</li>
            <li>• Encourage peer feedback</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold">Early Finisher Activities</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Experiment with new wing shapes</li>
            <li>• Combine multiple designs</li>
            <li>• Test different flight patterns</li>
            <li>• Document and share findings</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Reflective Questions</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">"What's the difference between potential energy and kinetic energy? Give me examples."</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">"What challenges did you encounter, and how did you solve them?"</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">"What changes would you make if you could, and why?"</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">"What pro tips would you offer to other learners?"</p>
          </div>
        </div>
      </div>
    </div>
  );
}