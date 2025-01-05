import React, { useState, useEffect } from 'react';
import { Typography, Box, AppBar, Button, Toolbar, IconButton, StepLabel, Chip, Divider } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import routes from '../layout/route'; // routes 파일 import
import { menuApi } from 'api/commonCodeApi'

import PersonInfo from 'component/popup/PersonInfo';

// 테스트 이미지 삭제 예정
import testUser from '../../image/logo/testUser.png'

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const [userNm, setUserNm] = React.useState(null)

  const [isPersonInfoOpen, setIsPersonInfoOpen] = useState(false) // 팝업 상태

  const [menuList, setMenuList] = React.useState<Array<any>>([])

  const getMenuInfo = async () => {
    await menuApi().then(res => {
      setMenuList(res) // 메뉴 리스트 상태 업데이트
    }).catch(err => {
      console.error('Error', err)
    })

    console.log('메뉴리스트', menuList)
  }
  
  React.useEffect(() => {
    const storedData = sessionStorage.getItem('authToken')
    getMenuInfo()
  }, [])
  

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl2(null);
  };

  const handlePersonInfoClose = () => {
    setIsPersonInfoOpen(false)
  }

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
        <Box sx={{ width: '100%' }} style={{ display: 'flex' }}>
          {/* 로고 */}
          <Box sx={{ width: '10%' }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="inherit" component={Link} to="/main">
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                HW Solution
              </Typography>
            </Button>
          </Box>
          
          {/* 메뉴 정보 출력 */}
          <Box sx={{ width: '80%' }} style={{ display: 'flex' }}>
            {menuList.map((item, index) => (
              <Button color="inherit" component={Link} to={item.link}>
                { item.menu_nm }
              </Button>
            ))}
          </Box>
          
          {/* 로그인 정보가 유효할 때 출력(사용자 정보) */}
          <Box sx={{ width: '10%' }} style={{ textAlign: 'right' }}>
            <IconButton sx={{ color: 'gray' }} size="large" onClick={handleMenu}>
              <PersonIcon/>
            </IconButton>
            <Menu
              id="userInfoBar"
              anchorEl={anchorEl2}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorEl2)}
              onClose={handleClose}
            >
              <Box sx={{ width: '200px'}} style={{ textAlign: 'center' }}>
                {/* 사용자 이미지 */}
                <Box sx={{ p: 1, width: '90%', height: '150px', justifySelf: 'center' }}>
                  <Box
                    component="img"
                    sx={{
                      height: '100%',
                      width: '100%',
                      borderRadius: '4px',
                      objectFit: 'cover',
                      border: '1px solid grey'
                    }}
                    src={testUser}
                    alt="BangBang"
                  />
                </Box>
                {/* 사용자 이름 */}
                <Box sx={{ px: 1 }} style={{ textAlign: 'center' }}>
                  <Chip label="빵빵이" color="warning"/>
                </Box> 
                <Divider sx={{ pb: 1 }}/>
                {/* 버튼 내용 */}
                <MenuItem 
                  sx={{ justifyContent: "center" }} 
                  onClick={el => {
                    setIsPersonInfoOpen(true);
                    handleClose() 
                    }
                  }
                >
                  <p style={{ margin: '0px' }}>내정보</p>
                </MenuItem>
                <MenuItem sx={{ justifyContent: "center" }}>
                  <p style={{ margin: '0px' }}>로그아웃</p>
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Box>
        <PersonInfo
          show={isPersonInfoOpen}
          onClose={handlePersonInfoClose}
        />
      </Toolbar>
    </AppBar>
  );
}
