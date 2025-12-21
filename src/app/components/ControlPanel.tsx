import { Play, RotateCcw, Pause, Zap, Volume2, Mic } from 'lucide-react';
import { motion } from 'motion/react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

interface ControlPanelProps {
  onStart: () => void;
  onRestart: () => void;
  onPause: () => void;
  isPaused: boolean;
  isRunning: boolean;
  speed: number;
  onSpeedChange: (speed: number) => void;
  ttsEnabled: boolean;
  onTtsToggle: (enabled: boolean) => void;
  voiceEnabled: boolean;
  onVoiceToggle: (enabled: boolean) => void;
}

export function ControlPanel({ 
  onStart, 
  onRestart, 
  onPause, 
  isPaused, 
  isRunning,
  speed,
  onSpeedChange,
  ttsEnabled,
  onTtsToggle,
  voiceEnabled,
  onVoiceToggle
}: ControlPanelProps) {
  const speedInSeconds = speed / 1000;

  const handleSpeedChange = (value: number[]) => {
    onSpeedChange(value[0] * 1000);
  };

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

        {/* Voice and Audio Toggles */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Volume2 className={`w-3 h-3 ${ttsEnabled ? 'text-amber-400' : 'text-white/30'}`} />
              <span className="text-xs text-white">Anunciar cartas</span>
            </div>
            <Switch 
              checked={ttsEnabled} 
              onCheckedChange={onTtsToggle} 
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Mic className={`w-3 h-3 ${voiceEnabled ? 'text-green-400 animate-pulse' : 'text-white/30'}`} />
              <span className="text-xs text-white">Comandos de voz</span>
            </div>
            <Switch 
              checked={voiceEnabled} 
              onCheckedChange={onVoiceToggle} 
            />
          </div>
          <p className="text-[10px] text-white/30 mt-1 leading-tight">
            Requiere HTTPS y permisos de micrófono.
          </p>
        </div>
      </div>

      {/* Speed Control - Slider */}
      <div className="mt-3 pt-3 border-t border-white/10 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold uppercase text-white/70 tracking-wider">Velocidad</span>
          <span className="text-xs text-white/60 font-mono">{speedInSeconds.toFixed(1)}s</span>
        </div>
        
        <Slider
          value={[speedInSeconds]}
          onValueChange={handleSpeedChange}
          min={1}
          max={10}
          step={0.5}
          className="w-full"
        />
        
        <div className="flex justify-between px-0.5">
          <span className="text-[10px] text-white/40 uppercase font-medium">Rápido</span>
          <span className="text-[10px] text-white/40 uppercase font-medium">Lento</span>
        </div>
      </div>
    </div>
  );
}
