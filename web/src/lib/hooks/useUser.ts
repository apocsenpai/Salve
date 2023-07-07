import { redirect } from 'next/navigation'
import useToken from './useToken'
import decode from 'jwt-decode'
import { UserJwtPayload } from '../utils/protocols/resources'

export default function useUser() {
  const token = useToken()

  if (!token) return null

  const user = decode(token) as UserJwtPayload

  return { ...user, token }
}
