export class STTService {
  private recognition: any | null = null;
  private isListening: boolean = false;
  private onCommand: (command: string) => void;
  private onError: (error: string) => void;

  constructor(onCommand: (command: string) => void, onError: (error: string) => void) {
    this.onCommand = onCommand;
    this.onError = onError;
    
    try {
      // Check for SpeechRecognition support
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.lang = 'es-ES';

        this.recognition.onresult = (event: any) => {
          const last = event.results.length - 1;
          const command = event.results[last][0].transcript.toLowerCase().trim();
          this.onCommand(command);
        };

        this.recognition.onerror = (event: any) => {
          // If it's just 'no-speech', we don't treat it as a fatal error
          if (event.error === 'no-speech') return;
          this.onError(event.error);
          this.stop();
        };

        this.recognition.onend = () => {
          // Restart if it should be listening and didn't crash
          if (this.isListening) {
            try {
              this.recognition.start();
            } catch (e) {
              this.isListening = false;
              this.onError('restart-failed');
            }
          }
        };
      } else {
        this.recognition = null;
      }
    } catch (error) {
      console.error('Failed to initialize Speech Recognition:', error);
      this.recognition = null;
    }
  }

  isSupported(): boolean {
    return !!this.recognition;
  }

  start() {
    if (this.recognition && !this.isListening) {
      this.isListening = true;
      try {
        this.recognition.start();
      } catch (e) {
        this.isListening = false;
        this.onError('permission-denied');
      }
    }
  }

  stop() {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore stop errors
      }
    }
  }
}
