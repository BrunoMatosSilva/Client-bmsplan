import { HomeContainer } from "./styles";
import { setBoards } from "../../redux/features/boardSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";
import { useState } from "react";

export function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

 async function handleCreateBoard(){
  setLoading(true)
    try{
      const res = await boardApi.create()
      dispatch(setBoards([res]))
      navigate(`/boards/${res.id}`)
    }catch(err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <HomeContainer>
      <button onClick={handleCreateBoard} disabled={loading}>
      <h1>Clique aqui para criar seu primeiro Planejamento!</h1>
      </button>
    </HomeContainer>
  )
}
