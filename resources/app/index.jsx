import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Header from './components/Header';
import List from './components/List/List';
import Footer from './components/Footer';

const PluginWrapper = styled.div`
  height: 534px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

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
    <PluginWrapper>
      <Header />
      <List colorList={colors} />
      <Footer />
    </PluginWrapper>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
