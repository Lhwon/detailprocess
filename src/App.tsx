import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import Header from './component/layout/Header'
import Footer from './component/layout/Footer'
import Main from './component/pages/Main'
import routes from './component/layout/route'
import Login from './component/components/Login'

const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false) // 로그인 상태
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false) // 팝업 상태

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken') // 세션에서 로그인 정보 확인
    if (authToken) {
      setIsLogin(true) // 로그인 상태로 설정
    } else {
      setIsLoginPopupOpen(true) // 로그인 팝업 열기
    }
  }, [])

  const handleLogin = (token: string) => {
    sessionStorage.setItem('authToken', token) // 세션 스토리지에 토큰 저장
    setIsLogin(true) // 로그인 상태 갱신
    setIsLoginPopupOpen(false) // 팝업 닫기
  }

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        <Header />
        <Box sx={{ flex: 1, padding: '10px' }}>
          <Routes>
            {/* 기본 경로에서 Main 페이지를 렌더링 */}
            <Route path="/" element={<Main />} />

            {/* 동적 라우트 정보 적용 */}
            {routes.map(({ path, component: Component, exact }, index) => (
              <Route key={index} path={path} element={<Component />} />
            ))}
          </Routes>
        </Box>
        <Footer />
        
        {/* 로그인 팝업 */}
        <Login
          show={isLoginPopupOpen}
          onLogin={handleLogin} // 로그인 성공 핸들러
        />
      </Box>
    </Router>
  )
}

export default App
