import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { login } from 'api/auth'

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
      const response = await login('users/login', { id: username, password })
      
      console.log('response', response)

      if (response.status === 200) {
        const token = response.data.token // 백엔드에서 받은 토큰
        const name = response.data.name
        onLogin(token, name) // 부모 컴포넌트로 로그인 성공 알림
      } else {
        setAlertLoginErr('다시 입력해주세요.')
        // alert('로그인 실패: ' + (response.data?.error || '알 수 없는 오류'))
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
          borderRadius: '8px',
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
              handleSubmit() // 엔터 키 입력 시 실행
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
              handleSubmit() // 엔터 키 입력 시 실행
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
        {/* 로그인 정보가 잘못됬을 때 알림 */}
        <Box sx={{ p:0, m:0 }}>
        <p style={{ color: 'red' }}>{ alertLoginErr }</p>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
