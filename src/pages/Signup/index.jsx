import {
  BannerContainer,
  LoginLink,
  LogoWrapper,
  SignupContainer,
  SignupHeader,
  SignupWrapper,
} from './styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ImgLogo from '../../assets/logo.png'
import ImgBanner from '../../assets/banner.png'
import { useTheme } from '../../hooks/useTheme'
import { Moon, Sun } from 'phosphor-react'
import { Link, useNavigate } from 'react-router-dom'

import authApi from '../../api/authApi'
import { useState } from 'react'
import toast from 'react-hot-toast'

const schema = yup
  .object({
    name: yup.string().required('Usuario é obrigatorio').min(3,'O nome deve ter no minimo 3 caracters' ),
    email: yup.string().required('Email is a required field').matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Digiti um endereço de e-mail valido'
  ),
    password: yup.string().required('Senha é obrigatoria').min(8,'A senha deve ter no minimo 8 caracters' ),
    confirmPassword: yup.string().required('Senha é obrigatoria').oneOf([yup.ref('password'), null], 'Senhas não são iguais'),
  })
  .required()

export function Signup() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const { currentTheme, setCurrentTheme } = useTheme()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

 async function onSubmit(data) {
  
    try{
    const name = data.name
    const email = data.email
    const password = data.password
    const confirmPassword = data.confirmPassword

    const res = await authApi.signup({
      name, email, password, confirmPassword
    })
    setLoading(false)
    localStorage.setItem('token', res.token)
    toast.success('Usuário criado com sucesso!')
    navigate('/login')
    }catch(err){
      toast.error((err) => `Falha na criação do Usuário`)
    }
  }

  return (
    <SignupContainer>
      <SignupHeader>
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
          <SignupWrapper>
            <section>
              <h2>Criar seu acesso aqui</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Digite seu Nome"
                    {...register('name')}
                  />
                  <span>{errors.name?.message}</span>
                </div>
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
                    id="password"
                    type="password"
                    placeholder="Digite sua Senha"
                    {...register('password')}
                  />
                  <span>{errors.password?.message}</span>
                </div>
                <div>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirmar Senha"
                    {...register('confirmPassword')}
                  />
                  <span>{errors.confirmPassword?.message}</span>
                </div>
                <button type="submit">Cadastrar conta</button>
              </form>

              <LoginLink>
                <p>Já possui uma conta?</p>
                <Link to="/login">Para Logar clique aqui</Link>
              </LoginLink>
            </section>
          </SignupWrapper>
        </div>
      </SignupHeader>
      <BannerContainer>
        <img src={ImgBanner} alt="" />
      </BannerContainer>
    </SignupContainer>
  )
}
