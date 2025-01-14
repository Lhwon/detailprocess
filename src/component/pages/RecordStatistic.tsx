import React, { useState, useEffect } from "react"
import { Typography, Box, Card, Button, Divider, TextField, Autocomplete, Chip } from '@mui/material'
import dayjs from "dayjs"

const RecordStatistic: React.FC = () => {

  // 연도 리스트 정의
  const yearList = (Array.from({ length: dayjs().year() - 2000 + 1 }, (_, i) => dayjs().year() - i))

  const workList = [
    { code: '', name: '전체' },
    { code: 'D', name: '디테일링 세차' },
    { code: 'P', name: '광택' },
    { code: 'WR', name: 'PPF/래핑' },
    { code: 'S', name: '썬팅' },
    { code: 'NP', name: '신차패키지' },
    { code: 'UP', name: '중고차패키지' },
  ]

  const [selectedWork, setSelectedWork] = useState('')

  const onClickWork = (item: string) => {
    setSelectedWork(item)
  }
  return (
    <div>
      {/* 조회조건 */}
      <Box sx={{ width: '100%', display: 'flex' }}>
        <Box sx={{ width: '25%', height: '85vh', p:3, borderRadius: '5px', backgroundColor: '#e0e0e0' }}>
          <div style={{ width: '100%' }}>
            <Autocomplete
              id="disable-close-on-select"
              disablePortal
              options={yearList}
              renderInput={(params) => (
                <TextField {...params} label="년도" variant="standard" />
              )}
            />
          </div>
          <div style={{ width: '100%', paddingTop: '12px' }}>
            <p>작업</p>
            { workList.map((item, index) => (
              <Chip
                key={item.code}
                label={item.name} 
                sx={{ m:1 }} 
                color={selectedWork === item.code ? 'primary' : 'default'}
                onClick={() => onClickWork(item.code)}
              />
            ))}
          </div>
        </Box>
        <Box sx={{ width: '75%', ml:1, p:3, borderRadius: '5px', backgroundColor: '#e0e0e0' }}>

        </Box>
      </Box>
    </div>
  )
}

export default RecordStatistic