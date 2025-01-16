import type { InterviewResponse, LessonPlan } from '../types';

// Helper to get exact grade level (matching assessment system)
function getExactGrade(gradeLevel: string): string {
  const grade = gradeLevel.toLowerCase();
  if (grade.includes('k') || grade.includes('kind')) return 'kindergarten';
  if (grade.includes('1') || grade.includes('first')) return '1st';
  if (grade.includes('2') || grade.includes('second')) return '2nd';
  if (grade.includes('3') || grade.includes('third')) return '3rd';
  if (grade.includes('4') || grade.includes('fourth')) return '4th';
  if (grade.includes('5') || grade.includes('fifth')) return '5th';
  if (grade.includes('middle') || grade.includes('6') || grade.includes('7') || grade.includes('8')) return 'middle';
  return 'middle';
}

// Grade-specific lesson content
function getGradeSpecificContent(grade: string): Partial<LessonPlan> {
  const plans: Record<string, Partial<LessonPlan>> = {
    'kindergarten': {
      title: "Let's Make Things Fly!",
      objectives: [
        "Learn about how things move through the air",
        "Build a simple flying machine",
        "Practice following step-by-step instructions",
        "Share what we discover with friends"
      ],
      procedure: [
        "Circle time: Talk about things that fly (10 minutes)",
        "Watch teacher show how to make a flying machine (10 minutes)",
        "Draw your flying machine idea (10 minutes)",
        "Build your flying machine together (20 minutes)",
        "Play and test your flying machine (15 minutes)",
        "Show and tell about your flying machine (10 minutes)"
      ],
      extensions: [
        "Draw a picture of your flying machine",
        "Try different decorations on your wings",
        "Make up a story about your flying machine"
      ]
    },
    '1st': {
      title: "Flying Machines: Moving Through Air",
      objectives: [
        "Discover how things move through air",
        "Create and test a flying machine",
        "Observe how changes affect flight",
        "Share observations with classmates"
      ],
      procedure: [
        "Discussion about flying things we know (10 minutes)",
        "Watch flying machine demonstration (10 minutes)",
        "Plan your flying machine (15 minutes)",
        "Build time (20 minutes)",
        "Test flights (15 minutes)",
        "Share what we learned (10 minutes)"
      ],
      extensions: [
        "Try different wing shapes",
        "Count how many spins your propeller makes",
        "Make a poster about your flying machine"
      ]
    },
    '2nd': {
      title: "Flying Machines: Air and Motion",
      objectives: [
        "Explore how air affects moving objects",
        "Build and test a flying machine",
        "Make observations about flight patterns",
        "Communicate findings with others"
      ],
      procedure: [
        "Explore air and motion concepts (15 minutes)",
        "Flying machine demonstration (10 minutes)",
        "Design planning (15 minutes)",
        "Construction time (20 minutes)",
        "Testing and observing (15 minutes)",
        "Group sharing (10 minutes)"
      ],
      extensions: [
        "Test your machine at different heights",
        "Measure how far it flies",
        "Keep a flight journal"
      ]
    },
    '3rd': {
      title: "Flying Machines: Forces and Motion",
      objectives: [
        "Understand basic forces affecting flight",
        "Design and build a flying machine",
        "Test and modify designs",
        "Record and share results"
      ],
      procedure: [
        "Introduction to forces in flight (15 minutes)",
        "Demonstration and discussion (10 minutes)",
        "Design planning (15 minutes)",
        "Building phase (20 minutes)",
        "Testing and modifications (15 minutes)",
        "Results sharing (10 minutes)"
      ],
      extensions: [
        "Investigate different launch angles",
        "Compare flight distances",
        "Create a flight data chart"
      ]
    },
    '4th': {
      title: "Flying Machines: Engineering and Forces",
      objectives: [
        "Analyze forces affecting flight",
        "Engineer a flying machine",
        "Conduct flight tests",
        "Document and present findings"
      ],
      procedure: [
        "Forces in flight lesson (15 minutes)",
        "Engineering demonstration (10 minutes)",
        "Design process (15 minutes)",
        "Construction (20 minutes)",
        "Testing and data collection (15 minutes)",
        "Presentations (10 minutes)"
      ],
      extensions: [
        "Study the effect of weight on flight",
        "Graph flight distances",
        "Write a technical report"
      ]
    },
    '5th': {
      title: "Flying Machines: Aerodynamics and Engineering",
      objectives: [
        "Apply principles of aerodynamics",
        "Design and construct a flying machine",
        "Conduct controlled tests",
        "Analyze and present results"
      ],
      procedure: [
        "Aerodynamics principles (15 minutes)",
        "Engineering demonstration (10 minutes)",
        "Technical design (15 minutes)",
        "Precision construction (20 minutes)",
        "Scientific testing (15 minutes)",
        "Data presentation (10 minutes)"
      ],
      extensions: [
        "Analyze wing efficiency",
        "Calculate average flight distances",
        "Create a scientific poster"
      ]
    },
    'middle': {
      title: "Advanced Flying Machines: Engineering and Physics",
      objectives: [
        "Apply physics principles to flight design",
        "Engineer an optimized flying machine",
        "Conduct systematic testing",
        "Analyze and present findings"
      ],
      procedure: [
        "Physics of flight discussion (15 minutes)",
        "Engineering principles demo (10 minutes)",
        "Technical design phase (15 minutes)",
        "Precision construction (20 minutes)",
        "Systematic testing (15 minutes)",
        "Data analysis and presentation (10 minutes)"
      ],
      extensions: [
        "Study drag coefficients",
        "Calculate thrust-to-weight ratios",
        "Create an engineering report"
      ]
    }
  };

  return plans[grade] || plans['middle'];
}

// Modify time allocation based on available time
function adjustTimeAllocation(procedure: string[], time: string): string[] {
  const availableMinutes = parseInt(time) || 30;
  const totalSteps = procedure.length;
  
  if (availableMinutes < 30) {
    const timePerStep = Math.floor(availableMinutes / totalSteps);
    return procedure.map(step => 
      step.replace(/\(\d+[^)]*\)/, `(${timePerStep} minutes)`)
    );
  }

  return procedure;
}

export function generateCustomizedLessonPlan(responses: InterviewResponse): LessonPlan {
  const grade = getExactGrade(responses.gradeLevel);
  const gradeSpecificContent = getGradeSpecificContent(grade);

  // Base materials list stays consistent across grades
  const materials = [
    "2 craft sticks",
    "Sticky foam strips",
    "Paper clip",
    "Propeller",
    "Latex-free rubber band",
    "Cardstock",
    "Scissors",
    "Drawing materials"
  ];

  let extensions = gradeSpecificContent.extensions || [];
  
  // Add Pro Tip only once at the end if confidence is low
  const isLowConfidence = responses.confidence.toLowerCase().includes('not very') || 
    responses.confidence.toLowerCase().includes('need support');
  
  if (isLowConfidence) {
    extensions = [...extensions, "Pro Tip: Take it step by step! Each small success builds confidence."];
  }

  const lessonPlan: LessonPlan = {
    title: gradeSpecificContent.title || "Flying Machines",
    objectives: gradeSpecificContent.objectives || [],
    materials,
    procedure: adjustTimeAllocation(gradeSpecificContent.procedure || [], responses.time),
    extensions
  };

  return lessonPlan;
}