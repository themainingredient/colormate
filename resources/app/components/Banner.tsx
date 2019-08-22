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
    const [isPopUpVisible, showPopUp] = useState(false);
    
    useEffect(() => {
        window.isPopUpVisible = (isVisible: boolean) => {
            showPopUp(isVisible);
        }

        window.postMessage('isPopUpVisible');
    }, [])
    
    const handleYes = () => {
        // TODO: go to url
        const url = 'https://google.com'
        // openUrlInBrowser(url);
        window.postMessage('hidePopUp')
        showPopUp(false);
    }

    const handleNo = () => {
        window.postMessage('hidePopUp')
        showPopUp(false);
    }

    const handleAskAgain = () => {
        // TODO: handleAskAgain
    }

    if (!isPopUpVisible) {
        return null;
    }

    return (
        <BannerWrapper>
            <button onClick={handleYes}>feedback</button>
            <button onClick={handleNo}>feedback</button>
            <button onClick={handleAskAgain}>feedback</button>
        </BannerWrapper>
    )
}