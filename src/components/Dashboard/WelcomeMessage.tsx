"use client";

import { useEffect, useState } from 'react';

export default function WelcomeMessage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Bom dia');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {greeting}, Mago! ✨
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Pronto para mais um dia mágico de foco e produtividade?
      </p>
    </div>
  );
}
