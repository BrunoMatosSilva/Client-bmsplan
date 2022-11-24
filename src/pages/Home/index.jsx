import { ContainerLoading, HomeContainer } from "./styles";
import { setBoards } from "../../redux/features/boardSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import boardApi from "../../api/boardApi";
import { useState } from "react";

import Spinner from '../../assets/spinner.svg'

export function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false);

  const createBoard = async () => {
    setIsLoading(true);
    try {
      const res = await boardApi.create()
      dispatch(setBoards([res]));
      navigate(`/boards/${res.id}`);
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  }

  return (
    <HomeContainer>
        <section>
        <button onClick={createBoard} disabled={isLoading}>
        {!isLoading && <h1>Clique aqui para criar seu primeiro Projeto!</h1>}
        {isLoading && <ContainerLoading><img src={Spinner} /></ContainerLoading> }
        </button>
      </section>
    </HomeContainer>
  )
}
