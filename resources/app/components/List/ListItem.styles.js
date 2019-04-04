import styled from 'styled-components';
import Globals from '../../Global.styles';

import CheckeredBackground from '../../assets/checkered_small.svg';

const { colors, fonts } = Globals;

// TODO: Get a non opacity grey for the border-bottom
export const ListItemWrapper = styled.div`
  border-bottom: 1px solid #9b9b9b19;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${colors.White};
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
  height: 39px;
  width: 39px;
`;

export const DotBG = styled(CheckeredBackground)`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 35px;
  border: 2px solid ${colors.White};
`;

export const DotColor = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  left: 2px;
  border-radius: 35px;
  background-color: ${props => props.color};
`;

export const Title = styled.p`
  margin-left: 8px;
  color: ${colors.TMIBlue};
  font-size: 16px;
  font-family: ${fonts.SFPro.bold};
  font-weight: bold;

  ${ListItemWrapper}:hover & {
    color: ${colors.White};
  }
`;

export const Instances = styled.p`
  color: ${colors.MediumGrey};
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
  color: ${colors.MediumGrey};
  font-family: ${fonts.SFPro.bold};
  font-size: 11px;
  width: 36px;
  height: 24px;
  line-height: 26px;
  text-align: center;
  background-color: ${colors.LightGrey};
  border-radius: 2px;

  ${ListItemWrapper}:hover & {
    color: ${colors.TMIBlue};
    background-color: ${colors.White};
  }
`;
