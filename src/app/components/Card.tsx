import { motion } from 'motion/react';
import { SpanishCard } from '../App';
import { SpanishCardSVG } from './cards/SpanishCardSVG';

interface CardProps {
  card: SpanishCard;
  isNew?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function Card({ card, isNew = false, size = 'medium' }: CardProps) {
  const sizeClasses = {
    small: 'w-16 h-24',
    medium: 'w-24 h-36',
    large: 'w-48 h-72'
  };

  return (
    <motion.div
      layout
      initial={isNew ? { scale: 0.5, opacity: 0, y: 50 } : false}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`
        relative rounded-xl overflow-hidden
        ${sizeClasses[size]}
        ${isNew ? 'ring-4 ring-amber-400 ring-offset-4 ring-offset-slate-900 z-10' : ''}
        drop-shadow-lg
      `}
    >
      <SpanishCardSVG 
        suit={card.suit} 
        number={card.number} 
        className="w-full h-full" 
      />
    </motion.div>
  );
}
