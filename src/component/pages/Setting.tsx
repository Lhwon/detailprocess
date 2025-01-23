import React, { useState, useEffect } from "react"
import { Typography, Box, Card, Button, Divider, TextField, Autocomplete, Chip } from '@mui/material'
import dayjs from "dayjs"
import MenuManagement from "./settingPages/MenuManagement"
import CodeManagement from "./settingPages/CodeManagement"
import AuthManagement from "./settingPages/AuthManagement"

const Setting: React.FC = () => {

  const settingList = [
    { code: 'M', name: '메뉴관리' },
    { code: 'CC', name: '공통코드' },
    { code: 'AT', name: '권한 관리' },
    { code: 'CMM', name: '차량 모델 관리' },
  ]

  const [selectedMenu, setSelectedMenu] = useState('M')

  const onClickMenu = (item: string) => {
    setSelectedMenu(item)
  }
  return (
    <div>
      {/* 조회조건 */}
      <Box sx={{ width: '100%', display: 'flex' }}>
        <Card variant="outlined" sx={{ width: '20%', height: '85vh', borderRadius: '5px', backgroundColor: '#F0F0F0' }}>
          <Box sx={{ width: '100%', p: 1 }}>
            <p>설정</p>
            { settingList.map((item, index) => (
              <Box
                sx={{ 
                  width: '100%',
                  my: 1,
                  backgroundColor: selectedMenu === item.code ? '#CFCFCF' : '#FFFFFF',
                  color: selectedMenu === item.code ? '#FFFFFF' : '#000000',
                  borderRadius: '5px',
                  textAlign: 'center',
                  cursor: 'pointer'
                }} 
                onClick={() => onClickMenu(item.code)}
              >
                <p style={{ margin: '12px', fontSize: '22px' }}>{item.name}</p>
              </Box>
            ))}
          </Box>
        </Card>
        <Card variant="outlined" sx={{ width: '80%', ml:1, px: 1, borderRadius: '5px' }}>
          { selectedMenu === 'M' ? (<MenuManagement />) : <></>}
          { selectedMenu === 'CC' ? (<CodeManagement />) : <></>}
          { selectedMenu === 'AT' ? (<AuthManagement />) : <></>}
        </Card>
      </Box>
    </div>
  )
}

export default Setting