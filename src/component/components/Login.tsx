import React, { useState, useEffect } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { login } from 'api/auth'
import { userStore } from 'store/userStore'
import Input from '../components/Input'

interface LoginModalProps {
  show: boolean
  onLogin: (token: string, name: string) => void
}

const Login: React.FC<LoginModalProps> = ({ show, onLogin }) => {
  // 화면 변경 (로그인 <-> 가입)
  const [changeDisplay, setChangeDisplay] = useState<Boolean>(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alertLoginErr, setAlertLoginErr] = useState('')

  useEffect(() => {
    const handleAnimation = () => {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `;
      document.head.append(style);
    };

    handleAnimation();
  }, []);

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
        width: '100%',
        height: '98vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #F5F5F5, #BDBDBD)'
      }}
    >
      <Box 
        sx={{ 
          width: '50%',
          height: '65%',
          display: 'flex',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(to right, #5d4037, #8D6E63)',
          boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22), inset 3px -3px 2px 2px rgba(0, 0, 0, 0.2), inset -2px 3px 2px 2px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* 왼쪽 영역 */}
        <Box
          sx={{
            width: '60%',
            height: '100%',
            background: changeDisplay ? 'linear-gradient(to right, #EEEEEE, #E0E0E0)' : '',
            borderRadius: '0px 80px 80px 10px',
            transition: 'width 0.5s ease, background-color 0.5s ease',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: changeDisplay ? '3px 3px 4px 1px rgba(0, 0, 0, 0.2), inset -3px -3px 8px 2px rgba(0, 0, 0, 0.1), inset 4px 6px 8px 2px rgba(0, 0, 0, 0.1)' : '',
            animation: changeDisplay ? 'slideInLeft 0.7s ease' : '',
          }}
        >
          {changeDisplay ? (
            <Box sx={{ width: '100%', height: '100%', textAlign: 'center', alignContent: 'center' }}>
              <Box sx={{ width: '100%', height: '5%' }}>
                <p style={{ fontSize: '24px' }}>회원가입</p>
              </Box>
              <Box sx={{ width: '100%', height: '15%', justifyItems: 'center' }}>
                <Box sx={{ width: '50%', border: '1px solid grey', borderRadius: '10px', display: 'flex', justifyContent: 'center' }}>
                  <input
                    type='checkbox'
                    value=''
                  />
                  <p>약관 동의</p>
                </Box>
              </Box>
              <Box sx={{ width: '100%', height: '60%' }}>
                <Input 
                  label='ID'
                  value=''
                  labelWidth='20%'
                  width='100%'
                />
                <Input 
                  label='비밀번호'
                  value=''
                  labelWidth='20%'
                  width='100%'
                  mt={3}
                />
                <Input 
                  label='이름'
                  value=''
                  labelWidth='20%'
                  width='100%'
                  mt={3}
                />
                <Input 
                  label='생년월일'
                  value=''
                  type='date'
                  labelWidth='20%'
                  width='100%'
                  mt={3}
                />
                <Input 
                  label='전화번호'
                  value=''
                  labelWidth='20%'
                  width='100%'
                  mt={3}
                />
                <Input 
                  label='주소'
                  value=''
                  labelWidth='20%'
                  width='100%'
                  mt={3}
                />
              </Box>
              <Box sx={{ width: '100%', height: '10%' }}>
                <Button 
                  sx={{
                    color: '#FFFFFF',
                    background: 'linear-gradient(to right, #D0D0D0, #B0B0B0)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), inset -2px -2px 4px 2px rgba(255, 255, 255, 0.15), inset 3px 3px 6px 2px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(to right, #C0C0C0, #A0A0A0)',
                      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3), inset -3px -3px 10px 2px rgba(255, 255, 255, 0.2), inset 4px 6px 8px 2px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                  onClick={() => setChangeDisplay(true)}
                >
                  <span>가입하기</span>
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ width: '100%', height: '100%', textAlign: 'center', alignContent: 'center' }}>
              <Box sx={{ width: '100%', height: '20%', justifyItems: 'center' }}>
                <Box sx={{ width: '55%', height: '20%' }}>
                  <p style={{
                      color: '#F5F5F5',
                      fontSize: '24px',
                    }}
                  >
                    디테일러를 위한 스마트한 도구!
                  </p>
                </Box>
              </Box>
              <Box sx={{ width: '100%', height: '30%' }}>
                <p style={{ color: '#F5F5F5' }}>
                  효율적인 업무 관리<br/>
                  다양한 방식의 데이터 분석 결과 확인<br/>
                  신속 정확한 디테일링 프로세스
                </p>
              </Box>
              <Box sx={{ width: '95%', height: '10%', textAlign: 'right' }}>
                <p
                  style={{
                    color: '#F5F5F5',
                    animation: 'blink 1s infinite',
                    cursor: 'pointer',
                  }}
                  onClick={() => setChangeDisplay(true)}
                >
                  {'<< 가입'}
                </p>
                <style>
                  {`
                    @keyframes blink {
                      0%, 100% {
                        opacity: 1;
                      }
                      50% {
                        opacity: 0;
                      }
                    }
                  `}
                </style>
              </Box>
            </Box>
          )}
        </Box>

        {/* 오른쪽 영역 */}
        <Box
          sx={{
            width: '40%',
            height: '100%',
            background: changeDisplay ? '' :  'linear-gradient(to right, #EEEEEE, #E0E0E0)',
            borderRadius: '80px 10px 10px 80px',
            transition: 'width 0.5s ease, background-color 0.5s ease',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: changeDisplay ? '' : '-3px 3px 4px 1px rgba(0, 0, 0, 0.2), inset 3px -3px 8px 2px rgba(0, 0, 0, 0.3), inset -4px 6px 8px 2px rgba(0, 0, 0, 0.2)',
            animation: changeDisplay ? '' : 'slideInRight 0.7s ease',
          }}
        >
          {changeDisplay ? (
            <Box sx={{ width: '100%', height: '100%', textAlign: 'center', alignContent: 'center' }}>
              <Box sx={{ width: '100%', height: '20%', justifyItems: 'center' }}>
                <Box sx={{ width: '100%', height: '20%' }}>
                  <p style={{ fontSize: '24px', color: '#F5F5F5' }}>더 나은 일상을 위한 첫 걸음!</p>
                </Box>
              </Box>
              <Box sx={{ width: '100%', height: '20%' }}>
                <p style={{ color: '#F5F5F5' }}>
                  회원가입은 1분이면 완료됩니다!<br/>
                  간단한 절차로 빠르게 시작하세요.
                </p>
              </Box>
              <Box sx={{ width: '100%', height: '20%' }}>
                <Button 
                  sx={{
                    color: '#FFFFFF',
                    background: 'linear-gradient(to right, #D0D0D0, #B0B0B0)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), inset -2px -2px 4px 2px rgba(255, 255, 255, 0.15), inset 3px 3px 6px 2px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(to right, #C0C0C0, #A0A0A0)',
                      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3), inset -3px -3px 10px 2px rgba(255, 255, 255, 0.2), inset 4px 6px 8px 2px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                  onClick={() => setChangeDisplay(false)}
                >
                  <span>돌아가기</span>
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ width: '100%', height: '100%', textAlign: 'center', alignContent: 'center' }}>
              <Box sx={{ width: '100%', height: '20%' }}>
                <p style={{ fontSize: '24px' }}>로그인</p>
              </Box>
              <Box sx={{ width: '100%', height: '30%' }}>
                <Input 
                  label='ID'
                  value=''
                  labelWidth='20%'
                  width='100%'
                  onChange={(el) => setUsername(el) }
                />
                <Input 
                  label='PW'
                  value=''
                  labelWidth='20%'
                  width='100%'
                  mt={3}
                  onChange={(el) => setPassword(el)}
                />
                <Box sx={{ mt: 3}}>
                {alertLoginErr && (
                  <Typography variant='body2' color='error'>
                    {alertLoginErr}
                  </Typography>
                )}
              </Box>
              </Box>
              <Box sx={{ width: '100%', height: '20%' }}>
                <Button 
                  // variant="outlined"
                  // color='inherit'
                  sx={{
                    color: '#FFFFFF',
                    background: 'linear-gradient(to right, #D0D0D0, #B0B0B0)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), inset -2px -2px 4px 2px rgba(255, 255, 255, 0.15), inset 3px 3px 6px 2px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(to right, #C0C0C0, #A0A0A0)',
                      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3), inset -3px -3px 10px 2px rgba(255, 255, 255, 0.2), inset 4px 6px 8px 2px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                  onClick={handleSubmit}
                >
                  <span>로그인</span>
                </Button>
                <p style={{ 
                    marginTop: '21px', 
                    color: '#01579B',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  패스워드를 잊으셨나요?
                </p>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Login
