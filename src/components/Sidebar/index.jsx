import { ChatCentered, PlusCircle, SquaresFour, Users } from 'phosphor-react'
import boardApi  from '../../api/boardApi'
import { setBoards } from '../../redux/features/boardSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import {
  SidebarContainer,
  ProjetosTitleContainer,
  ProjetosWrapper
} from './styles'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import { FavouriteList } from '../FavouriteList'

export function Sidebar() {
  
  const boards = useSelector((state) => state.board.value)
  const navigate = useNavigate()
  const {boardId} = useParams()
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardApi.getAll()
        dispatch(setBoards(res))
      } catch (err) {
        alert(err)
      }
    }
    getBoards()
  }, [dispatch])

  useEffect(() => {
    const activeItem = boards.findIndex(e => e.id === boardId)
    if (boards.length > 0 && boardId === undefined) {
      navigate(`/boards/${boards[0].id}`)
    }
    setActiveIndex(activeItem)
  }, [boards, boardId, navigate])

  async function onDragEnd ({source, destination}) {
    const newList = [...boards]
    const [removed] = newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)

    const activeItem = newList.findIndex(e => e.id === boardId)
    setActiveIndex(activeItem)
    dispatch(setBoards(newList))

    try{
      await boardApi.updatePosition({boards: newList})
    }catch(err){
      alert(err)
    }
  }

  async function addBoard () {
    try {
      const res = await boardApi.create()
      const newList = [res, ...boards]
      dispatch(setBoards(newList))
      navigate(`/boards/${res.id}`)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <SidebarContainer>
      <ul>
        <li>
          <NavLink to="/">
            <SquaresFour size={20} />
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/members">
            <Users size={20} />
            <p>Membros</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/messeges">
            <ChatCentered size={20} />
            <p>Mensagens</p>
          </NavLink>
        </li>
      </ul>
      <ProjetosTitleContainer>
        <header>
          <h3>Favoritos</h3>
        </header>
        <FavouriteList />
      </ProjetosTitleContainer>

      <ProjetosTitleContainer>
        <header>
          <h3>Seus Projetos</h3>
          <PlusCircle size={15} onClick={addBoard} />
        </header>
        <ProjetosWrapper>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {
                    boards.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                        <li>
                          <Link
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          disabled={index === activeIndex}
                          to={`/boards/${item.id}`}
                          sx={{
                            cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                          }}
                          >
                            <div>
                              <section>
                              <span>{item.icon}</span>
                              <p>{item.title}</p>
                              </section>
                              <section>
                              <span>...</span>
                              </section>
                            </div> 
                          </Link>
                        </li>
                        )}
                      </Draggable>
                    ))
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          
        </ProjetosWrapper>
      </ProjetosTitleContainer>
    </SidebarContainer>
  )
}
