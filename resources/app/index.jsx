import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { GlobalFonts } from './Global.styles';

import Header from './components/Header';
import List from './components/List/List';
import Footer from './components/Footer';
import Loader from './components/Loader';

const PluginWrapper = styled.div`
  height: 534px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const App = () => {
  const [colors, setColors] = useState({});

  useEffect(() => {
    window.sendUsedColors = (incomingColors) => {
      setColors(incomingColors);
    };

    // Call function to get all used colors
    window.postMessage('getColors', 'Loading all colors');
  }, []);

  return (
    <PluginWrapper>
      <GlobalFonts />
      {Object.keys(colors).length !== 0 ? (
        <>
          <Header />
          <List colorList={colors} />
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </PluginWrapper>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
