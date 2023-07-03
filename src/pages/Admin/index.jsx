import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

import {
  addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc
} from 'firebase/firestore'

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})
  const [edit, setEdit] = useState({})

  const [tarefas, setTarefas] = useState([])


  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@userDetail")
      setUser(JSON.parse(userDetail))

      //buscar tarefas do usuário logado
      if(userDetail) {
        const data = JSON.parse(userDetail) //pegando os dados do user

        const tarefaRef = collection(db, "tarefas") //acessando de dentro do banco, a collection tarefas
        const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid)) //para buscar apenas os posts do user logado
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = []

          //percorrendo o banco
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })

          setTarefas(lista)
        })
      }
    }

    loadTarefas()
  }, [])


  //forms - criando tarefa no banco também
  async function handleRegister(e) {
    e.preventDefault()

    if(tarefaInput === '') {
      toast.info('Digite a sua tarefa!')
      return
    }

    //verifica que eu quero editar e chama a func que faz a atualização
    if(edit?.id) {
      handleUpdateTarefa()
      return
    }

    //adicionando a tarefa no banco
    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
    .then(() => {
      toast.success('Tarefa registrada!')
      setTarefaInput('')
    })
    .catch((error) => {
      console.log("ERRO AO REGISTRAR " + error)
    })
  }

  //deslogando
  async function handleLogout() {
    await signOut(auth)
  }

  //concluindo(deletando) tarefa
  async function deleteTarefa(id) {
    const docRef = doc(db, "tarefas", id)
    await deleteDoc(docRef)
    toast.success('Tarefa concluída!')
  }

  //ao clicar em editar, passa aqui qual tarefa to clicando e ja muda o botão pra atualizar
  function editTarefa(item) {
    setTarefaInput(item.tarefa)
    setEdit(item)
  }

  //editando a tarefa
  async function handleUpdateTarefa() {
    const docRef = doc(db, "tarefas", edit?.id)
    await updateDoc(docRef, { //da o update com oq ta escrito no input
      tarefa: tarefaInput
    })
    .then(() => {
      toast.success('Tarefa editada!')
      setTarefaInput('')
      setEdit({})
    })
    .catch(() => {
      toast.warn('Erro ao editar!')
      setTarefaInput('')
      setEdit({})
    })
  }

  return (
    <div className='flex flex-col items-center mt-12'>
      <h1 className='mb-7 text-4xl font-bold'>Minhas tarefas</h1>

      <form className='flex flex-col w-[90%] max-w-2xl' onSubmit={handleRegister}>
        <textarea
          className='mb-3 h-9 rounded p-2 border'
          maxLength={50}
          placeholder='Digite sua tarefa...'
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />

        {/* //se ta maior que 0, então clicou em editar, caso contrário... */}
        {Object.keys(edit).length > 0 ? (
          <button className='border h-9 bg-[#2baaff] rounded text-white text-lg mb-7' type='submit'>Atualizar tarefa</button>
        ) : (
          <button className='border h-9 bg-[#2B4EFF] rounded text-white text-lg mb-7' type='submit'>Registrar tarefa</button>
        )}
      </form>


        {tarefas.map((item) => (
          <article key={item.id} className='w-[90%] max-w-2xl flex justify-between bg-gray-100 rounded mb-3 p-3'>
            <p className='flex items-center'>{item.tarefa}</p>

            <div className='flex'>
              <button onClick={ () => editTarefa(item) } className='mr-2 rounded p-1 bg-[#d6d6d6]'>Editar</button>
              <button onClick={ () => deleteTarefa(item.id) } className='mr-2 rounded p-1 bg-[#2B4EFF] text-[#ffffff]'>Concluir</button>
            </div>
          </article>
        ))}

      <button className='absolute bottom-[6%] left-[4%] h-9 w-16 rounded-3xl font-bold bg-[#2b4effc7] text-white hover:bg-[#2B4EFF] transition-all' onClick={handleLogout}>Sair</button>

    </div>
  )
}