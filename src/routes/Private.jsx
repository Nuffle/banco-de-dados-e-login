import { useState, useEffect } from 'react'

import { auth } from '../firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth' //vai ficar verificando se tem user logado ou não

import { Navigate } from 'react-router-dom'

export default function Private({ children }) {
  const [loading, setLoading] = useState(true) //saber se tem usuário ou não
  const [signed, setSigned] = useState(false) //verificar se está logado ou não

  useEffect(() => {
    async function checkLogin() {
      const unsub = onAuthStateChanged(auth, (user) => {
        //se tem user logado
        if(user) {
          const userData = {
            uid: user.uid,
            email: user.email,
          }

          localStorage.setItem("@userDetail", JSON.stringify(userData))

          setLoading(false) //já tem usuário
          setSigned(true) //agora está logado

        } else {
          //não possui user logado
          setLoading(false)
          setSigned(false)
        }
      })
    }

    checkLogin()
  }, [])


  //tela de loading
  if(loading) {
    return (
      <div className='flex items-center justify-center text-5xl font-bold w-full h-screen'>
        CARREGANDO...
      </div>
    )
  }


  //se tiver tentando acessar e não estiver logado:
  if(!signed) {
    return <Navigate to="/"/>
  }

  return children //então retorna oq tem dentro da tag
}