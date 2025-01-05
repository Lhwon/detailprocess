import axios from "axios"

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

// 메뉴 정보
export const menuApi = async (): Promise<any> => {
  try {
    const res = await axiosInstance.post('common/getMenu')
    return res.data // 호출한 곳에 응답 데이터 반환
  } catch (err) {
    console.error("Error fetching menu info:", err)
    throw err // 호출한 곳으로 에러 전달
  }
}

// 공통코드
export const commonCodeApi = async (type: string, group: string, parents_group_code: string, parents_code: string): Promise<any> => {
  try {
    const res = await axios({
      method: 'POST',
      url: axiosInstance + 'common/getCommonCode',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      data: [type, group, parents_group_code, parents_code]
    })
    return res // 호출한 곳에 응답 반환
  } catch (err) {
    return err // 에러도 호출한 곳에 반환
  }
}
