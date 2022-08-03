import { Backdrop, Fade, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import taskApi from '../../api/taskApi'
import Moment from 'moment'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Trash } from 'phosphor-react'

import { TaskModalContainer } from './styles'
import '../../styles/CkEditorCss/custom-editor.css'

let timer
const timeout = 500
let isModalClosed = false

export function TaskModal(props){
  const boardId = props.boardId
  const [task, setTask] = useState(props.task)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const editorWrapperRef = useRef()

  useEffect(() => {
    setTask(props.task)
    setTitle(props.task !== undefined ? props.task.title : '')
    setContent(props.task !== undefined ? props.task.content : '')
    if (props.task !== undefined) {
      isModalClosed = false

      updateEditorHeight()
    }
  }, [props.task])

  const updateEditorHeight = () => {
    setTimeout(() => {
      if (editorWrapperRef.current) {
        const box = editorWrapperRef.current
        box.querySelector('.ck-editor__editable_inline').style.height = (box.offsetHeight - 50) + 'px'
      }
    }, timeout)
  }

  const onClose = () => {
    isModalClosed = true
    props.onUpdate(task)
    props.onClose()
  }

  const deleteTask = async () => {
    try {
      await taskApi.delete(boardId, task.id)
      props.onDelete(task)
      setTask(undefined)
    } catch (err) {
      alert(err)
    }
  }

  const updateTitle = async (e) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    timer = setTimeout(async () => {
      try {
        await taskApi.update(boardId, task.id, { title: newTitle })
      } catch (err) {
        alert(err)
      }
    }, timeout)

    task.title = newTitle
    setTitle(newTitle)
    props.onUpdate(task)
  }

  const updateContent = async (event, editor) => {
    clearTimeout(timer)
    const data = editor.getData()

    console.log({ isModalClosed })

    if (!isModalClosed) {
      timer = setTimeout(async () => {
        try {
          await taskApi.update(boardId, task.id, { content: data })
        } catch (err) {
          alert(err)
        }
      }, timeout);

      task.content = data
      setContent(data)
      props.onUpdate(task)
    }
  }

  return (
    <Modal
      open={task !== undefined}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={task !== undefined}>
        <TaskModalContainer>
          <header><Trash onClick={deleteTask} size={20} color={'red'} /></header>
      
          <input type="text" onChange={updateTitle} value={title} placeholder="Sem titulo" />
          <timer>
            <span>{task !== undefined ? Moment(task.createdAt).format('DD/MM/YYYY') : ''}</span>
          </timer>
          <div className="editorContainer">
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={updateContent}
              onFocus={updateEditorHeight}
              onBlur={updateEditorHeight}      
            />
        </div>
        </TaskModalContainer>
      </Fade>
    </Modal>
  )
}