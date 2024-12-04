import axios from "axios"

const baseURL = 'http://localhost:3001/'

// 조회
export const login = async (url: string, data: object): Promise<any> => {
  try {
    const res = await axios({
      method: 'POST',
      url: baseURL + 'users/login',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      data: data
    })
    return res // 호출한 곳에 응답 반환
  } catch (err) {
    return err // 에러도 호출한 곳에 반환
  }
}

