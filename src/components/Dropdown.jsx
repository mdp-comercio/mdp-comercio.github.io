import React, { useState } from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const Dropdown = ({ placeholder, options, onSelect }) => {

  return (
    <div>
      <Menu 
          arrow
          menuButton={
            <MenuButton>
              {placeholder}
            </MenuButton>} 
      >
          {options.map((option, idx) => (
              <MenuItem 
                key={idx}
                onClick={() => onSelect(option.value)}
                className="bg-gray-300 hover:bg-gray-400"
              >
                  {option.label}
              </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default Dropdown;