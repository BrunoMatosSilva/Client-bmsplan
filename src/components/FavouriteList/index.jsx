import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useParams} from 'react-router-dom'
import boardApi from '../../api/boardApi'
import { setFavouriteList} from '../../redux/features/favouriteSlice'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

import { FavoritoWrapper } from './styles'

export function FavouriteList() {
  const dispatch = useDispatch()
  const list = useSelector((state) => state.favourites.value)
  const { boardId } = useParams()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const getBoards = async () => {
      try{
        const res = await boardApi.getFavourites()
        dispatch(setFavouriteList(res))
      }catch(err){
        toast.error((err) => 'Lista de favoritos não encontrado')
      }
    }
    getBoards()
  },[])

  useEffect(() => {
    const index = list.findIndex(e => e.id === boardId)
    setActiveIndex(index)
  }, [list, boardId])

  async function onDragEnd ({source, destination}) {
    const newList = [...list]
    const [removed] = newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)

    const activeItem = newList.findIndex(e => e.id === boardId)
    setActiveIndex(activeItem)
    dispatch(setFavouriteList(newList))

    try{
      await boardApi.updateFavouritePosition({boards: newList})
    }catch(err){
      alert(err)
    }
  }

  return (
    
        <FavoritoWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {
                    list.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                        <li>
                          <Link
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          selected={index === activeIndex}
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
        </FavoritoWrapper>
  )
}