interface Window {
    postMessage(message: string, body: any): void;
    postMessage(message: string, ...args: any): void;

    // custom functions 
    sendUsedColors: any;
    replaceColor: any
  }