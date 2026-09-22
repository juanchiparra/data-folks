declare global {
  interface Window {
    fathom?: {
      trackEvent: (name: string) => void;
    };
  }
}

export {};
