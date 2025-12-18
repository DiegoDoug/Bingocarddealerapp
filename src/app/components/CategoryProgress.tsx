import { SpanishCard } from '../App';
import { motion } from 'motion/react';
import { Trophy, CheckCircle2, Circle } from 'lucide-react';

interface CategoryProgressProps {
  drawnCards: SpanishCard[];
}

interface Category {
  id: string;
  name: string;
  check: (cards: SpanishCard[]) => boolean;
  icon: string;
}

const CATEGORIES: Category[] = [
  {
    id: 'LÍNEA',
    name: 'Línea',
    icon: '📏',
    check: (cards) => {
      const suits = ['oros', 'copas', 'espadas', 'bastos'] as const;
      return suits.some(suit => cards.filter(c => c.suit === suit).length === 12);
    }
  },
  {
    id: 'POKER',
    name: 'Póker',
    icon: '🎰',
    check: (cards) => {
      const numberCounts = new Map<number, number>();
      cards.forEach(card => numberCounts.set(card.number, (numberCounts.get(card.number) || 0) + 1));
      return Array.from(numberCounts.values()).some(count => count === 4);
    }
  },
  {
    id: 'ESQUINAS',
    name: 'Esquinas',
    icon: '⭐',
    check: (cards) => cards.filter(c => c.number === 1).length === 4
  },
  {
    id: 'ESCALERA',
    name: 'Escalera',
    icon: '🪜',
    check: (cards) => {
      const suits = ['oros', 'copas', 'espadas', 'bastos'] as const;
      return suits.some(suit => {
        const numbers = cards
          .filter(c => c.suit === suit)
          .map(c => c.number)
          .sort((a, b) => a - b);
        for (let i = 0; i <= numbers.length - 5; i++) {
          let consecutive = true;
          for (let j = 0; j < 4; j++) {
            if (numbers[i + j + 1] !== numbers[i + j] + 1) {
              consecutive = false;
              break;
            }
          }
          if (consecutive) return true;
        }
        return false;
      });
    }
  }
];

export function CategoryProgress({ drawnCards }: CategoryProgressProps) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20 h-full">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-amber-400" />
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Objetivos</h2>
      </div>

      <div className="grid grid-cols-2 gap-2 h-[calc(100%-2rem)]">
        {CATEGORIES.map((category) => {
          const isComplete = category.check(drawnCards);

          return (
            <motion.div
              key={category.id}
              className={`
                p-2 rounded-xl flex flex-col items-center justify-center border transition-all
                ${isComplete 
                  ? 'bg-green-500/20 border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)]' 
                  : 'bg-white/5 border-white/10'
                }
              `}
            >
              <span className="text-xl mb-1">{category.icon}</span>
              <div className="flex items-center gap-1">
                <span className={`text-[10px] font-bold uppercase ${isComplete ? 'text-green-400' : 'text-white/60'}`}>
                  {category.name}
                </span>
                {isComplete && <CheckCircle2 className="w-3 h-3 text-green-400" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
