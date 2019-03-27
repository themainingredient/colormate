import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [text, setText] = useState(1);

  useEffect(() => {
    window.setUsedColors = (amount) => {
      setText(text + amount);
    };
  });

  const handleClick = () => {
    window.postMessage('getColors', 'Message from React');
  };

  return (
    <div>
      <p>I am react</p>
      <button type='button' onClick={handleClick}>
        Click
      </button>
      <p>{text}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
