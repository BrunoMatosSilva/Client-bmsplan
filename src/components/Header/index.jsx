import { useTheme } from '../../hooks/useTheme'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  HeaderContainer,
  LogoWrapper,
  PerfilWrapper,
} from './styles'
import ImgLogo from './../../assets/logo.png'
import {
  Bell,
  CaretDoubleLeft,
  Moon,
  SignOut,
  Sun,
} from 'phosphor-react'

export function Header() {
  const user = useSelector((state) => state.user.value)
  const navigate = useNavigate()
  const { currentTheme, setCurrentTheme } = useTheme()

  function handleSignOut(){
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <HeaderContainer>
      <LogoWrapper>
        <section>
          <a href="#">
            <img src={ImgLogo} alt="" />
            <h2>Bms Plan</h2>
          </a>
        </section>
        <CaretDoubleLeft size={18} />
      </LogoWrapper>
      <PerfilWrapper>
        <section>
          {currentTheme === 'light' ? (
            <div>
              <button>
                <Moon size={20} onClick={() => setCurrentTheme('dark')} />
              </button>
            </div>
          ) : (
            <div>
              <button>
                <Sun size={20} onClick={() => setCurrentTheme('light')} />
              </button>
            </div>
          )}
          <button>
            <Bell size={20} />
          </button>
        </section>
        <span>{user.name}</span>
        <button onClick={handleSignOut}>
          <SignOut size={20} />
        </button>
      </PerfilWrapper>
    </HeaderContainer>
  )
}
