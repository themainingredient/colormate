interface Window {
    postMessage(message: string): void;
    postMessage(message: string, body: any): void;
    postMessage(message: string, ...args: any): void;

    // custom functions 
    sendUsedColors: any;
    replaceColor: any
    isBannerVisible: (isVisible: boolean) => void
  }