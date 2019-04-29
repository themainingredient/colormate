interface Window extends Window {
    sendUsedColors: any;
    postMessage(message: string, body: any): void;
    postMessage(message: string, ...args: any): void;
  }