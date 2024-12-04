import React from 'react'
import { Box, Typography, Card, Button, Divider, Chip, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material'

import kiaSorento from '../../image/car/kia_sorento.png'

const Main2 : React.FC = () => {
  const chemicalProperties = [
    { code: 'acidic', name: '산성' },
    { code: 'neutral', name: '중성' },
    { code: 'alkaline', name: '알칼리성' }
  ]

  // 캐미컬
  const chemical = [
    { code: 'apc', name: 'APC' },
    { code: 'sp', name: '스노우폼' },
    { code: 'cs', name: '카샴푸' },
    { code: 'ir', name: '철분제거제' }
  ]

  // 작업 시간
  let workTime = {
    workStartTime: '',
    workEndTime: '',
    apcInjectTime: '',
    snowInjectTime: '',
    shampooInjectTime: '',
    ironInjectTime: '',
    dryTime: '',
    cottingTime: ''
  }

  const onInjectChemical = (name: string, code: string) => {
    alert(name + ' 분사 하시겠습니까?');
  }
  

  return (
    <div style={{ display: 'flex' }}>
      <Box sx={{ width: '20%', m: 0.5 }}>
        <Card style={{ padding: '8px', textAlign: 'center' }} variant="outlined">
          <Box
            component="img"
            sx={{
              height: '20%',
              width: '80%',
              borderRadius: '4px',
              objectFit: 'cover',
            }}
            src={kiaSorento}
          />
          <div>
            <Chip 
            label="67더 7334"
            color="warning"
            />
          </div>
        </Card>
        <Card sx={{ mt: 1, p: 1 }} style={{ display: 'flex' }} variant="outlined">
          <Box sx={{ width: '40%' }}>
          <p>작업 시작 시간</p>
          <p>APC 분사</p>
          <p>스노우폼 분사</p>
          <p>카샴푸 분사</p>
          <p>철분제거제 분사</p>
          <p>드라잉</p>
          <p>코팅</p>
          <p>작업 완료 시간</p>
          </Box>
          <Box sx={{ width: '60%' }}>
            <p>2024-09-24 <Typography component="span" sx={{ color: 'blue' }}>15:35:15</Typography></p>
            <p>2024-09-24 <Typography component="span" sx={{ color: 'blue' }}>15:36:01</Typography></p>
            <p>2024-09-24 <Typography component="span" sx={{ color: 'blue' }}>15:39:12</Typography></p>
            <p>2024-09-24 <Typography component="span" sx={{ color: 'blue' }}>15:47:21</Typography></p>
            <p>-</p>
            <p>2024-09-24 <Typography component="span" sx={{ color: 'blue' }}>16:09:38</Typography></p>
            <p>2024-09-24 <Typography component="span" sx={{ color: 'blue' }}>16:25:55</Typography></p>
            <p>2024-09-24 <Typography component="span" sx={{ color: 'blue' }}>16:35:03</Typography></p>
          </Box>
        </Card>
        <Card sx={{ mt: 1, p: 1 }} variant="outlined">
          <Typography>사용 캐미컬</Typography>
          <Divider/>
          <Box style={{ display: 'flex' }}>
            <Box sx={{ width: '40%' } }>
              <p>APC</p>
              <p>스노우폼</p>
              <p>카샴푸</p>
              <p>철분제거제</p>
              <p>코팅제</p>
            </Box>
            <Box sx={{ width: '60%' }}>
              <p>더클래스 중성 프리워시</p>
              <p>더클래스 만년설</p>
              <p>글로스브로 더블밤</p>
              <p>마프라 철분제거제</p>
              <p>더클래스 L0003</p>
            </Box>
          </Box>
        </Card>
      </Box>
      <Box sx={{ width: '20%', m: 0.5 }}>
        <Card style={{ padding: '8px'}} variant="outlined">
          <Typography>캐미컬</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              {chemicalProperties.map((item, index) => (
                <FormControlLabel value={item.code} control={<Radio />} label={item.name} />
              ))}
            </RadioGroup>
          <Divider/>
          <Box sx={{ mt: 1 }} style={{ textAlign: 'center' }}>
            { chemical.map((item, index) => (
              <Button 
                variant="outlined"
                sx={{ width: '45%', m: 0.5 }}
                onClick={() => onInjectChemical(item.name, item.code)}
                color="primary"
              >
                { item.name }
              </Button>
            ))}
          </Box>
        </Card>
        <Button
          variant="contained"
          sx={{ mt: 1.5, width: '100%' }}
        >
          고압수 분사
        </Button>
        <Card sx={{ mt: 1.5, p: 1 }} variant="outlined">
          <Typography>드라이</Typography>
          <Divider/>
          <Button
            variant="outlined"
            sx={{ mt: 1.5, width: '100%' }}
          >
            드라잉 시작
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 1.5, width: '100%' }}
          >
            드라잉 종료
          </Button>
        </Card>
      </Box>
    </div>
  )
}

export default Main2