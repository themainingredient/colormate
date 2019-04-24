import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { GlobalFonts } from './Global.styles';

import ListContext, { ListProvider } from './ListContext';
import Header from './components/Header';
import List from './components/List/List';
import Footer from './components/Footer';
import Loader from './components/Loader';
import NoColorsFound from './components/NoColorsFound';

const PluginWrapper = styled.div`
  height: 534px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const App = () => {
  const [colors, setColors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { selectedLayer } = useContext(ListContext);

  useEffect(() => {
    window.sendUsedColors = (incomingColors) => {
      setIsLoading(false);
      setColors(incomingColors);
    };

    // Call function to get all used colors
    window.postMessage('getColors', 'Loading all colors');
  }, []);

  useEffect(() => {
    window.postMessage('selectLayer', selectedLayer);
  }, [selectedLayer]);

  const content = Object.keys(colors).length !== 0 ? (
    <>
      <Header />
      <List colorList={colors} />
      <Footer />
    </>
  ) : (
    <NoColorsFound />
  );

  return (
    <PluginWrapper>
      <GlobalFonts />
      {isLoading ? <Loader /> : content}
    </PluginWrapper>
  );
};

ReactDOM.render(
  <ListProvider>
    <App />
  </ListProvider>,
  document.getElementById('root'),
);