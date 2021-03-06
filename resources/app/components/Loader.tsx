import React from 'react';
import styled from 'styled-components';
import Globals, { flexCenter } from '../Global.styles';

import LoaderTitle from '../assets/text1Loader.svg';
import LoaderContent from '../assets/text2Loader.svg';
import loader from '../assets/washingTransparent.gif';

const { colors } = Globals;

const LoaderWrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
  background-color: ${colors.TMIBlue};
  height: 100%;
  width: 100%;
  text-align: center;
`;

const LoaderImage = styled.img`
  height: 250px;
  margin: 40px 0;
`;

const Loader = () => (
  <LoaderWrapper>
    <LoaderTitle />
    <LoaderImage src={loader} alt='Loading...' />
    <LoaderContent />
  </LoaderWrapper>
);

export default Loader;
