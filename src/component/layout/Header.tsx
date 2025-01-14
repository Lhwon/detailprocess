import React, { useState, useEffect } from 'react';
import { Typography, Box, AppBar, Button, Toolbar, IconButton, Menu, MenuItem, Chip, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import routes from '../layout/route'; 
import { menuApi } from 'api/commonCodeApi';
import PersonInfo from 'component/popup/PersonInfo';
import { userStore } from 'store/userStore'

// 테스트 이미지 삭제 예정
import testUser from '../../image/logo/testUser.png';

export default function Header() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [isPersonInfoOpen, setIsPersonInfoOpen] = useState(false); // 팝업 상태
  const [menuList, setMenuList] = useState<Array<any>>([]);
  const [user, setUser] = useState<{ token: string | null; name: string }>({ token: null, name: '' }); // 기본값을 공백 문자열로 설정

  useEffect(() => {
    const storedData = sessionStorage.getItem('authToken');
    const storedUser = userStore.getUser();
    // setUser(storedUser || { token: null, name: null }); // 기본값 설정

    getMenuInfo();
  }, []);

  const getMenuInfo = async () => {
    try {
      const res = await menuApi();
      setMenuList(res);
    } catch (err) {
      console.error('Error', err);
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl2(null);
  };

  const handlePersonInfoClose = () => {
    setIsPersonInfoOpen(false);
  };

  const handleLogout = () => {
    // 사용자 로그아웃 처리
    userStore.clearUser();
    sessionStorage.clear()
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#F5F7FA', color: '#3A3A3A' }}>
      <Toolbar>
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
          <Box sx={{ width: '80%' }} style={{ display: 'flex', justifyContent: 'center' }}>
            {menuList.map((item, index) => (
              <Button key={index} color="inherit" component={Link} to={item.link}>
                <p style={{ fontWeight: 'bold' }}>{item.menu_nm}</p>
              </Button>
            ))}
          </Box>

          {/* 로그인 정보 출력 (사용자 정보) */}
          <Box sx={{ width: '10%' }} style={{ textAlign: 'right', alignSelf: 'center' }}>
            <IconButton sx={{ color: 'gray' }} size="large" onClick={handleMenu}>
              <PersonIcon />
            </IconButton>
            <Menu
              id="userInfoBar"
              anchorEl={anchorEl2}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={Boolean(anchorEl2)}
              onClose={handleClose}
            >
              <Box sx={{ width: '200px' }} style={{ textAlign: 'center' }}>
                {/* 사용자 이미지 */}
                <Box
                  sx={{
                    p: 1,
                    width: '90%',
                    height: '150px',
                    justifySelf: 'center',
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: '100%',
                      width: '100%',
                      borderRadius: '4px',
                      objectFit: 'cover',
                      border: '1px solid grey',
                    }}
                    src={testUser}
                    alt="User Image"
                  />
                </Box>
                {/* 사용자 이름 */}
                <Box sx={{ px: 1 }} style={{ textAlign: 'center' }}>
                  <Chip label={sessionStorage.getItem("name") || '로그인하세요'} color="warning" />
                </Box>
                <Divider sx={{ pb: 1 }} />
                {/* 버튼 내용 */}
                <MenuItem
                  sx={{ justifyContent: 'center' }}
                  onClick={(el) => {
                    setIsPersonInfoOpen(true);
                    handleClose();
                  }}
                >
                  <p style={{ margin: '0px' }}>내정보</p>
                </MenuItem>
                <MenuItem
                  sx={{ justifyContent: 'center' }}
                  onClick={handleLogout} // 로그아웃 버튼 클릭 시 처리
                >
                  <p style={{ margin: '0px' }}>로그아웃</p>
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Box>
        <PersonInfo show={isPersonInfoOpen} onClose={handlePersonInfoClose} />
      </Toolbar>
    </AppBar>
  );
}
