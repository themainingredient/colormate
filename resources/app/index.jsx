import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    window.sendUsedColors = (incomingColors) => {
      setColors(incomingColors);
    };

    // Call function to get all used colors
    window.postMessage('getColors', 'Loading all colors');
  }, []);

  return (
    <div>
      <h2>Colormate</h2>
      {Object.keys(colors).map(color => (
        <p style={{ color }}>
          {color}: {colors[color].length} instances
        </p>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
