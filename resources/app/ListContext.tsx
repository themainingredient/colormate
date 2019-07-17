import React, { useState, Dispatch } from 'react';
import PropTypes from 'prop-types';

const ListContext = React.createContext({
  selectedColor: '',
  setSelectedColor: '' as unknown as Dispatch<any>,
  selectedLayer: '',
  setSelectedLayer: '' as unknown as Dispatch<any>,
  colors: {},
  setColors: '' as unknown as Dispatch<any>,
});

export const ListProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedLayer, setSelectedLayer] = useState();
  const [colors, setColors] = useState();

  return (
    <ListContext.Provider
      value={{
        selectedColor,
        setSelectedColor,
        selectedLayer,
        setSelectedLayer,
        colors,
        setColors,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

ListProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ListContext;
