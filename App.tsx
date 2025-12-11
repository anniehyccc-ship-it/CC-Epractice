import { useState } from 'react';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import { lessonsData } from './data/lessonsData';

function App() {
  const [currentLessonId, setCurrentLessonId] = useState(1);

  const currentLesson = lessonsData.find((lesson) => lesson.id === currentLessonId);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        lessons={lessonsData}
        currentLessonId={currentLessonId}
        onLessonSelect={setCurrentLessonId}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {currentLesson?.title}
          </h2>
          {currentLesson && <LessonView key={currentLessonId} lesson={currentLesson} />}
        </div>
      </main>
    </div>
  );
}

export default App;
