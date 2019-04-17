import React from 'react';
import styled from 'styled-components';
import Globals from '../Global.styles';
import Button from './Button';

import MinimalistBubbles from '../assets/minimilistBubbles.svg';
import { closeWindow } from '../helpers/window.ts';

const { colors, fonts } = Globals;

const NoColorsFoundWrapper = styled.div`
  background-color: ${colors.LightGrey};
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  margin-top: 37px;
  color: ${colors.TMIBlue};
  font-family: ${fonts.Futura.bold};
  font-size: 21.68px;
  letter-spacing: 0.13px;
  text-align: center;
`;

const StyledMinimalistBubbles = styled(MinimalistBubbles)`
  margin-top: 42px;
  margin-left: 76px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 21px;
  right: 26px;
`;

const NoColorsFound = () => {
  return (
    <NoColorsFoundWrapper>
      <Header>
        <div>No colours found.</div>
        <div>Now that’s minimilist.</div>
      </Header>
      <StyledMinimalistBubbles />
      <ButtonWrapper>
        <Button type='button' onClick={() => closeWindow()}>
          Close
        </Button>
      </ButtonWrapper>

    </NoColorsFoundWrapper>
  );
};

export default NoColorsFound;
