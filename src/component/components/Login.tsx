import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { login } from 'api/auth'
import { userStore } from 'store/userStore'

interface LoginModalProps {
  show: boolean
  onLogin: (token: string, name: string) => void
}

const Login: React.FC<LoginModalProps> = ({ show, onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alertLoginErr, setAlertLoginErr] = useState('')

  if (!show) return null

  const handleSubmit = async () => {
    try {
      const res = await login('users/login', { id: username, password })

      if (res.status === 200) {
        const token = res.data.token
        const name = res.data.user.name

        sessionStorage.setItem('name', name)
        // userStore에 로그인 정보를 저장
        userStore.setUser(token, name);
        
        onLogin(token, name) // 부모 컴포넌트로 로그인 성공 알림
      } else {
        setAlertLoginErr('다시 입력해주세요.')
      }
    } catch (err) {
      console.error('로그인 오류:', err)
    }
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '300px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '5px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          로그인
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="아이디"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit()
            }
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="비밀번호"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit()
            }
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          로그인
        </Button>
        <Box sx={{ width: '100%', textAlign: 'center', display: 'flex' }}>
          <Box sx={{ width: '50%', textAlign: 'center', cursor: 'pointer' }} onClick={(e) => { alert('찾기') } }>
            <p style={{ color: 'grey' }}>찾기</p>
          </Box>
          <Box sx={{ width: '50%', textAlign: 'center', cursor: 'pointer' }} onClick={(e) => { alert('가입')} }>
            <p style={{ color: 'grey' }}>가입</p>
          </Box>
        </Box>
        <Box sx={{ p:0, m:0 }}>
        <p style={{ color: 'red' }}>{ alertLoginErr }</p>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
