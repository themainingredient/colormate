import styled from 'styled-components';
import Globals from '../Global.styles';

const { colors, fonts } = Globals;

const Button = styled.button`
  height: 37px;
  width: 92px;
  font-family: ${fonts.SFPro.bold};
  font-size: 14px;
  color: ${colors.White};
  border-radius: 23px;
  background-color: ${colors.TMIBlue};
  border: none;

  &:hover {
    background-color: ${colors.TMIBlueDark};
    cursor: pointer;
  }
`;

export default Button;
