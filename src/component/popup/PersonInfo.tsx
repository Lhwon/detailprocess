/* 화면명: 개인정보(PersonInfo)
 * 화면개요
 * - 헤더 유저 아이콘 클릭 시 출력되는 "내정보"에 대한 화면
 * - 직원 정보가 출력되는 화면
*/
import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

// 테스트 이미지 삭제 예정
import testUser from '../../image/logo/testUser.png'

interface PersonInfoModalProps {
  show: boolean
  onClose: () => void
}

const PersonInfo: React.FC<PersonInfoModalProps> = ({ show, onClose }) => { // 구조 분해로 show 가져오기
  if (!show) return null // show가 false일 경우 null 반환

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
          width: '50%',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <p>내정보</p>
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Box sx={{ width: '60%' }}>
            <Box sx={{ width: '100%', display: 'flex' }}>
              <Box sx={{ width: '50%', display: 'flex', alignItems: 'center' }}>
                <label>이름</label>
                <TextField
                  margin="normal"
                  variant="outlined"
                  sx={{
                    width: '70%',
                    ml: 2,
                    '& .MuiOutlinedInput-root': {
                      height: '40px', // 원하는 높이로 설정
                      '& input': {
                        padding: '10px', // 내부 텍스트의 여백 조정
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: '50%', display: 'flex', alignItems: 'center' }}>
                <label>전화번호</label>
                <TextField
                  margin="normal"
                  variant="outlined"
                  sx={{
                    width: '70%',
                    ml: 2,
                    '& .MuiOutlinedInput-root': {
                      height: '40px', // 원하는 높이로 설정
                      '& input': {
                        padding: '10px', // 내부 텍스트의 여백 조정
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ width: '100%', display: 'flex' }}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <label>주소</label>
                <TextField
                  margin="normal"
                  variant="outlined"
                  sx={{
                    width: '90%',
                    ml: 2,
                    '& .MuiOutlinedInput-root': {
                      height: '40px', // 원하는 높이로 설정
                      '& input': {
                        padding: '10px', // 내부 텍스트의 여백 조정
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          {/* 사용자 이미지 */}
          <Box sx={{ width: '40%', textAlign: 'center' }}>
            <Box
              component="img"
              sx={{
                height: '100%',
                width: '60%',
                borderRadius: '4px',
                objectFit: 'cover',
                border: '1px solid grey'
              }}
              src={testUser}
              alt="BangBang"
            />
          </Box>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center', mt: '12px' }}>
          <Button>
            수정
          </Button>
          <Button onClick={onClose}>
            닫기
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PersonInfo
