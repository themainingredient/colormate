import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [colors, setColors] = useState([]);

  const handleClick = () => {
    window.postMessage('getColors', 'Message from React');
  };

  useEffect(() => {
    window.sendUsedColors = (incomingColors) => {
      setColors(incomingColors);
    };
  });

  return (
    <div>
      <h2>Colormate</h2>
      <button type='button' onClick={handleClick}>
        Click
      </button>
      {colors.map((color, i) => (
        <p>
          Color numero {i + 1}: <span style={{ color }}>{color}</span>
        </p>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
