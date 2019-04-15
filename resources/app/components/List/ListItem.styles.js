import styled from 'styled-components';
import Globals from '../../Global.styles';

import CheckeredBackground from '../../assets/checkered_small.svg';
import Arrow from '../../assets/arrowWhite.svg';

const { colors, fonts } = Globals;

export const ListItemWrapper = styled.div`
  border-bottom: 1px solid ${colors.LightGrey};
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${({ isActive }) => (isActive ? colors.TMIBlue : '')};
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  &:hover {
    background-color: ${colors.TMIBlue};
  }
`;

export const DotWrapper = styled.div`
  height: 37px;
  width: 37px;
`;

export const DotBG = styled(CheckeredBackground)`
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  right: 1px;
  background-size: 50px;
  border-radius: 39px;
`;

export const DotColor = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  padding: 1px;
  background-clip: content-box;
  border-radius: 39px;
  background-color: ${({ color }) => color};
  box-shadow: ${({ isBorderNeeded }) => {
    if (isBorderNeeded) {
      return `0 0 0 2px ${colors.White} inset`;
    }
    return `0 0 0 1px ${colors.MediumGrey} inset`;
  }}
`;

export const Title = styled.p`
  margin-left: 8px;
  color: ${({ isActive }) => (isActive ? colors.White : colors.TMIBlue)};
  font-size: 16px;
  font-family: ${fonts.SFPro.bold};

  ${ListItemWrapper}:hover & {
    color: ${colors.White};
  }
`;

export const Instances = styled.p`
  color: ${({ isActive }) => (isActive ? colors.White : colors.DarkGrey)};
  font-size: 14px;
  font-family: ${fonts.SFPro.reg};
  font-weight: normal;

  ${ListItemWrapper}:hover & {
    color: ${colors.White};
  }
`;

export const ColorDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 172px;
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const Label = styled.p`
  color: ${({ isActive }) => (isActive ? colors.TMIBlue : colors.DarkGrey)};
  font-family: ${fonts.SFPro.bold};
  font-size: 11px;
  width: 36px;
  height: 24px;
  line-height: 26px;
  text-align: center;
  background-color: ${({ isActive }) => (isActive ? colors.White : colors.LightGrey)};
  border-radius: 2px;

  ${ListItemWrapper}:hover & {
    color: ${colors.TMIBlue};
    background-color: ${colors.White};
  }
`;

export const IndicatorArrow = styled(Arrow)`
  transform: ${({ isActive }) => (isActive ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: transform 150ms ease-in-out;
`;
