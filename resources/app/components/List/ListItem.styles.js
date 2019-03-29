import styled from 'styled-components';
import Globals from '../../Global.styles';

const { colors, fonts } = Globals;

// TODO: Get a non opacity grey for the border-bottom
export const ListItemWrapper = styled.div`
  border-bottom: 1px solid #9b9b9b19;
  padding-left: 24px;
  padding-right: 24px;
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

export const Dot = styled.div`
  height: 39px;
  width: 39px;
  border-radius: 39px;
  background-color: ${props => props.color};
  border: 2px solid ${colors.White};
`;

export const Title = styled.p`
  margin-left: 16px;
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
`;
