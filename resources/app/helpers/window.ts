export const closeWindow = () => {
  window.postMessage('closeWindow');
};

export const openUrlInBrowser = (url: string) => {
  window.postMessage('openUrlInBrowser', url);
};
