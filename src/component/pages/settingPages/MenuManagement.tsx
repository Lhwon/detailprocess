import React, { useState, useEffect } from "react"
import { Box, Card, Button, Divider, Radio } from '@mui/material'
import Grid from 'component/components/Grid'
import Input from "component/components/Input"
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import commonSearchApi from 'api/commonApi'
import Swal from 'sweetalert2'

interface MenuData {
  no: string
  menu_cd: string
  menu_nm: string
  component: string
  authority: string
  link: string
}

const MenuManagement: React.FC = () => {
  const [dataRow, setDataRow] = useState<MenuData[]>([])

  // 초기실행
  useEffect(() => {
    searchData()
  }, [])

  // 데이터 조회
  const searchData = async () => {
    await commonSearchApi('common/getMenu', {}).then(res => {
      setDataRow(res.data)
    })
  }

  // 초기값 객체를 별도로 분리
  const initialMenuData: MenuData = {
    no: '',
    menu_cd: '',
    menu_nm: '',
    component: '',
    authority: '',
    link: ''
  }

  const [menuData, setMenuData] = useState<MenuData>(initialMenuData)

  const headers = {
    no: '순번',
    menu_cd: '메뉴코드',
    menu_nm: '메뉴명',
    link: '경로',
    authority: '권한'
  }

  const clickableColumns = ['no', 'menu_cd', 'menu_nm', 'link', 'authority']
  
  // 셀 클릭 이벤트
  const onCellClick = (header: string, rowIndex: number, cellData: any) => {
    const newData: { no: string; menu_cd: string; menu_nm: string; link: string; authority: string } = dataRow[rowIndex]

    setMenuData({
      ...menuData,
      no: newData.no,
      menu_cd: newData.menu_cd,
      menu_nm: newData.menu_nm,
      component: newData.link.substring(1, newData.link.length),
      authority: newData.authority,
    })
    
  }

  // inputForm 초기화
  const clearInputForm = async () => {
    setMenuData({
      ...menuData,
      no: '',
      menu_cd: '',
      menu_nm: '',
      component: '',
      authority: '',
    })
  }

  // 데이터 저장
  const btnSave = () => {
    Swal.fire({
      title: '저장하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '저장',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        commonSearchApi('common/createMenu', [menuData]).then(async res => {
          if (res.status === 200) {
            Swal.fire('저장 완료!', '변경 사항이 저장되었습니다.', 'success')
            await searchData() // 그리드 조회
            clearInputForm()   // inputForm 초기화
          } else {
            console.error('err', res)
          }
        }).catch(err => {
          Swal.fire('Error', err, 'error')
        })
      }
    });
  }

  // 데이터 삭제
  const btnDelete = () => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        commonSearchApi('common/deleteMenu', [menuData]).then(async res => {
          if (res.status === 200) {} else {
            Swal.fire('삭제 완료!', '삭제되었습니다.', 'success')
            await searchData() // 그리드 조회
            clearInputForm()   // inputForm 초기화
          
            console.error('err', res)
          }
        }).catch(err => {
          Swal.fire('Error', err, 'error')
        })
      }
    });
  }

  return (
    <Box sx={{ width: '100%' }}>
      <h3>메뉴관리</h3>
      <Box sx={{ width: '100%', display: 'flex'}}>
        {/* 그리드 출력(메뉴) */}
        <Box sx={{ width: '50%' }}>
          <Grid 
            headers={Object.keys(headers)} 
            headersMapping={headers}
            rows={dataRow}
            clickableColumns={clickableColumns}
            onCellClick={onCellClick}
          />
        </Box>
        {/* 메뉴 등록 */}
        <Box sx={{ width: '50%' }}>
          <Card
            variant="outlined"
            sx={{
              height: '77vh',
              ml: 1,
              p:1,
              borderRadius: '5px', 
              backgroundColor: '#FFFFFF'
            }}
          >
            {/* 제목 및 버튼 */}
            <Box sx={{ 
                width: '100%', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <label>메뉴 등록</label>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Button variant="contained" sx={{ mr: 1 }} onClick={clearInputForm}>신규</Button>
                <Button variant="contained" color="error" sx={{ mr: 1, backgroundColor: '#f44336' }} onClick={btnDelete}>삭제</Button>
                <Button variant="contained" onClick={btnSave}>저장</Button>
              </Box>
            </Box>
            <Divider sx={{ mt:1 }}/>

            {/* InputForm */}
            <Box sx={{ width: '100%', mt:2 }}>
              <Input 
                label="순번"
                type="number"
                value={menuData.no}
                labelWidth="10%"
                width="100%"
                onChange={(value) => setMenuData({ ...menuData, no: value })}
              />
              <Input 
                label="메뉴코드"
                value={menuData.menu_cd}
                labelWidth="10%"
                width="100%"
                mt={2}
                onChange={(value) => setMenuData({ ...menuData, menu_cd: value })}
              />
              <Input 
                label="메뉴명"
                value={menuData.menu_nm}
                labelWidth="10%"
                width="100%"
                mt={2}
                onChange={(value) => setMenuData({ ...menuData, menu_nm: value })}
              />
              <Input 
                label="컴포넌트명"
                value={menuData.component}
                labelWidth="10%"
                width="100%"
                mt={2}
                onChange={(value) => setMenuData({ ...menuData, component: value })}
              />
              <Box sx={{ display: 'flex', mt: 2 }}>
                <Box sx={{ width: '10%', alignContent: 'center' }}>
                  <label>권한</label>
                </Box>
                <Box sx={{ display: 'flex'}}>
                  <RadioGroup
                    row 
                    value={menuData.authority}
                    onChange={(event) => setMenuData({ ...menuData, authority: event.target.value })}
                  >
                    <FormControlLabel value="U" control={<Radio />} label="모든 권한" />
                    <FormControlLabel value="A" control={<Radio />} label="관리자" />
                  </RadioGroup>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default MenuManagement