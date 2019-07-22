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
  const [isLoading, setIsLoading] = useState(true);
  const { selectedLayer, colors = {}, setColors } = useContext(ListContext);

  useEffect(() => {
    window.sendUsedColors = (incomingColors) => {
      setIsLoading(false);
      setColors(incomingColors);
      console.log('App.tsx - incomingColors ', incomingColors);
    };

    // Call function to get all used colors
    window.postMessage('getColors', 'Loading all colors');
  }, []);

  useEffect(() => {
    window.replaceColor = (args) => {
      const { colorToReplace, targetColor, layerIds } = args;
      const newState = Object.entries(colors).reduce((acc, keyValue) => {
        const colorKey = keyValue[0];
        const instances = keyValue[1] as any[];

        if (keyValue[0] !== colorToReplace) {
          acc[colorKey] = instances;
          return acc;
        }

        const changedLayers = instances.filter(layer => layerIds.includes(layer.id));
        const untouchedLayers = instances.filter(layer => !layerIds.includes(layer.id));

        acc[targetColor] = changedLayers;

        if (untouchedLayers.length !== 0) {
          acc[colorKey] = untouchedLayers;
        }
        return acc;
      }, {});

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
