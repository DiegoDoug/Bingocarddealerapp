import { SpanishCard } from '../App';
import { motion } from 'motion/react';

interface CardProps {
  card: SpanishCard;
  size?: 'small' | 'medium' | 'large';
  index?: number;
}

const SUIT_COLORS = {
  oros: 'from-yellow-400 to-amber-600',
  copas: 'from-red-400 to-rose-600',
  espadas: 'from-blue-400 to-indigo-600',
  bastos: 'from-green-400 to-emerald-600'
};

const SUIT_BG = {
  oros: 'bg-gradient-to-br from-yellow-50 to-amber-100',
  copas: 'bg-gradient-to-br from-red-50 to-rose-100',
  espadas: 'bg-gradient-to-br from-blue-50 to-indigo-100',
  bastos: 'bg-gradient-to-br from-green-50 to-emerald-100'
};

const SUIT_SYMBOLS = {
  oros: '●',
  copas: '♥',
  espadas: '♠',
  bastos: '♣'
};

const SUIT_NAMES = {
  oros: 'Oros',
  copas: 'Copas',
  espadas: 'Espadas',
  bastos: 'Bastos'
};

export function Card({ card, size = 'small', index = 0 }: CardProps) {
  const sizeClasses = {
    small: 'w-12 h-16 text-sm',
    medium: 'w-20 h-28 text-lg',
    large: 'w-40 h-56 text-4xl'
  };

  const symbolSizes = {
    small: 'text-xl',
    medium: 'text-3xl',
    large: 'text-6xl'
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.02
      }}
      whileHover={{ scale: size === 'large' ? 1.05 : 1.1, y: -4 }}
      className={`
        ${sizeClasses[size]}
        ${SUIT_BG[card.suit]}
        rounded-xl shadow-lg
        border-2 border-white/50
        flex flex-col items-center justify-center
        relative overflow-hidden
        cursor-pointer
        transition-shadow duration-300
        hover:shadow-2xl
      `}
    >
      {/* Decorative background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${SUIT_COLORS[card.suit]} opacity-10`} />
      
      {/* Card content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1">
        <div className={`font-bold ${size === 'large' ? 'text-5xl' : size === 'medium' ? 'text-2xl' : 'text-lg'}`}>
          {card.number}
        </div>
        <div className={`${symbolSizes[size]} bg-gradient-to-br ${SUIT_COLORS[card.suit]} bg-clip-text text-transparent`}>
          {SUIT_SYMBOLS[card.suit]}
        </div>
        {size === 'large' && (
          <div className="text-sm font-medium opacity-70 mt-1">
            {SUIT_NAMES[card.suit]}
          </div>
        )}
      </div>
      
      {/* Corner decorations for large cards */}
      {size === 'large' && (
        <>
          <div className="absolute top-2 left-2 text-xs opacity-50">
            {card.number}
          </div>
          <div className="absolute bottom-2 right-2 text-xs opacity-50 rotate-180">
            {card.number}
          </div>
        </>
      )}
    </motion.div>
  );
}
