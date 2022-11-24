import { Star, Trash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { BoardContainer, BoardHeader, BoardTitle, ContainerLoading, SubtitleBoard } from './styles'
import { Loading } from '../../components/Loading'
import boardApi from '../../api/boardApi';
import EmojiPicker from '../../components/EmojiPicker'
import { setBoards } from '../../redux/features/boardSlice'
import { setFavouriteList } from '../../redux/features/favouriteSlice'
import { Kanban } from '../../components/Kanban'

let timer
const timeout = 500

export function Boards() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { boardId } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sections, setSections] = useState([])
  const [isFavourite, setIsFavourite] = useState(false)
  const [icon, setIcon] = useState('')
  const [loading, setLoading] = useState(true);

  const boards = useSelector((state) => state.board.value)
  const favouriteList = useSelector((state) => state.favourites.value)

  useEffect(() => {
    async function getBoard(){
      try {
        const res = await boardApi.getOne(boardId)
        setTitle(res.title)
        setDescription(res.description)
        setSections(res.sections)
        setIsFavourite(res.favourite)
        setIcon(res.icon)
      }catch(err) {
        toast.error((err) => `Projeto não encontrado`)
      }finally{
        setLoading(false);
      }
    }
    getBoard()
  },[boardId])

  async function onIconChange(newIcon){
    let temp = [...boards]
    const index = temp.findIndex(e => e.id === boardId)
    temp[index] = { ...temp[index], icon: newIcon}

    if(isFavourite){
      let tempFavourite = [...favouriteList]
      const favouriteIndex = tempFavourite.findIndex(e => e.id === boardId)
      tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], icon: newIcon}
      dispatch(setFavouriteList(tempFavourite))
    }

    setIcon(newIcon)
    dispatch(setBoards(temp))
    try {
      await boardApi.update(boardId, {icon: newIcon})
    } catch(err) {
      toast.error((err) => 'Erro na troca do Icon')
    }
  }

  async function updateTitle(e){
    clearTimeout(timer)
    const newTitle = e.target.value
    setTitle(newTitle)

    let temp = [...boards]
    const index = temp.findIndex(e => e.id === boardId)
    temp[index] = { ...temp[index], title: newTitle}

    if(isFavourite){
      let tempFavourite = [...favouriteList]
      const favouriteIndex = tempFavourite.findIndex(e => e.id === boardId)
      tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], title: newTitle}
      dispatch(setFavouriteList(tempFavourite))
    }

    dispatch(setBoards(temp))

    timer = setTimeout(async() =>{
      try {
        await boardApi.update(boardId, {title: newTitle})
      } catch(err) {
        toast.error((err) => 'Erro na troca do Titulo')
      }
    }, timeout);
  }

  async function updateDescription(e){
    clearTimeout(timer)
    const newDescription = e.target.value
    setDescription(newDescription)

    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { description: newDescription })
      } catch (err) {
        toast.error((err) => 'Erro ao atualizar texto.')
      }
    }, timeout);
  }

  async function addFavorite(e){
    setLoading(true);
    try {
      const board = await boardApi.update(boardId, { favourite: !isFavourite })
      let newFavouriteList = [...favouriteList]
      if (isFavourite) {
        newFavouriteList = newFavouriteList.filter(e => e.id !== boardId)
      } else {
        newFavouriteList.unshift(board)
      }
      dispatch(setFavouriteList(newFavouriteList))
      setIsFavourite(!isFavourite)
    } catch (err) {
      alert(err)
    }finally{
      setLoading(false);
    }
  }

  async function deleteBoard(){
    setLoading(true);
    try{
      await boardApi.delete(boardId)
      if (isFavourite){
        const newFavouriteList = favouriteList.filter(e => e.id !== boardId)
        dispatch(setFavouriteList(newFavouriteList))
      }
      const newList = boards.filter(e => e.id !== boardId)
      if (newList.length === 0) {
        navigate('/boards')
      } else {
        navigate(`/boards/${newList[0].id}`)
      }
      dispatch(setBoards(newList))
    }catch (err) {
      toast.error((err) => 'Erro ao tentar deletar')
    }finally{
      setLoading(true);
    }
  }

  return (
    <BoardContainer>
      {!loading ? (
        <BoardHeader>
        <BoardTitle>
          <div className='title'>
            <span>
              <EmojiPicker icon={icon} onChange={onIconChange} />
            </span>
            <input type="text" onChange={updateTitle} value={title} placeholder='Adicionar Titulo' />
          </div>

          <div className='favorites' >
            {isFavourite ? (
              <button onClick={addFavorite}><Star color='orange' /></button>
            ): (
              <button onClick={addFavorite}><Star /></button>
            )}

            <button onClick={deleteBoard}>
              <Trash color='red'  />
            </button>

          </div>
        </BoardTitle>
        <SubtitleBoard>
          <div className='subtitle'>
            <textarea type='text' onChange={updateDescription} value={description} placeholder='Adicionar a descrição' />
          </div>
        </SubtitleBoard>
        <Kanban data={sections} boardId={boardId} />
      </BoardHeader>
      ) : (
        <Loading />
      )}
    </BoardContainer>
  )
}
