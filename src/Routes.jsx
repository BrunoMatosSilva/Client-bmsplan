import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthLayout } from './layouts/AuthLayout'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { Boards } from './pages/Boards'
import { Login } from './pages/Login'
import { Members } from './pages/Members'
import { Messeges } from './pages/Messeges'
import { Signup } from './pages/Signup'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="boards" element={<Home/>} />
          <Route path="boards/:boardId" element={<Boards />} />
          <Route path="members" element={<Members />} />
          <Route path="messeges" element={<Messeges />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}