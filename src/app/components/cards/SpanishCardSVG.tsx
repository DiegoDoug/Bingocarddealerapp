import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type Suit = 'oros' | 'copas' | 'espadas' | 'bastos';

interface SpanishCardSVGProps {
  suit: Suit;
  number: number;
  className?: string;
}

const OrosSymbol = () => (
  <g>
    <circle cx="0" cy="0" r="20" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5" />
    <circle cx="0" cy="0" r="14" fill="none" stroke="#B8860B" strokeWidth="1" />
    <circle cx="0" cy="0" r="8" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
    <path d="M-5,-5 L5,5 M-5,5 L5,-5" stroke="#B8860B" strokeWidth="1" />
  </g>
);

const CopasSymbol = () => (
  <g transform="translate(0, 5)">
    <path d="M-12,-15 L12,-15 Q15,-15 15,-10 L15,0 Q15,10 0,10 Q-15,10 -15,0 L-15,-10 Q-15,-15 -12,-15 Z" fill="#FF4444" stroke="#8B0000" strokeWidth="1.5" />
    <rect x="-3" y="10" width="6" height="8" fill="#FF4444" stroke="#8B0000" strokeWidth="1" />
    <path d="M-10,18 L10,18 L12,22 L-12,22 Z" fill="#FF4444" stroke="#8B0000" strokeWidth="1.5" />
  </g>
);

const EspadasSymbol = () => (
  <g transform="translate(0, 5)">
    <path d="M0,-22 L5,-10 L5,10 Q5,15 0,15 Q-5,15 -5,10 L-5,-10 Z" fill="#4488FF" stroke="#00008B" strokeWidth="1.5" />
    <path d="M-10,10 L10,10 L10,13 L-10,13 Z" fill="#8B4513" stroke="#3D2B1F" strokeWidth="1" />
    <rect x="-2" y="13" width="4" height="10" fill="#8B4513" stroke="#3D2B1F" strokeWidth="1" />
  </g>
);

const BastosSymbol = () => (
  <g>
    <path d="M-4,15 L4,15 L7,-15 Q8,-20 0,-20 Q-8,-20 -7,-15 Z" fill="#8B4513" stroke="#3D2B1F" strokeWidth="1.5" />
    <circle cx="-5" cy="-8" r="3" fill="#22C55E" />
    <circle cx="5" cy="0" r="3" fill="#22C55E" />
    <circle cx="-5" cy="8" r="3" fill="#22C55E" />
  </g>
);

const SymbolWrapper = ({ suit }: { suit: Suit }) => {
  switch (suit) {
    case 'oros': return <OrosSymbol />;
    case 'copas': return <CopasSymbol />;
    case 'espadas': return <EspadasSymbol />;
    case 'bastos': return <BastosSymbol />;
  }
};

const NumberPattern = ({ number, suit }: { number: number, suit: Suit }) => {
  const layouts: Record<number, Array<[number, number]>> = {
    1: [[120, 170]],
    2: [[120, 100], [120, 240]],
    3: [[120, 80], [120, 170], [120, 260]],
    4: [[80, 100], [160, 100], [80, 240], [160, 240]],
    5: [[80, 100], [160, 100], [120, 170], [80, 240], [160, 240]],
    6: [[80, 80], [160, 80], [80, 170], [160, 170], [80, 260], [160, 260]],
    7: [[80, 80], [160, 80], [80, 170], [160, 170], [80, 260], [160, 260], [120, 125]],
    8: [[80, 80], [160, 80], [80, 140], [160, 140], [80, 200], [160, 200], [80, 260], [160, 260]],
    9: [[80, 80], [160, 80], [80, 140], [160, 140], [80, 200], [160, 200], [80, 260], [160, 260], [120, 170]],
  };

  const positions = layouts[number] || [];
  return (
    <>
      {positions.map(([x, y], i) => (
        <g key={i} transform={`translate(${x}, ${y})`}>
          <SymbolWrapper suit={suit} />
        </g>
      ))}
    </>
  );
};

export const SpanishCardSVG = ({ suit, number, className }: SpanishCardSVGProps) => {
  const isFaceCard = number >= 10;
  
  // Figure Images
  const faceImages = {
    10: "https://images.unsplash.com/photo-1596397261320-bbe8ac7303cf?q=80&w=300&h=400&fit=crop", // Sota
    11: "https://images.unsplash.com/photo-1576497587501-f71f94bef499?q=80&w=300&h=400&fit=crop", // Caballo
    12: "https://images.unsplash.com/photo-1579539447515-bafbf488e0b3?q=80&w=300&h=400&fit=crop"  // Rey
  };
  
  const getSuitColor = (s: Suit) => {
    switch (s) {
      case 'oros': return '#B8860B';
      case 'copas': return '#8B0000';
      case 'espadas': return '#00008B';
      case 'bastos': return '#3D2B1F';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <svg 
        viewBox="0 0 240 340" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect x="5" y="5" width="230" height="330" rx="15" fill="white" />
        
        {/* Decorative Border */}
        <rect x="10" y="10" width="220" height="320" rx="12" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <rect x="14" y="14" width="212" height="312" rx="10" fill="none" stroke="#D4AF37" strokeWidth="0.5" />

        {/* Number Top-Left */}
        <g transform="translate(30, 45)">
          <text 
            textAnchor="middle" 
            fontSize="24" 
            fontWeight="bold" 
            fill={getSuitColor(suit)}
            className="font-serif"
          >
            {number}
          </text>
        </g>

        {/* Number Bottom-Right */}
        <g transform="translate(210, 295) rotate(180)">
          <text 
            textAnchor="middle" 
            fontSize="24" 
            fontWeight="bold" 
            fill={getSuitColor(suit)}
            className="font-serif"
          >
            {number}
          </text>
        </g>

        {/* Main Content Area (SVG clips if needed) */}
        {!isFaceCard && <NumberPattern number={number} suit={suit} />}
      </svg>

      {/* Face Card Image Overlay */}
      {isFaceCard && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8 py-12">
          <div className="relative w-full h-full border border-amber-500/30 rounded-lg overflow-hidden flex flex-col items-center">
            <div className="flex-1 w-full relative">
              <ImageWithFallback 
                src={faceImages[number as 10 | 11 | 12]} 
                alt={`Figura ${number}`}
                className="w-full h-full object-cover grayscale-[0.3] sepia-[0.2]"
              />
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded-full shadow-sm border border-amber-200">
              <div className="w-6 h-6 flex items-center justify-center scale-75">
                <svg viewBox="-25 -25 50 50" className="w-full h-full">
                  <SymbolWrapper suit={suit} />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
