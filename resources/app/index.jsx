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
      {Object.keys(colors).map(color => (
        <p style={{ color }}>
          {color}:{' '}
          {colors[color].map(instance => (
            <>
              <p>&nbsp;&nbsp;{instance.colorType}</p>
              <ul>
                {instance.ancestry.map(ancestor => (
                  <li>&nbsp;&nbsp;•&nbsp;{ancestor}</li>
                ))}
              </ul>
            </>
          ))}
        </p>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
