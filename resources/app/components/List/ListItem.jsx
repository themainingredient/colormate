import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ListItemWrapper,
  ColorDataWrapper,
  DotWrapper,
  DotBG,
  DotColor,
  Title,
  Instances,
  Label,
  Spacer,
  Copied,
} from './ListItem.styles';

import { calcOpacityPercentage, copyToClipboard } from '../../helpers';

const Dot = ({ color }) => (
  <DotWrapper>
    <DotBG />
    <DotColor color={color} />
  </DotWrapper>
);

const ListItem = ({ color, instances }) => {
  const [copied, setCopied] = useState(false);

  const opacityPercentage = calcOpacityPercentage(color);

  const wrapperClickHandler = () => {
    copyToClipboard(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ListItemWrapper onClick={() => wrapperClickHandler()}>
      <ColorDataWrapper>
        <Dot color={color} />
        {copied && <Copied>Copied to clipboard</Copied>}
        {!copied && (
          <>
            <Title>{color.toUpperCase().slice(0, -2)}</Title>
            <Spacer />
            {opacityPercentage < 100 && <Label>{opacityPercentage}%</Label>}
          </>
        )}
      </ColorDataWrapper>
      <Instances>{instances}x</Instances>
    </ListItemWrapper>
  );
};

Dot.propTypes = {
  color: PropTypes.string.isRequired,
};

ListItem.propTypes = {
  color: PropTypes.string.isRequired,
  instances: PropTypes.number.isRequired,
};

export default ListItem;
