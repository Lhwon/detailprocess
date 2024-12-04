import { Cookies } from "react-cookie"

const cookies = new Cookies()

export const setCookies = (name: string, value: string, option?: any) => {
  return cookies.set(name, value, {...option})
}

export const getCookies = (name: string) => {
  return cookies.get(name)
}