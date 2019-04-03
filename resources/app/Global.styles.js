import { css } from 'styled-components';

export default {
  colors: {
    White: '#FFFFFF',
    TMIBlue: '#4E41FF',
    LightGrey: '#E7EBEC',
    MediumGrey: '#4d4f59',

  },
  fonts: {
    SFPro: {
      reg: 'SFProDisplay-Regular',
      bold: 'SFProDisplay-Bold',
    },
    Futura: {
      bold: 'Futura-Bold',
    },
  },
};

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
