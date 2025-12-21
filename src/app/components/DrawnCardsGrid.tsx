import { SpanishCard, Suit } from '../App';
import { Card } from './Card';
import { motion, AnimatePresence } from 'motion/react';

interface DrawnCardsGridProps {
  cards: SpanishCard[];
  isRunning: boolean;
}

const SUITS: Suit[] = ['oros', 'copas', 'espadas', 'bastos'];

const SUIT_ICONS = {
  oros: '🟡',
  copas: '🍷',
  espadas: '⚔️',
  bastos: '🪵'
};

const SUIT_LABELS = {
  oros: 'Oros',
  copas: 'Copas',
  espadas: 'Espadas',
  bastos: 'Bastos'
};

export function DrawnCardsGrid({ cards, isRunning }: DrawnCardsGridProps) {
  const cardsBySuit = SUITS.reduce((acc, suit) => {
    acc[suit] = cards
      .filter(c => c.suit === suit)
      .sort((a, b) => b.number - a.number);
    return acc;
  }, {} as Record<Suit, SpanishCard[]>);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10 h-full flex flex-col">
      <div className="grid grid-cols-4 gap-4 h-full">
        {SUITS.map((suit) => (
          <div key={suit} className="flex flex-col h-full bg-black/20 rounded-2xl p-3 border border-white/5">
            {/* Suit Label */}
            <div className="mb-3 flex items-center justify-between px-2">
              <span className="text-sm font-bold uppercase tracking-widest text-white/40">{SUIT_LABELS[suit]}</span>
              <span className="text-lg">{SUIT_ICONS[suit]}</span>
            </div>

            {/* Cascade Container */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false}>
                {cardsBySuit[suit].map((card, index) => {
                  // Find if this is the absolute latest card drawn across all suits
                  const isLatestOverall = cards[cards.length - 1]?.id === card.id;

                  return (
                    <motion.div
                      key={card.id}
                      initial={isLatestOverall ? { 
                        y: -300, // Start high
                        x: 0,
                        scale: 1.5,
                        opacity: 0,
                        rotateY: 180
                      } : false}
                      animate={{ 
                        y: index * 28,
                        x: 0,
                        scale: 0.85,
                        opacity: 1,
                        rotateY: 0,
                        zIndex: index 
                      }}
                      transition={{ 
                        type: 'spring',
                        stiffness: 100,
                        damping: 15,
                        mass: 1
                      }}
                      className="absolute w-full flex justify-center origin-top"
                      style={{ top: 0 }}
                    >
                      <Card card={card} size="medium" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {cardsBySuit[suit].length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <span className="text-6xl">{SUIT_ICONS[suit]}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
