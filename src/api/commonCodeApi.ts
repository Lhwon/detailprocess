// 공통코드 API
import axios from "axios"

const baseURL = 'http://localhost:3001/'

// 공통코드
const commonCodeApi = async (type: string, group: string, parents_group_code: string, parents_code: string): Promise<any> => {
  try {
    const res = await axios({
      method: 'POST',
      url: baseURL + 'common/getCommonCode',
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

export default commonCodeApi
