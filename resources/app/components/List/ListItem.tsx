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
  InstancesWrapper
} from './ListItem.styles';
import ListItemTree from './ListItemTree';
import ListContext from '../../ListContext';
import { transformSketchColorMap } from '../../helpers/transform-sketch-colormap';

import { calcOpacityPercentage, calculateContrast } from '../../helpers/calculations';
import ReplaceBtn from '../../assets/ReplaceBtn.svg';
import ReplaceBtnHover from '../../assets/ReplaceBtnHover.svg';

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

  const handleListItemClick = (itemIndex: any) => {
    setSelectedColor(itemIndex === selectedColor ? null : itemIndex);
  };

  const toggleColorPicker = () => {
    setIsColorPickerVisible(!isColorPickerVisible);
  }

  const handleReplaceColorComplete = (targetColor: ColorResult) => {
    replaceColor(color, targetColor.hex, instances)
    toggleColorPicker()
  }

  const replaceColor = (colorToReplace: string, targetColor: string, instances: {id: string}[]) => {
    const layerIds = instances.map(instance => instance.id);
    window.postMessage('replaceColor', {
      message: 'Replacing the color',
      colorToReplace,
      targetColor,
      layerIds
    });
  }

  const OpacityIcon = ({opacityPercentage, isActive}: {opacityPercentage: number, isActive: boolean}) => {
    return (
      <OpacityLabelWrapper>
        {opacityPercentage < 100 && <OpacityLabel isActive={isActive}>{opacityPercentage}%</OpacityLabel>}
      </OpacityLabelWrapper>
    )
  }

  const ReplaceColorIcon = ({isActive}: {isActive: boolean}) => {
    const style = {cursor: 'pointer'};

    if (isActive) {
      return <ReplaceBtnHover style={style} onClick={() => toggleColorPicker()}/> 
    }

    return <ReplaceBtn style={style} onClick={() => toggleColorPicker()}/>
  }

  return (
    <>
      <ListItemWrapper 
        isActive={isSelected} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}>

        <ColorDataWrapper>
          <DotWrapper>
            <DotBG />
            <DotColor color={color} isBorderNeeded={isColorContrasting(color)} />
          </DotWrapper>
          <Title isActive={isSelected}>{color.toUpperCase().slice(0, -2)}</Title>   
          <IndicatorArrow isActive={isSelected || isHovered} onClick={() => handleListItemClick(index)}/>       
        </ColorDataWrapper>

        <Spacer />


        <LabelsWrapper>
          <OpacityIcon opacityPercentage={opacityPercentage} isActive={isSelected}/>
          <ReplaceColorIcon isActive={isSelected || isHovered}/>
          <InstancesWrapper>
            <Instances isActive={isSelected}>{instances.length}x</Instances>
          </InstancesWrapper>
        </LabelsWrapper>
        

      </ListItemWrapper>

      {isSelected && <ListItemTree tree={realLayers} />}
      { isColorPickerVisible ? 
        <ColorPickerWrapper>
          <ColorPickerBackground onClick={ () => toggleColorPicker() }/>
          <SketchPicker width="200px" presetColors={[]} onChangeComplete={(color: ColorResult) => handleReplaceColorComplete(color) } />
        </ColorPickerWrapper> : null }
    </>
  );
};

ListItem.propTypes = {
  color: PropTypes.string.isRequired,
  instances: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export default ListItem;
