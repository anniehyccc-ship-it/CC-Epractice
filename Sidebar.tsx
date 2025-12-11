import { BookOpen } from 'lucide-react';
import { Lesson } from '../data/lessonsData';

interface SidebarProps {
  lessons: Lesson[];
  currentLessonId: number;
  onLessonSelect: (lessonId: number) => void;
}

export default function Sidebar({ lessons, currentLessonId, onLessonSelect }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">English Practice</h1>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <button
                onClick={() => onLessonSelect(lesson.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentLessonId === lesson.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="font-medium">{lesson.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
