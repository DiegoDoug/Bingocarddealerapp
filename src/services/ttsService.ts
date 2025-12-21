export class TTSService {
  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    this.initVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.initVoice();
    }
  }

  private initVoice() {
    const voices = this.synth.getVoices();
    // Try to find a Spanish voice, preferably from Spain
    this.voice = voices.find(v => v.lang === 'es-ES') || voices.find(v => v.lang.startsWith('es')) || null;
  }

  speak(text: string, rate: number = 1) {
    if (!this.synth) return;
    this.stop(); // Cancel previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) utterance.voice = this.voice;
    utterance.lang = 'es-ES';
    utterance.rate = rate;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }
}
