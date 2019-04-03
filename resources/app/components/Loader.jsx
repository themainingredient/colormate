import React from 'react';
import styled from 'styled-components';
import Globals, { flexCenter } from '../Global.styles';

const { colors, fonts } = Globals;

const LoaderWrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
  background-color: ${colors.TMIBlue};
  height: 100%;
  width: 100%;
  text-align: center;
`;

const TextBase = styled.h2`
  color: ${colors.White};
  font-family: ${fonts.Futura.bold};
`;

const LoaderTitle = styled(TextBase)`
  font-size: 20px;
`;

const LoaderContent = styled(TextBase)`
  font-size: 16px;
`;

const Loader = () => (
  <LoaderWrapper>
    <LoaderTitle>Scanning whole file...</LoaderTitle>

    <LoaderContent>
      Sorting, cleaning and <br />
      separating your colors. <br />
      Damnnn, you messy{' '}
      <span role='img' aria-label='WinkyFace'>
        😉
      </span>
    </LoaderContent>
  </LoaderWrapper>
);

export default Loader;
