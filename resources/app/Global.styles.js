import { css } from 'styled-components';

export default {
  colors: {
    White: '#FFFFFF',
    TMIBlue: '#4E41FF',
    TMIBlueDark: '#3B2EEB',
    LightGrey: '#E7EBEC',
    MediumGrey: '#4d4f59',

  },
  fonts: {
    SFPro: {
      reg: 'SFProDisplay-Regular',
      bold: 'SFProDisplay-Bold',
    },
  },
};

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
