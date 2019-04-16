import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ListContext = React.createContext();

export const ListProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedLayer, setSelectedLayer] = useState();

  return (
    <ListContext.Provider
      value={{
        selectedColor,
        setSelectedColor,
        selectedLayer,
        setSelectedLayer,
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
