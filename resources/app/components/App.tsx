import React, { useState, useEffect, useContext } from 'react';

import styled from 'styled-components';

import { GlobalFonts } from '../Global.styles';

import ListContext from '../ListContext';
import Header from './Header';
import List from './List/List';
import Footer from './Footer';
import Loader from './Loader';
import NoColorsFound from './NoColorsFound';
import { browserWindowSize } from '../../../constants';

const PluginWrapper = styled.div`
  height: ${browserWindowSize.height}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function () {
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

  useEffect(() => {
    window.replaceColor = (args) => {
      const { colorToReplace, targetColor } = args
      var newState = { ...colors }

      newState[`${targetColor}ff`] = newState[`${colorToReplace}`]; //TODO: Remove FF from color
      delete newState[colorToReplace];

      setColors(newState);
    };
  }, [colors]);

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
}