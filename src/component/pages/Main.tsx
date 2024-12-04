import React, { useState, useEffect } from 'react'
import { Typography, Box, Card, Button, Stepper, Step, StepLabel, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Grid from 'component/components/Grid'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import dayjs, { Dayjs } from 'dayjs'
import commonSearchApi from 'api/commonApi'
import commonCodeApi from 'api/commonCodeApi'
import kiaMorning from '../../image/car/kia_morning.png'
import kiaSorento from '../../image/car/kia_sorento.png'
import { NullLiteral } from 'typescript'

// WorkData 인터페이스 정의
interface WorkData {
  work_id: number
  no: number
  car_number: string
  car_type: string
  work_status: string
  work_type: string
  worker: string
}

interface CodeList {
  WORK_TYPE: string[]  // 작업 종류 코드 리스트
  WORK_STATUS: string[]  // 작업 상태 코드 리스트
}

interface stepList {
  no: string,
  work_code: string,
  work_name: string,
}

const Main: React.FC = () => {
  // 최초실행
  useEffect(() => {
    const today = dayjs() // 현재 날짜
    const formattedDate = today.format('YYYY-MM-DD') // 날짜 포맷
    onSelectDate(today) // 날짜 선택 함수 호출

    Promise.all([
      commonCodeApi('WORK', 'TYPE', '', ''),  // 작업 종류 코드 API
      commonCodeApi('WORK', 'STATUS', '', '') // 작업 상태 코드 API
    ]).then(([typeRes, statusRes]) => {
      setCodeList({
        WORK_TYPE: typeRes.data,  // 작업 종류 코드 리스트 설정
        WORK_STATUS: statusRes.data  // 작업 상태 코드 리스트 설정
      })
    })
  }, [])

  const navigate = useNavigate()
  const [searchDate, setSearchDate] = useState<Dayjs | null>(null)
  const [dataRow, setDataRow] = useState<WorkData[]>([])
  const [activeStep, setActiveStep] = useState(0)
  const [chipCarNumber, setChipCarNumber] = useState<string | null>(null)
  // 코드 리스트
  const [codeList, setCodeList] = useState<CodeList>({ WORK_TYPE: [], WORK_STATUS: [] })  // 초기값 설정
  const [steps, setSteps] = useState<stepList[]>([])

  const headers = {
    work_id: '작업번호',
    no: '작업순서',
    car_number: '차량번호',
    car_type: '차량명',
    work_status: '작업상태',
    work_type: '작업종류',
    worker: '작업자',
  }

  const headerVisible = ['work_id']
  const clickableColumns = ['no', 'car_number', 'car_type', 'work_status', 'work_type', 'worker']

  const rowColor = (row: WorkData) => {
    let ret = ''

    if (row.work_status === '작업완료') {
      ret = '#90caf9'
    } else if (row.work_status === '작업 중') {
      ret = '#b2ff59'
    } else if (row.work_status === '작업지연') {
      ret = '#f44336'
    } else {
      ret = 'transparent'
    }

    return ret
  }

  const onControllerPage = () => {
    navigate('/main2')
  }

  const onSelectDate = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD')
      commonSearchApi(
        'work/todaywork', 
        { workDate: formattedDate }
      ).then(res => {
        const updatedData = res.data.map((item: WorkData, index: number) => ({ ...item, no: index + 1 }))
        setDataRow(updatedData)
      }).catch(err => {
        console.log('error', err)
      })
    }
  }
  
  const onCellClick = (header: string, rowIndex: number, cellData: any) => {
    // rowIndex와 일치하는 데이터를 dataRow에서 찾기
    const rowData = dataRow[rowIndex] // find를 사용하지 않고 직접 접근

    // rowData가 존재할 때만 chipCarNumber를 설정
    if (rowData) {
      setChipCarNumber(rowData.car_number) // 차량 번호 설정
      commonSearchApi(
        'work/workContent',
        { workCode: rowData.work_type }
      ).then(res => {
        console.log('나와라 얍!', res)
        setSteps(res.data)
      })
    }
  }
  
  return (
    <div style={{ display: 'flex' }}>
      <Card variant="outlined" sx={{ width: '20%' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar onChange={onSelectDate} sx={{ width: '100%' }}/>
        </LocalizationProvider>
      </Card>
      <Card variant="outlined" style={{ margin: '12px', marginTop: '0px', marginBottom: '0px', width: '40%', height: '100%' }}>
        <Grid 
          headers={Object.keys(headers)} 
          headersMapping={headers}
          headerVisible={headerVisible}
          rows={dataRow}
          clickableColumns={clickableColumns}
          rowColor={rowColor}
          onCellClick={onCellClick}
        />
      </Card>
      <Card sx={{ width: '40%', height: 'auto' }} variant="outlined" className="setBackground">
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Box
            component="img"
            sx={{
              height: '20%',
              width: '50%',
              borderRadius: '4px',
              objectFit: 'cover',
            }}
            src={kiaSorento}
            alt="Kia Sorento"
          />
          <div>
            <Chip 
              label={chipCarNumber || "차량 번호 없음"}
              color="warning"
            />
          </div>
        </Box>
        <Box sx={{ width: '100%', marginTop: '12px' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((item, index) => (
              <Step key={index}>
                <StepLabel>{item.work_name}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {chipCarNumber ? (
          <Box style={{ textAlign: 'center', marginTop: '12px' }}>
            <Button 
              variant="contained"
              onClick={onControllerPage}
            >
              작업 시작
            </Button>
          </Box>
        ) : null}
      </Card>
    </div>
  )
}

export default Main
