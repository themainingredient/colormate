import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Globals from '../Global.styles';
import { openUrlInBrowser } from '../helpers/window';

const { colors, fonts } = Globals;

const BannerWrapper = styled.div`
    background-color: ${colors.Navy};
    height: 100px;
    width: 100%;
    padding: 16px 12px;
`;

const Text = styled.p`
    color: ${colors.White};
    font-family: ${fonts.SFPro.bold};
    font-size: 16px;
    letter-spacing: 0px;
    text-align: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
`;

const Button = styled.button`
    padding: 10px 16px;
    background: ${colors.TMIBlue};
    border-radius: 4.53px;
    color: ${colors.Cyan};
    font-size: 14px;
    font-family: ${fonts.SFPro.heavy};
    text-align: center;
    border: none;
    cursor: pointer;

    &:hover {
        background: ${colors.TMIBlueDark};
    }

    &:active {
        color: ${colors.CyanDark};
    }
`;

const Emoji = styled.span`
    font-size: 33px;
    height: 0px; /* remove default extra whitespace from emoji */
`;

export const Banner = () => {
  const [isBannerVisible, showBanner] = useState(false);

  useEffect(() => {
    window.isBannerVisible = (isVisible: boolean) => {
      showBanner(isVisible);
    };

    window.postMessage('isBannerVisible');
  }, []);

  const handleYes = () => {
    openUrlInBrowser(`${process.env.REACT_APP_TYPEFORM_URL}`);
    window.postMessage('hideBanner');
    showBanner(false);
  };

  const handleNo = () => {
    window.postMessage('hideBanner');
    showBanner(false);
  };

  const handleAskAgain = () => {
    window.postMessage('postponeBanner');
    showBanner(false);
  };

  if (!isBannerVisible) {
    return null;
  }

  return (
    <BannerWrapper>
      <Text>Help us with a 2 minute questionnaire?</Text>

      <ButtonsWrapper>
        <Emoji>🎱</Emoji>
        <Button onClick={handleYes}>Yes</Button>
        <Button onClick={handleNo}>No</Button>
        <Button onClick={handleAskAgain}>Ask again later</Button>
      </ButtonsWrapper>
    </BannerWrapper>
  );
};
