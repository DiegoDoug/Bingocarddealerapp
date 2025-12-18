import { SpanishCard } from '../App';
import { Card } from './Card';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface CurrentCardDisplayProps {
  currentCard: SpanishCard | null;
  remainingCards: number;
  totalCards: number;
}

export function CurrentCardDisplay({ currentCard, remainingCards, totalCards }: CurrentCardDisplayProps) {
  const drawnCards = totalCards - remainingCards;
  const progress = (drawnCards / totalCards) * 100;

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-lg">
      <div className="flex items-center gap-6">
        {/* Progress Circle or Mini-stat */}
        <div className="flex-shrink-0 relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-white/10"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={175.9}
              initial={{ strokeDashoffset: 175.9 }}
              animate={{ strokeDashoffset: 175.9 - (175.9 * progress) / 100 }}
              className="text-amber-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-white leading-none">{drawnCards}</span>
            <span className="text-[8px] text-white/40">/48</span>
          </div>
        </div>

        {/* Card Display Area - Smaller for horizontal layout */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentCard ? (
              <motion.div
                key={currentCard.id}
                initial={{ scale: 0.5, opacity: 0, x: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.5, opacity: 0, x: 20 }}
                transition={{ type: 'spring', damping: 15 }}
              >
                <Card card={currentCard} size="medium" />
              </motion.div>
            ) : (
              <div className="w-20 h-28 rounded-xl border border-dashed border-white/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white/10" />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Info label */}
        <div className="hidden sm:block text-right">
          <p className="text-[10px] text-white/40 uppercase font-bold">Última carta</p>
          <p className="text-sm font-bold text-white">
            {currentCard ? `${currentCard.number} de ${currentCard.suit}` : '---'}
          </p>
        </div>
      </div>
    </div>
  );
}
