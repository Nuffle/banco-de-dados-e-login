import { useState } from "react"
import { toast } from 'react-toastify'
import { Link } from "react-router-dom"
import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()

    if(email !== '' && password !== '') {
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', { replace: true })
        toast.success("Cadastro concluído!")
      })
      .catch(() => {
        toast.warn("Dados inválidos.")
      })

      
    }else {
      toast.info("Preencha todos os campos!")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-5xl mb-2 font-bold">Cadastre-se</h1>
      <span className="mb-7">Vamos criar sua conta!</span>

      <form className="flex flex-col w-[90%] max-w-2xl" onSubmit={handleRegister}>
        <input 
        className="mb-3 h-9 rounded p-2 border"
        type="text" placeholder="Digite seu email..." value={email} onChange={(e) => setEmail(e.target.value)} />

        <input
        className="mb-3 h-9 rounded p-2 border"
        type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button
        className="border h-9 bg-[#2B4EFF] rounded text-white text-lg"
        type="submit">Cadastrar</button>
      </form>

        <Link to='/' className="text-[#B4B8BB] m-3 text-sm">
          Já possui uma conta? <span className="text-[#2B4EFF]">Faça login!</span>
        </Link>

    </div>
  )
}