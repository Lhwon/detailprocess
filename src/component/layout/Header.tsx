import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
// import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import routes from '../layout/route'; // routes 파일 import

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#F5F7FA', color: '#3A3A3A' }}>
      <Toolbar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {routes.map((route, index) => (
            <MenuItem
              key={index}
              component={Link}
              to={route.path}
              onClick={handleClose}
            >
              {route.path.replace('/', '')} {/* 경로에서 '/' 제거하여 이름 표시 */}
            </MenuItem>
          ))}
        </Menu>
        <Box sx={{ width: '100%' }} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button color="inherit" component={Link} to="/main">
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              HW Solution
            </Typography>
          </Button>
          
          <Button color="inherit" component={Link} to="/addWork">
          작업 추가
        </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
