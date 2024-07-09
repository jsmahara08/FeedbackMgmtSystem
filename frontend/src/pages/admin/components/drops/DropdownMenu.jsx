import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DropdownMenu = ({ menuItems, initialTitle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState(initialTitle);
  const open = Boolean(anchorEl);
  const location = useLocation();

  useEffect(() => {
    // Update title based on current pathname
    const currentMenuItem = menuItems.find(item => `/admin/manage-class/${item.link}` === location.pathname);
    if (currentMenuItem) {
      setTitle(currentMenuItem.text);
    } else {
      setTitle(initialTitle); // Default title
    }
  }, [location.pathname, menuItems, initialTitle]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (text) => {
    setTitle(text); // Update the title state
    handleClose(); // Close the menu
  };

  return (
    <Box sx={{ bgcolor: '#cfe8fc', padding: 1, textAlign: 'center', marginTop: 1, width: '100%' }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {title} <ArrowDropDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems.map((item, index) => (
          <NavLink
            to={`/admin/manage-class/${item.link}`}
            key={index}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MenuItem onClick={() => handleMenuItemClick(item.text)}>
              {item.text}
            </MenuItem>
          </NavLink>
        ))}
      </Menu>
    </Box>
  );
};

export default DropdownMenu;
