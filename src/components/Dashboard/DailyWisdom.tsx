"use client";

import { useEffect, useState } from 'react';

const quotes = [
  { text: "O foco é a chave para desbloquear sua magia interior.", author: "Mago Ancião" },
  { text: "Cada pequeno passo é uma vitória na sua jornada mágica.", author: "Fada Mentora" },
  { text: "A verdadeira magia acontece quando você mantém o foco.", author: "Arquimago do Tempo" },
  { text: "Sua mente é seu grimório mais poderoso.", author: "Sábio do Vale" },
  { text: "A persistência é a varinha mágica do sucesso.", author: "Mestre dos Elementos" }
];

export default function DailyWisdom() {
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    // Usar a data atual como seed para ter a mesma quote durante o dia
    const today = new Date().toDateString();
    const index = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % quotes.length;
    setQuote(quotes[index]);
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-900 p-6 rounded-lg shadow-lg mb-8">
      <p className="text-lg text-gray-800 dark:text-gray-100 italic mb-2">
        "{quote.text}"
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        — {quote.author}
      </p>
    </div>
  );
}
