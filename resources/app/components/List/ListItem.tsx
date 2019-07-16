import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker, ColorResult } from 'react-color';
import {
  ListItemWrapper,
  ColorDataWrapper,
  DotWrapper,
  DotBG,
  DotColor,
  Title,
  Instances,
  OpacityLabel,
  Spacer,
  IndicatorArrow,
  ColorPickerWrapper,
  ColorPickerBackground,
  LabelsWrapper,
  OpacityLabelWrapper,
  InstancesWrapper,
} from './ListItem.styles';
import ListItemTree from './ListItemTree';
import ListContext from '../../ListContext';
import { transformSketchColorMap } from '../../helpers/transform-sketch-colormap';

import { calcOpacityPercentage, calculateContrast, calculateColorWithAlpha } from '../../helpers/calculations';
import ReplaceBtn from '../../assets/replaceBtn.svg';
import ReplaceBtnHover from '../../assets/replaceBtnHover.svg';

const isColorContrasting = (color: any) => calculateContrast(color) > 1.2;

const ListItem = ({ color, instances, index }: { color: string, instances: any[], index: any }) => {
  const [isSelected, setSelected] = useState();
  const [realLayers, setRealLayers] = useState();
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { selectedColor, setSelectedColor } = useContext(ListContext);
  const opacityPercentage = calcOpacityPercentage(color);

  useEffect(() => {
    const layers = transformSketchColorMap({ [color]: instances });
    setRealLayers(layers[0]);
  }, []);

  useEffect(() => {
    setSelected(selectedColor === index);
  }, [selectedColor]);

  const updateSelectedColor = (itemIndex: any) => {
    setSelectedColor(itemIndex === selectedColor ? null : itemIndex);
  };

  const toggleColorPicker = () => {
    setIsColorPickerVisible(!isColorPickerVisible);
  };

  const replaceColor = (colorToReplace: string, targetColor: string, colorInstances: { id: string }[]) => {
    const layerIds = colorInstances.map(instance => instance.id);
    window.postMessage('replaceColor', {
      message: 'Replacing the color',
      colorToReplace,
      targetColor,
      layerIds,
    });
  };

  const handleReplaceColorComplete = (targetColor: ColorResult) => {
    replaceColor(color, calculateColorWithAlpha(targetColor), instances);
  };

  const OpacityIcon = ({ percentage, isActive }: { percentage: number, isActive: boolean }) => {
    return (
      <OpacityLabelWrapper>
        {percentage < 100 && <OpacityLabel isActive={isActive}>{percentage}%</OpacityLabel>}
      </OpacityLabelWrapper>
    );
  };

  const ReplaceColorIcon = ({ isActive }: { isActive: boolean }) => {
    const style = { cursor: 'pointer' };

    if (isActive) {
      return <ReplaceBtnHover style={style} onClick={() => toggleColorPicker()} />;
    }

    return <ReplaceBtn style={style} onClick={() => toggleColorPicker()} />;
  };

  return (
    <>
      <ListItemWrapper
        isActive={isSelected}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <ColorDataWrapper onClick={() => updateSelectedColor(index)}>
          <DotWrapper>
            <DotBG />
            <DotColor color={color} isBorderNeeded={isColorContrasting(color)} />
          </DotWrapper>
          <Title isActive={isSelected}>{color.toUpperCase().slice(0, -2)}</Title>
          <IndicatorArrow isSelected={isSelected} isHovered={isHovered} />
        </ColorDataWrapper>

        <Spacer />


        <LabelsWrapper>
          <OpacityIcon percentage={opacityPercentage} isActive={isSelected} />
          <ReplaceColorIcon isActive={isSelected || isHovered} />
          <InstancesWrapper>
            <Instances isActive={isSelected}>{instances.length}x</Instances>
          </InstancesWrapper>
        </LabelsWrapper>


      </ListItemWrapper>

      {isSelected && <ListItemTree tree={realLayers} />}
      {isColorPickerVisible
        ? (
          <ColorPickerWrapper>
            <ColorPickerBackground onClick={() => toggleColorPicker()} />
            <SketchPicker
              width='200px'
              presetColors={[]} // We can fetch the documentcolors and put them here to have them in the colorpicker
              color={color}
              onChangeComplete={(newColor: ColorResult) => handleReplaceColorComplete(newColor)}
            />
          </ColorPickerWrapper>
        ) : null}
    </>
  );
};

ListItem.propTypes = {
  color: PropTypes.string.isRequired,
  instances: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export default ListItem;
