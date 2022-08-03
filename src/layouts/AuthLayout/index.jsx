import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading'
import authUtils from '../../utils/authUtils'

export function AuthLayout() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated()
      if (!isAuth) {
        setLoading(false)
      } else {
        navigate('/')
      }
    }
    checkAuth()
  }, [navigate])

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Outlet />
    </div>
  )
}