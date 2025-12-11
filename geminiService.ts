export interface GeminiResponse {
  isCorrect: boolean;
  correction?: string;
  explanation: string;
}

const SYSTEM_PROMPT = `You are an English grammar teacher. The user will provide a sentence with filled-in blanks. Check if it is grammatically correct and natural. Return ONLY a JSON object: { "isCorrect": boolean, "correction": string (if wrong), "explanation": string }.`;

export async function checkAnswer(sentence: string): Promise<GeminiResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key is not configured');
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `${SYSTEM_PROMPT}\n\nSentence to check: "${sentence}"`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Invalid response from Gemini API');
    }

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from response');
    }

    const result: GeminiResponse = JSON.parse(jsonMatch[0]);
    return result;
  } catch (error) {
    console.error('Error checking answer:', error);
    throw error;
  }
}
