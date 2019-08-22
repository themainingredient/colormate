import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Globals from '../Global.styles';
import { openUrlInBrowser } from '../helpers/window';
// TODO: style banner

const {colors} = Globals;

const BannerWrapper = styled.div`
    background-color: ${colors.LightGrey};
`;

export const Banner  = () => {
    const [isBannerVisible, showBanner] = useState(false);
    
    useEffect(() => {
        window.isBannerVisible = (isVisible: boolean) => {
            showBanner(isVisible);
        }

        window.postMessage('isBannerVisible');
    }, [])
    
    const handleYes = () => {
        // TODO: go to url
        const url = 'https://google.com'
        // openUrlInBrowser(url);
        window.postMessage('hideBanner')
        showBanner(false);
    }

    const handleNo = () => {
        window.postMessage('hideBanner')
        showBanner(false);
    }

    const handleAskAgain = () => {
        window.postMessage('postponeBanner')
        showBanner(false);
    }

    if (!isBannerVisible) {
        return null;
    }

    return (
        <BannerWrapper>
            <button onClick={handleYes}>yes</button>
            <button onClick={handleNo}>no</button>
            <button onClick={handleAskAgain}>postpone</button>
        </BannerWrapper>
    )
}