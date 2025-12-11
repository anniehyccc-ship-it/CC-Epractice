import { useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Question as QuestionType } from '../data/lessonsData';
import { checkAnswer, GeminiResponse } from '../services/geminiService';

interface QuestionProps {
  question: QuestionType;
  onNext: () => void;
}

export default function Question({ question, onNext }: QuestionProps) {
  const [answers, setAnswers] = useState<string[]>(
    Array(question.answerCount).fill('')
  );
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<GeminiResponse | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const constructSentence = () => {
    let sentence = '';
    let answerIndex = 0;

    for (let i = 0; i < question.textParts.length; i++) {
      sentence += question.textParts[i];
      if (i < question.textParts.length - 1) {
        sentence += ` ${answers[answerIndex] || '[blank]'}`;
        answerIndex++;
      }
    }

    return sentence.trim();
  };

  const handleCheck = async () => {
    if (answers.some((answer) => answer.trim() === '')) {
      alert('Please fill in all blanks before checking.');
      return;
    }

    setIsChecking(true);
    setResult(null);

    try {
      const sentence = constructSentence();
      const response = await checkAnswer(sentence);
      setResult(response);

      if (response.isCorrect) {
        setTimeout(() => {
          onNext();
          setAnswers(Array(question.answerCount).fill(''));
          setResult(null);
          setShowNextButton(false);
        }, 2000);
      } else {
        setShowNextButton(true);
      }
    } catch (error) {
      console.error('Error checking answer:', error);
      alert('Failed to check answer. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleNext = () => {
    onNext();
    setAnswers(Array(question.answerCount).fill(''));
    setResult(null);
    setShowNextButton(false);
  };

  const renderSentence = () => {
    const elements = [];
    let answerIndex = 0;

    for (let i = 0; i < question.textParts.length; i++) {
      elements.push(
        <span key={`text-${i}`} className="text-gray-800 text-lg">
          {question.textParts[i]}
        </span>
      );

      if (i < question.textParts.length - 1) {
        elements.push(
          <input
            key={`input-${answerIndex}`}
            type="text"
            value={answers[answerIndex]}
            onChange={(e) => handleInputChange(answerIndex, e.target.value)}
            className="mx-2 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors min-w-[120px]"
            disabled={isChecking}
          />
        );
        answerIndex++;
      }
    }

    return elements;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6 flex flex-wrap items-center gap-2">{renderSentence()}</div>

      {result && result.isCorrect && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 font-medium">Correct!</p>
            <p className="text-green-700 text-sm mt-1">{result.explanation}</p>
          </div>
        </div>
      )}

      {result && !result.isCorrect && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-800 font-medium">Not quite right</p>
            {result.correction && (
              <p className="text-red-700 text-sm mt-2">
                <span className="font-medium">Correction:</span> {result.correction}
              </p>
            )}
            <p className="text-red-700 text-sm mt-2">
              <span className="font-medium">Explanation:</span> {result.explanation}
            </p>
          </div>
        </div>
      )}

      {!showNextButton ? (
        <button
          onClick={handleCheck}
          disabled={isChecking}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isChecking ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Checking...</span>
            </>
          ) : (
            <span>Check Answer</span>
          )}
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          Next Question
        </button>
      )}
    </div>
  );
}
