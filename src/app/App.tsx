import { useState, useEffect, useRef } from 'react';
import { Card } from './components/Card';
import { ControlPanel } from './components/ControlPanel';
import { CurrentCardDisplay } from './components/CurrentCardDisplay';
import { CategoryProgress } from './components/CategoryProgress';
import { DrawnCardsGrid } from './components/DrawnCardsGrid';
import { Toaster, toast } from 'sonner';

export type Suit = 'oros' | 'copas' | 'espadas' | 'bastos';

export interface SpanishCard {
  number: number;
  suit: Suit;
  id: string;
}

const SUITS: Suit[] = ['oros', 'copas', 'espadas', 'bastos'];
const CARD_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function createDeck(): SpanishCard[] {
  const deck: SpanishCard[] = [];
  SUITS.forEach(suit => {
    CARD_NUMBERS.forEach(number => {
      deck.push({
        number,
        suit,
        id: `${suit}-${number}`
      });
    });
  });
  return deck;
}

function shuffleDeck(deck: SpanishCard[]): SpanishCard[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function App() {
  const [deck, setDeck] = useState<SpanishCard[]>([]);
  const [drawnCards, setDrawnCards] = useState<SpanishCard[]>([]);
  const [currentCard, setCurrentCard] = useState<SpanishCard | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(2000);
  const [achievedMilestones, setAchievedMilestones] = useState<Set<string>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const initializeDeck = () => {
    const newDeck = createDeck();
    const shuffled = shuffleDeck(newDeck);
    setDeck(shuffled);
    setDrawnCards([]);
    setCurrentCard(null);
    setIsRunning(false);
    setIsPaused(false);
    setAchievedMilestones(new Set());
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    initializeDeck();
  }, []);

  const drawCard = () => {
    if (deck.length > 0) {
      const [nextCard, ...remainingDeck] = deck;
      const newDrawnCards = [...drawnCards, nextCard];
      setCurrentCard(nextCard);
      setDrawnCards(newDrawnCards);
      setDeck(remainingDeck);
      
      checkMilestones(newDrawnCards);

      if (remainingDeck.length === 0) {
        setIsRunning(false);
        setIsPaused(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        toast.success('¡Ronda completada! Todas las cartas han sido extraídas.');
      }
    }
  };

  const checkMilestones = (cards: SpanishCard[]) => {
    const milestones = [
      {
        id: 'LÍNEA',
        check: (c: SpanishCard[]) => {
          const suits = ['oros', 'copas', 'espadas', 'bastos'] as const;
          return suits.some(suit => c.filter(card => card.suit === suit).length === 12);
        },
        message: '¡LÍNEA! Has completado un palo entero.'
      },
      {
        id: 'POKER',
        check: (c: SpanishCard[]) => {
          const counts = new Map<number, number>();
          c.forEach(card => counts.set(card.number, (counts.get(card.number) || 0) + 1));
          return Array.from(counts.values()).some(count => count === 4);
        },
        message: '¡PÓKER! Cuatro cartas del mismo número.'
      },
      {
        id: 'ESQUINAS',
        check: (c: SpanishCard[]) => c.filter(card => card.number === 1).length === 4,
        message: '¡ESQUINAS! Los cuatro ases han salido.'
      },
      {
        id: 'ESCALERA',
        check: (c: SpanishCard[]) => {
          const suits = ['oros', 'copas', 'espadas', 'bastos'] as const;
          return suits.some(suit => {
            const numbers = c
              .filter(card => card.suit === suit)
              .map(card => card.number)
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
        },
        message: '¡ESCALERA! 5 cartas consecutivas del mismo palo.'
      }
    ];

    milestones.forEach(m => {
      if (!achievedMilestones.has(m.id) && m.check(cards)) {
        setAchievedMilestones(prev => new Set(prev).add(m.id));
        toast.success(m.message, {
          duration: 5000,
          icon: '🏆'
        });
      }
    });
  };

  const startRound = () => {
    if (deck.length === 0 && drawnCards.length === 0) {
      initializeDeck();
      setTimeout(() => {
        setIsRunning(true);
        setIsPaused(false);
        toast.success('¡Nueva ronda iniciada!');
      }, 100);
    } else if (deck.length > 0) {
      setIsRunning(true);
      setIsPaused(false);
      toast.success(isPaused ? '¡Ronda reanudada!' : '¡Ronda iniciada!');
    }
  };

  const restartRound = () => {
    initializeDeck();
    toast.info('Ronda reiniciada');
  };

  const pauseRound = () => {
    setIsPaused(!isPaused);
    toast.info(isPaused ? 'Ronda reanudada' : 'Ronda pausada');
  };

  useEffect(() => {
    if (isRunning && !isPaused && deck.length > 0) {
      intervalRef.current = setInterval(() => {
        drawCard();
      }, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, isPaused, deck.length, speed]);

  const sortedDrawnCards = [...drawnCards].sort((a, b) => {
    const suitOrder = { oros: 0, copas: 1, espadas: 2, bastos: 3 };
    if (suitOrder[a.suit] !== suitOrder[b.suit]) {
      return suitOrder[a.suit] - suitOrder[b.suit];
    }
    return b.number - a.number;
  });

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 overflow-hidden flex flex-col">
      <Toaster position="top-center" richColors />
      
      <div className="max-w-[1920px] mx-auto w-full h-full flex flex-col gap-4">
        {/* Header & Top Panels Container */}
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left - Control Panel (Compact) */}
          <div className="col-span-3">
            <ControlPanel
              onStart={startRound}
              onRestart={restartRound}
              onPause={pauseRound}
              isPaused={isPaused}
              isRunning={isRunning}
              speed={speed}
              onSpeedChange={setSpeed}
            />
          </div>

          {/* Center - Title & Current Card */}
          <div className="col-span-6 flex flex-col items-center justify-center space-y-2">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Crupier Automático
              </h1>
              <p className="text-slate-400 text-sm">Bingo de Baraja Española</p>
            </div>
            
            <div className="w-full max-w-md">
              <CurrentCardDisplay 
                currentCard={currentCard} 
                remainingCards={deck.length}
                totalCards={48}
              />
            </div>
          </div>

          {/* Right - Category Progress (Compact) */}
          <div className="col-span-3 h-full">
            <CategoryProgress drawnCards={drawnCards} />
          </div>
        </div>

        {/* Main Content - Drawn Cards Grid */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <DrawnCardsGrid 
            cards={sortedDrawnCards}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
}