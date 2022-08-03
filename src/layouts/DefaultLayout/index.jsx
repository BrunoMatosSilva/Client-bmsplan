import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { Sidebar } from '../../components/Sidebar'
import authUtils from '../../utils/authUtils'
import { LayoutContainer, LayoutGrid } from './styles'
import { setUser } from '../../redux/features/userSlice'

export function DefaultLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated()
      if (!user) {
        navigate('/login')
      } else {
        dispatch(setUser(user))
        setLoading(false)
      }
    }
    checkAuth()
  }, [navigate])

  return loading ? (
    <Loading />
  ) : (
    <LayoutContainer>
      <Header />
      <LayoutGrid>
        <Sidebar />
        <Outlet />
      </LayoutGrid>
    </LayoutContainer>
  )
}