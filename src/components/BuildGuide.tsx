import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: "Gather Materials",
    content: "Review the Spark components: 2 craft sticks, sticky foam strips, a paper clip, a propeller, a latex-free rubber band, and cardstock. You'll need to supply scissors and drawing materials."
  },
  {
    title: "Start with Sticks",
    content: "Align the craft sticks at the center and secure them using two sticky foam strips. The foam wraps tightly around the overlap to form the main body (fuselage) of the flying machine."
  },
  {
    title: "Create the Engine Hook",
    content: "Bend the paper clip into an \"L\" shape. Attach it to one end of the fuselage using another foam strip. This will serve as the hook for the rubber band, acting as the engine of the flying machine."
  },
  {
    title: "Attach Your Propeller",
    content: "On the opposite end of the fuselage, attach the propeller securely. This step forms the flying machine's propulsion system."
  },
  {
    title: "Add the Wing",
    content: "Using the cardstock, encourage learners to draw, cut, and attach a wing to the fuselage. Highlight that larger wings might add weight, affecting flight. Pro Tip: Test different wing shapes and sizes to explore aerodynamics."
  },
  {
    title: "Connect the Rubber Band",
    content: "Hook one end of the rubber band to the paper clip and the other to the small hook on the propeller. This can be challenging, so encourage patience. Pro Tip: Twist the propeller clockwise multiple times to tighten the rubber band, storing elastic potential energy."
  },
  {
    title: "Prepare for Launch",
    content: "Demonstrate the \"tick-tock technique\" to allow the propeller to generate momentum and lift prior to launching your flying machine. With one hand on the propeller and the other holding near the paperclip, release the propeller (\"tick\") to let it spin very briefly - then lightly launch the fuselage (\"tock\")."
  },
  {
    title: "Test and Iterate",
    content: "Have learners test their flying machines in a safe, open area. Encourage them to tweak wing shapes, sizes, and number of rubber band twists to observe different flight outcomes."
  }
];

export default function BuildGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Build Your Flying Machine</h2>
        <p className="mt-4 text-lg text-gray-600">
          Follow these steps to create your own flying machine. Take your time and remember that practice makes perfect!
        </p>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                  {index + 1}
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  {step.title}
                  <CheckCircle2 className="w-5 h-5 ml-2 text-green-500" />
                </h3>
                <p className="mt-2 text-gray-600">{step.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Pro Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-800">
          <li>Ensure the rubber band is wound tightly (at least 70 twists, but 100 is better!)</li>
          <li>Practice the "tick-tock" technique multiple times</li>
          <li>Make sure the propeller turns clockwise for optimal flight</li>
          <li>Keep the wing design simple at first, then experiment</li>
        </ul>
      </div>
    </div>
  );
}