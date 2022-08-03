import { PlusCircle, Trash } from 'phosphor-react'
import sectionApi from '../../api/sectionApi'
import taskApi from '../../api/taskApi'
import toast from 'react-hot-toast'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { AddBoardWrapper, Card, CardContainer, ListContainer, ListContent } from './styles'
import  {TaskModal}  from '../TaskModal'

let timer
const timeout = 500

export function Kanban(props) {
  const boardId = props.boardId
  const [data, setData] = useState([])
  const [selectedTask, setSelectedTask] = useState(undefined)

  useEffect(() => {
    setData(props.data)
  }, [props.data])
  
  async function onDragEnd({ source, destination }){
    if (!destination) return
    const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
    const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)
    const sourceCol = data[sourceColIndex]
    const destinationCol = data[destinationColIndex]

    const sourceSectionId = sourceCol.id
    const destinationSectionId = destinationCol.id

    const sourceTasks = [...sourceCol.tasks]
    const destinationTasks = [...destinationCol.tasks]

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1)
      destinationTasks.splice(destination.index, 0, removed)
      data[sourceColIndex].tasks = sourceTasks
      data[destinationColIndex].tasks = destinationTasks
    } else {
      const [removed] = destinationTasks.splice(source.index, 1)
      destinationTasks.splice(destination.index, 0, removed)
      data[destinationColIndex].tasks = destinationTasks
    }

    try {
      await taskApi.updatePosition(boardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId
      })
      setData(data)
    } catch (err) {
      toast.error((err) => 'Erro ao movimentar tarefa.')
    }
  }

  async function addList(){
    try{
      const section = await sectionApi.create(boardId)
      setData([...data, section])
    }catch(err){
      toast.error((err) => 'Erro ao tentar criar Lista.')
    }
  }

  async function updateListTitle(e, sectionId){
    clearTimeout(timer)
    const newTitle = e.target.value
    const newData = [...data]
    const index = newData.findIndex(e => e.id === sectionId)
    newData[index].title = newTitle
    setData(newData)
    timer = setTimeout(async() => {
      try{
        await sectionApi.update(boardId, sectionId, { title: newTitle })
      }catch(err){
        toast.error((err) => {'Erro ao alterar titulo da lista'})
      }
    }, timeout)
  }

  async function deleteList(sectionId){
    try{
      await sectionApi.delete(boardId, sectionId)
      const newData = [...data].filter(e => e.id !== sectionId)
      setData(newData)
    }catch(err){
      toast.error((err) => 'Erro ao tentar deletar Lista')
    }
  }

  async function addTask(sectionId){
   try {
    const task = await taskApi.create(boardId, { sectionId })
    const newData = [...data]
    const index = newData.findIndex(e => e.id === sectionId)
    newData[index].tasks.unshift(task)
    setData(newData)
   }catch(err){
    toast.error((err) => 'Erro ao criar tarefa')
   } 
  }

  const onUpdateTask = (task) => {
    const newData = [...data]
    const sectionIndex = newData.findIndex(e => e.id === task.section.id)
    const taskIndex = newData[sectionIndex].tasks.findIndex(e => e.id === task.id)
    newData[sectionIndex].tasks[taskIndex] = task
    setData(newData)
  }

  const onDeleteTask = (task) => {
    const newData = [...data]
    const sectionIndex = newData.findIndex(e => e.id === task.section.id)
    const taskIndex = newData[sectionIndex].tasks.findIndex(e => e.id === task.id)
    newData[sectionIndex].tasks.splice(taskIndex, 1)
    setData(newData)
  }

  return (
    <>
    <AddBoardWrapper>
          <section>
              <div>
                <button onClick={addList}>
                  <p>Add Lista</p> <PlusCircle size={12} />
                </button>
              </div>
              <div>
                <p>{data.length} Listas</p>
              </div>
          </section>
    </AddBoardWrapper>
    <ListContainer>
    <DragDropContext onDragEnd={onDragEnd}>
            <ListContent>
              {
                data.map(section => (
                  <div key={section.id}>
                    <Droppable key={section.id} droppableId={section.id}>
                      {(provided) => (
                        <div className='headerList'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                          <span>
                            <div className='title'>
                            • <input type="text" onChange={(e) => updateListTitle(e, section.id)} value={section.title} placeholder='Adicionar Titulo' />
                            </div>

                            <section>
                              <PlusCircle onClick={() => addTask(section.id)} size={12} />
                              <Trash onClick={() => deleteList(section.id)} size={12} color='red' />
                            </section>
                          </span>
                          <CardContainer>
                          {
                            section.tasks.map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                  <li onClick={() => setSelectedTask(task)}>
                                    <Card
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                    sx={{
                                      cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                                    }}
                                    >
                                    <section>
                                      <div className="headerCard"><h2>{task.title === '' ? 'Sem titulo': task.title }</h2>...</div>
                                      <p className="content" dangerouslySetInnerHTML={{ __html: task.content }} />
                                    </section>
                                      
                                    </Card>
                                  </li>
                                )}
                              </Draggable>
                            ))
                          }
                          </CardContainer>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))
              }
            </ListContent>
          </DragDropContext>
          <TaskModal 
     task={selectedTask}
     boardId={boardId}
     onClose={() => setSelectedTask(undefined)}
     onUpdate={onUpdateTask}
     onDelete={onDeleteTask}
    />
    </ListContainer>
    
    </>
  )
}