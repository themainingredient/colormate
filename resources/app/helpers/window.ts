export const closeWindow = () => {
    window.postMessage('closeWindow', '*');
};