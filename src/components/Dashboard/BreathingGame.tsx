"use client";

import { useState, useEffect, useRef } from 'react';
import { useUserProgress } from '@/lib/useUserProgress';

type BreathingPattern = {
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
};

const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    name: "Respiração 4-7-8",
    description: "Acalme a mente e reduza a ansiedade",
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4
  },  {
    name: "Respiração Quadrada",
    description: "Aumente o foco e a concentração",
    inhale: 4,
    hold: 4,
    exhale: 4,
    cycles: 4
  },
  {
    name: "Respiração Energizante",
    description: "Aumente sua energia e disposição",
    inhale: 6,
    hold: 0,
    exhale: 2,
    cycles: 6
  }
];

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest';

export default function BreathingGame() {
  const { addPoints } = useUserProgress();
  const [isActive, setIsActive] = useState(false);
  const [currentPattern, setCurrentPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0]);
  const [cycleCount, setCycleCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [message, setMessage] = useState('Pronto para começar?');
  const animationRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startSession = () => {
    setIsActive(true);
    setCycleCount(0);
    setPhase('inhale');
    setTimeLeft(currentPattern.inhale);
    setMessage('Inspire...');
  };

  const stopSession = () => {
    setIsActive(false);              setMessage('Vamos começar sua prática?');
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
  };

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === 'inhale') {
            setPhase('hold');
            setMessage('Segure...');
            return currentPattern.hold || 0;
          } else if (phase === 'hold') {
            setPhase('exhale');
            setMessage('Expire...');
            return currentPattern.exhale;
          } else if (phase === 'exhale') {
            setCycleCount((prev) => {
              const newCount = prev + 1;
              if (newCount >= currentPattern.cycles) {
                setIsActive(false);            setMessage('Parabéns! Você ganhou +10 Pontos Mágicos');
            addPoints(10);
            clearInterval(intervalRef.current);
                // Emit breathing session complete event
                const event = new CustomEvent('breathingSessionComplete');
                window.dispatchEvent(event);
              }
              return newCount;
            });
            setPhase('inhale');
            setMessage('Inspire...');
            return currentPattern.inhale;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, phase, currentPattern, addPoints]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Exercício de Respiração</h2>
        <p className="text-gray-600 dark:text-gray-400">{currentPattern.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Pratique respiração consciente para reduzir o estresse e melhorar o foco
        </p>
      </div>

      <div className="flex justify-center mb-8">
        {BREATHING_PATTERNS.map((pattern) => (
          <button
            key={pattern.name}
            onClick={() => !isActive && setCurrentPattern(pattern)}
            className={`px-4 py-2 mx-2 rounded-lg transition-colors ${
              currentPattern.name === pattern.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {pattern.name}
          </button>
        ))}
      </div>

      <div className="relative flex justify-center items-center mb-8">
        <div
          ref={animationRef}
          className={`w-48 h-48 rounded-full border-4 border-blue-500 flex items-center justify-center transition-all duration-1000 ${
            phase === 'inhale' ? 'scale-125' : phase === 'exhale' ? 'scale-75' : ''
          }`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{timeLeft}</div>
            <div className="text-gray-600 dark:text-gray-400">{message}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {!isActive ? (
          <button
            onClick={startSession}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Iniciar
          </button>
        ) : (
          <button
            onClick={stopSession}
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Parar
          </button>
        )}
      </div>

      {isActive && (
        <div className="text-center mt-8">
          <p className="text-lg">
            Ciclo {cycleCount + 1} de {currentPattern.cycles}
          </p>
        </div>
      )}
    </div>
  );
}
