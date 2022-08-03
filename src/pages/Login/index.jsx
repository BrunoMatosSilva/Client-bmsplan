import {
  BannerContainer,
  LoginContainer,
  LoginHeader,
  LoginWrapper,
  LogoWrapper,
  SignupLink,
} from './styles'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ImgLogo from '../../assets/logo.png'
import ImgBanner from '../../assets/banner.png'
import { useTheme } from '../../hooks/useTheme'
import { Moon, Sun } from 'phosphor-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import authApi from '../../api/authApi'
import { useState } from 'react'

const schema = yup
  .object({
    email: yup.string().required('Email é obrigatorio').matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Digiti um endereço de e-mail valido'
  ),
    password: yup.string().required('Senha é obrigatoria').min(8,'A senha deve ter no minimo 8 caracters' ),
  })
  .required()

export function Login() {
  const navigate = useNavigate()
  const { currentTheme, setCurrentTheme } = useTheme()
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

async function onSubmit(data) {
    try {
    const email = data.email
    const password = data.password

    const res = await authApi.login({
      email, password
    })
    setLoading(false)
      localStorage.setItem('token', res.token)
      navigate('/')
    }catch(err){
      toast.error((err) => `Email ou senha invalidos`)
    }
  }

  return (
    <LoginContainer>
      <LoginHeader>
        <LogoWrapper>
          <header>
            <div>
              <img src={ImgLogo} alt="" />
              <h2>Bms Plan</h2>
            </div>
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
          </header>
          <div>
            <h3>
              Gerencie seus projetos e tarefas de uma forma{' '}
              <span>intuitiva</span> e <span>agradável</span>.
            </h3>
            <p>
              Utilizando a metodologia Kanban, cartões personalizados para
              facilitar a sua organização visual de tarefas e projetos.
            </p>
          </div>
        </LogoWrapper>
        <div>
          <LoginWrapper>
            <section>
              <h2>Acesse gratuitamente</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    id="email"
                    type="text"
                    placeholder="Digite seu Email"
                    {...register('email')}
                  />
                  <span>{errors.email?.message}</span>
                </div>
                <div>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Digite sua Senha"
                    {...register('password')}
                  />
                  <span>{errors.password?.message}</span>
                </div>
                <button type="submit">Acessar o Sistema</button>
              </form>

              <SignupLink>
                <p>Não possui Cadastro?</p>
                <Link to="/signup">Crie Aqui!</Link>
              </SignupLink>
            </section>
          </LoginWrapper>
        </div>
      </LoginHeader>
      <BannerContainer>
        <img src={ImgBanner} alt="" />
      </BannerContainer>
    </LoginContainer>
  )
}
