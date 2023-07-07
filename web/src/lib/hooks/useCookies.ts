import { cookies } from 'next/headers'

export default function useCookies() {
  const cookieList = cookies()

  const getByKey = (key: string) => {
    return cookieList.get(key)?.value
  }

  return { getByKey }
}
