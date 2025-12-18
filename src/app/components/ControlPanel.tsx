import { Play, RotateCcw, Pause, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface ControlPanelProps {
  onStart: () => void;
  onRestart: () => void;
  onPause: () => void;
  isPaused: boolean;
  isRunning: boolean;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SPEEDS = [
  { label: 'Lento', value: 3000, icon: '🐢' },
  { label: 'Normal', value: 2000, icon: '🚶' },
  { label: 'Rápido', value: 1000, icon: '🏃' },
  { label: 'Turbo', value: 500, icon: '🚀' }
];

export function ControlPanel({ 
  onStart, 
  onRestart, 
  onPause, 
  isPaused, 
  isRunning,
  speed,
  onSpeedChange 
}: ControlPanelProps) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20 h-full flex flex-col justify-between">
      <div className="space-y-3">
        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Controles</h2>
        </div>

        {/* Control Buttons - Grid style */}
        <div className="grid grid-cols-1 gap-2">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              disabled={isRunning && !isPaused}
              className="
                flex-1 bg-gradient-to-r from-green-500 to-emerald-600
                disabled:from-gray-600 disabled:to-gray-700
                text-white text-xs font-bold py-2 px-3 rounded-lg
                shadow-lg flex items-center justify-center gap-1
              "
            >
              <Play className="w-3 h-3" />
              {isPaused ? 'Seguir' : 'Iniciar'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPause}
              disabled={!isRunning}
              className="
                flex-1 bg-gradient-to-r from-yellow-500 to-orange-600
                disabled:from-gray-600 disabled:to-gray-700
                text-white text-xs font-bold py-2 px-3 rounded-lg
                shadow-lg flex items-center justify-center gap-1
              "
            >
              <Pause className="w-3 h-3" />
              {isPaused ? 'Listo' : 'Pausa'}
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="
              bg-white/5 border border-white/10 hover:bg-white/10
              text-white text-xs font-bold py-2 px-3 rounded-lg
              flex items-center justify-center gap-1 transition-colors
            "
          >
            <RotateCcw className="w-3 h-3" />
            Reiniciar Partida
          </motion.button>
        </div>
      </div>

      {/* Speed Control - More compact */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="grid grid-cols-4 gap-1">
          {SPEEDS.map((speedOption) => (
            <button
              key={speedOption.value}
              onClick={() => onSpeedChange(speedOption.value)}
              title={speedOption.label}
              className={`
                py-1.5 rounded-md flex flex-col items-center justify-center transition-all
                ${speed === speedOption.value 
                  ? 'bg-purple-500/30 border border-purple-400/50 text-white' 
                  : 'bg-white/5 text-white/40 hover:bg-white/10'
                }
              `}
            >
              <span className="text-sm">{speedOption.icon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
