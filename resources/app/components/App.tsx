import React, { useState, useEffect, useContext } from 'react';

import styled from 'styled-components';

import { GlobalFonts } from '../Global.styles';

import ListContext from '../ListContext';
import Header from './Header';
import List from './List/List';
import Footer from './Footer';
import Loader from './Loader';
import NoColorsFound from './NoColorsFound';
import { replaceColor } from '../helpers/replace-color';

const PluginWrapper = styled.div`
  height: 534px;
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
      window.replaceColor = ({colorToReplace, targetColor}) => {
        const updatedColors = replaceColor(colors, colorToReplace, targetColor);
        setColors(updatedColors);
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
  };