import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth"

import { useNavigate } from 'react-router-dom'



export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    if(email !== '' && password !== '') {
      
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        //navegar para /admin
        navigate('/admin', { raplace: true })
        toast.success("Bem-vindo(a)!")
      })
      .catch(() => {
        toast.warn("Dados inválidos!")
      })

    } else {
      toast.info("Preencha todos os campos!")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-5xl mb-2 font-bold">iCoffe List</h1>
      <span className="mb-7">Gerencie sua agenda de forma fácil.</span>

      <form className="flex flex-col w-[90%] max-w-2xl" onSubmit={handleLogin}>
        <input 
        className="mb-3 h-9 rounded p-2 border"
        type="text" placeholder="Digite seu email..." value={email} onChange={(e) => setEmail(e.target.value)} />

        <input
        className="mb-3 h-9 rounded p-2 border"
        type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button
        className="border h-9 bg-[#2B4EFF] rounded text-white text-lg"
        type="submit">Acessar</button>
      </form>

        <Link to='/register' className="text-[#B4B8BB] m-3 text-sm">
          Não possui uma conta? <span className="text-[#2B4EFF]">Cadastre-se</span>
        </Link>

    </div>
  )
}