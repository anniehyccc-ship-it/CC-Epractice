import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { Lesson } from '../data/lessonsData';
import ProgressBar from './ProgressBar';
import Question from './Question';

interface LessonViewProps {
  lesson: Lesson;
}

export default function LessonView({ lesson }: LessonViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-yellow-100 p-6 rounded-full">
              <Trophy className="w-16 h-16 text-yellow-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Lesson Complete!
          </h2>
          <p className="text-gray-600 mb-8">
            Great job! You've completed all questions in {lesson.title}.
          </p>
          <button
            onClick={handleRestart}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Practice Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = lesson.questions[currentQuestionIndex];

  return (
    <div>
      <ProgressBar
        current={currentQuestionIndex + 1}
        total={lesson.questions.length}
      />
      <Question question={currentQuestion} onNext={handleNext} />
    </div>
  );
}
