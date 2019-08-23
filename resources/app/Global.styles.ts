import { css, createGlobalStyle } from 'styled-components';

import SFProRegular from './assets/SFProDisplay-Regular.otf';
import SFProBold from './assets/SFProDisplay-Bold.otf';
import SFProHeavy from './assets/SFProDisplay-Heavy.otf'
import FuturaBold from './assets/Futura-Bold.otf';

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'SFProRegular';
    src: url(${SFProRegular});
  }

  @font-face {
    font-family: 'SFProBold';
    src: url(${SFProBold});
  }

  @font-face {
    font-family: 'SFProHeavy';
    src: url(${SFProHeavy});
  }

  @font-face {
    font-family: 'FuturaBold';
    src: url(${FuturaBold});
  }
`;

export default {
  colors: {
    White: '#FFFFFF',
    TMIBlueLight: '#EDECFF',
    TMIBlue: '#4E41FF',
    TMIBlueDark: '#3B2EEB',
    LightGrey: '#E8E9EF',
    MediumGrey: '#B5B8C6',
    DarkGrey: '#4d4f59',
    Black25: '#00000040',
    Cyan: '#00FFFF',
    CyanDark: '#00DDDD',
    Navy: `#0D0166`
  },
  fonts: {
    SFPro: {
      reg: 'SFProRegular',
      bold: 'SFProBold',
      heavy: 'SFProHeavy'
    },
    Futura: {
      bold: 'FuturaBold',
    },
  },
};

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
