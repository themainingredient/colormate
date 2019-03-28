import React from 'react';
import styled from 'styled-components';

const ListItemWrapper = styled.div`
  border-bottom: 1px solid #9b9b9b19;
  padding-left: 24px;
  padding-right: 24px;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Dot = styled.div`
  height: 35px;
  width: 35px;
  border-radius: 35px;
  background-color: ${props => props.color};
`;

const Title = styled.p`
  color: #4e41ff;
  font-size: 16px;
  font-family: 'SFProDisplay-Bold';
  font-weight: bold;
`;

const Instances = styled.p`
  color: #4d4f59;
  font-size: 14px;
  font-family: 'SFProDisplay-Regular';
  font-weight: normal;
`;

const ListItem = ({ color, instances }) => (
  <ListItemWrapper>
    <Dot color={color} />
    <Title>{color}</Title>
    <Instances>{instances}x</Instances>
  </ListItemWrapper>
);

export default ListItem;
