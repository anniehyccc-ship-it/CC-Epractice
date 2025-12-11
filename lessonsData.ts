export interface Question {
  id: number;
  textParts: string[];
  answerCount: number;
}

export interface Lesson {
  id: number;
  title: string;
  questions: Question[];
}

export const lessonsData: Lesson[] = [
  {
    id: 1,
    title: "Lesson 1",
    questions: [
      {
        id: 1,
        textParts: ["I", "the", "yesterday."],
        answerCount: 2,
      },
      {
        id: 2,
        textParts: ["My coworker", "this morning."],
        answerCount: 1,
      },
      {
        id: 3,
        textParts: ["The team", "before lunch."],
        answerCount: 1,
      },
       {
        id: 4,
        textParts: ["My boss", "the", "this afternoon."],
        answerCount: 2,
      },
       {
        id: 5,
        textParts: ["My coworker mentioned that", "this morning."],
        answerCount: 1,
      },
       {
        id: 6,
        textParts: ["The team needs to", "by next week."],
        answerCount: 1,
      },
       {
        id: 7,
        textParts: ["We should", "the", "by tomorrow."],
        answerCount: 2,
      },
       {
        id: 8,
        textParts: ["Don’t forget, you need to ", "today."],
        answerCount: 1,
      },
       {
        id: 9,
        textParts: ["Don’t forget, you need to", "today."],
        answerCount: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Lesson 2",
    questions: [
      {
        id: 1,
        textParts: ["The cat", "on the mat."],
        answerCount: 1,
      },
      {
        id: 2,
        textParts: ["We", "to school", "day."],
        answerCount: 2,
      },
      {
        id: 3,
        textParts: ["He", "his homework."],
        answerCount: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Lesson 3",
    questions: [
      {
        id: 1,
        textParts: ["The dog", "in the park."],
        answerCount: 1,
      },
      {
        id: 2,
        textParts: ["I", "a book", "night."],
        answerCount: 2,
      },
      {
        id: 3,
        textParts: ["She", "very happy."],
        answerCount: 1,
      },
    ],
  },
  {
    id: 4,
    title: "Lesson 4",
    questions: [
      {
        id: 1,
        textParts: ["We", "dinner together."],
        answerCount: 1,
      },
      {
        id: 2,
        textParts: ["He", "to music", "he works."],
        answerCount: 2,
      },
      {
        id: 3,
        textParts: ["They", "soccer."],
        answerCount: 1,
      },
    ],
  },
  {
    id: 5,
    title: "Lesson 5",
    questions: [
      {
        id: 1,
        textParts: ["The bird", "in the sky."],
        answerCount: 1,
      },
      {
        id: 2,
        textParts: ["I", "my friend", "week."],
        answerCount: 2,
      },
      {
        id: 3,
        textParts: ["She", "a letter."],
        answerCount: 1,
      },
    ],
  },
  {
    id: 6,
    title: "Lesson 6",
    questions: [
      {
        id: 1,
        textParts: ["We", "on vacation."],
        answerCount: 1,
      },
      {
        id: 2,
        textParts: ["He", "a cake", "her birthday."],
        answerCount: 2,
      },
      {
        id: 3,
        textParts: ["They", "early."],
        answerCount: 1,
      },
    ],
  },
  {
    id: 7,
    title: "Lesson 7",
    questions: [
      {
        id: 1,
        textParts: ["The sun", "brightly."],
        answerCount: 1,
      },
      {
        id: 2,
        textParts: ["I", "my car", "morning."],
        answerCount: 2,
      },
      {
        id: 3,
        textParts: ["She", "tea."],
        answerCount: 1,
      },
    ],
  },
  {
    id: 8,
    title: "Lesson 8",
    questions: [
      {
        id: 1,
        textParts: ["We", "a party."],
        answerCount: 1,
      },
      {
        id: 2,
        textParts: ["He", "his bike", "school."],
        answerCount: 2,
      },
      {
        id: 3,
        textParts: ["They", "tired."],
        answerCount: 1,
      },
    ],
  },
];
