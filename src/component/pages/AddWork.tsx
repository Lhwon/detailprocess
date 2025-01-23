import React, { useState, useEffect } from 'react'
import { Typography, Box, Card, Button, Divider, TextField, Autocomplete } from '@mui/material'
import Swal from 'sweetalert2'
import commonSearchApi from 'api/commonApi'
import { commonCodeApi } from 'api/commonCodeApi'
import dayjs from 'dayjs'

const Main: React.FC = () => {
  const [carNumber, setCarNumber] = useState('')
  const [origin, setOrigin] = useState<string | null>(null)
  const [carManufacture, setCarManufacture] = useState<string | null>(null)
  const [carType, setCarType] = useState<string | null>(null)
  const [carYear, setCarYear] = useState<string | null>(null)
  const [workType, setWorkType] = useState<string | null>(null)
  const [workSchedule, setWorkSchedule] = useState<string | null>(dayjs().format('YYYY-MM-DD'))

  interface CodeType {
    code: string;
    name: string;
  }

  const [codeList, setCodeList] = useState<{
    ORIGIN: CodeType[];
    MANUFACTURE: CodeType[];
    CAR_TYPE?: CodeType[];
    WORK_TYPE?: CodeType[];
  }>({
    ORIGIN: [],
    MANUFACTURE: []
  })

  useEffect(() => {
    searchOrigin()
    // setWorkSchedule(dayjs().format('YYYY-MM-DD'))
  }, [])

  // 제조국 조회
  const searchOrigin = async () => {
    commonCodeApi('CAR', 'ORIGIN', '', '').then(res => {
      setCodeList(prevState => ({
        ...prevState,
        ORIGIN: res.data
      }))
    })
  }

  // 제조사 조회
  const searchMenufacture = async (item: string | '') => {
    console.log('item', item)
    commonCodeApi('CAR', 'MANUFACTURE', 'ORIGIN', item).then(res => {
      setCodeList(prevState => ({
        ...prevState,
        MANUFACTURE: res.data
      }))
    })
  }

  const CAR_MANUFACTURE = [
    { code: 'kia', name: '기아' },
    { code: 'hyd', name: '현대' },
    { code: 'kgm', name: 'KGM' },
    { code: 'sbr', name: '쉐보레' },
    { code: 'bmw', name: 'BMW' },
    { code: 'benz', name: '벤츠' },
    { code: 'audi', name: '아우디' },
  ]

  const CAR_TYPE = [
    { code: 'morning', name: '모닝' },
    { code: 'seltos', name: '셀토스' },
    { code: 'sportage', name: '스포티지' },
    { code: 'sorento', name: '쏘렌토' },
    { code: 'k3', name: 'K3' },
    { code: 'k5', name: 'K5' },
    { code: 'k8', name: 'K8' },
  ]

  const WORK_TYPE = [
    { code: 'D', name: '디테일링' },
    { code: 'P', name: '폴리싱' },
    { code: 'ST', name: '썬팅' },
    { code: 'WR', name: '랩핑(PPF포함)' },
    { code: 'NP', name: '신차패키지' },
    { code: 'UP', name: '중고차 패키지' },
  ]

  const onSave = () => {
    let data = {
      work_type: workType,
      car_manufacture: carManufacture,
      car_type: carType,
      year: '2024',
      car_number: carNumber,
      worker: 'admin',
      work_schedule: workSchedule,
      user_id: 'admin'
    }

    Swal.fire({
      title: '저장하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '저장',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        commonSearchApi(
          'work/addwork', 
          data
        ).then(res => {
          if (res.status === 200) {
            Swal.fire('저장 완료!', '변경 사항이 저장되었습니다.', 'success')
          }
        }).catch(err => {
          Swal.fire('Error', err, 'error')
        })
      }
    });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '60%' }} variant='outlined'>
        <Typography variant="h6" sx={{ p: 1 }}>
          작업 차량 등록
        </Typography>
        <Divider />
        <Box sx={{ p: 2 }} style={{ display: 'flex' }}>
          <TextField
            label="차량번호"
            value={carNumber}
            variant="standard"
            onChange={(event) => setCarNumber(event.target.value)}
            sx={{ width: '20%' }}
          />
          <Autocomplete
            disablePortal
            options={Array.isArray(codeList.ORIGIN) && codeList.ORIGIN.length > 0 ? codeList.ORIGIN : []} // 배열인지 확인
            getOptionLabel={(option) => option.name || ''} // name이 없을 때 빈 문자열 반환
            onChange={(event, newValue) => searchMenufacture(newValue?.code ?? '')} // code만 저장
            sx={{ width: '20%', ml: 1 }}
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="제조국" 
                variant="standard"
              />
            }
          />
          <Autocomplete
            disablePortal
            options={Array.isArray(codeList.MANUFACTURE) && codeList.MANUFACTURE.length > 0 ? codeList.MANUFACTURE : []} // 배열인지 확인
            getOptionLabel={(option) => option.name || ''} // name이 없을 때 빈 문자열 반환
            onChange={(event, newValue) => setCarManufacture(newValue?.code ?? '')} // code만 저장
            sx={{ width: '20%', ml: 1 }}
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="제조사" 
                variant="standard"
              />
            }
          />
          <Autocomplete
            disablePortal
            options={CAR_TYPE}
            getOptionLabel={(option) => option.name} 
            onChange={(event, newValue) => setCarType(newValue?.code ?? null)} // code만 저장
            sx={{ width: '20%', ml: 1 }}
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="차종" 
                variant="standard"
              />
            }
          />
          <TextField
            label="연식"
            value={carYear}
            variant="standard"
            onChange={(event) => setCarNumber(event.target.value)}
            sx={{ width: '20%', ml: 1}}
          />
        </Box>
        <Box sx={{ p: 2 }} style={{ display: 'flex' }}>
          <Autocomplete
            disablePortal
            options={WORK_TYPE}
            getOptionLabel={(option) => option.name} 
            onChange={(event, newValue) => setWorkType(newValue?.code ?? null)} // code만 저장
            sx={{ width: '20%' }}
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="작업종류" 
                variant="standard"
              />
            }
          />
          <TextField
            label="작업일" 
            type='date'
            variant="standard"
            sx={{ width: '20%', ml: 1 }}
            InputLabelProps={{ shrink: true }} // 라벨이 겹치지 않게 설정
            value={workSchedule}
            onChange={(event) => setWorkSchedule(event.target.value)}
          />
          <Autocomplete
            disablePortal
            options={WORK_TYPE}
            getOptionLabel={(option) => option.name} 
            onChange={(event, newValue) => setWorkType(newValue?.code ?? null)} // code만 저장
            sx={{ width: '20%', ml: 1 }}
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="작업자" 
                variant="standard"
              />
            }
          />
        </Box>
        <Box sx={{ my: 2, width: '100%' }} style={{ textAlign: 'center' }}>
          <Button variant="outlined" onClick={onSave}>저장</Button>
        </Box>
      </Card>
    </div>
  )
}

export default Main
