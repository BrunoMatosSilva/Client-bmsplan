import { Backdrop, Fade, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import taskApi from '../../api/taskApi'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Trash } from 'phosphor-react'
import Spinner from '../../assets/spinner.svg'

import { ContainerLoading, TaskModalContainer } from './styles'
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTask(props.task)
    setTitle(props.task !== undefined ? props.task.title : '')
    setContent(props.task !== undefined ? props.task.content : '')
    if (props.task !== undefined) {
      isModalClosed = false

      updateEditorHeight()
    }
  }, [props.task])

  function updateEditorHeight() {
    setTimeout(() => {
      if (editorWrapperRef.current) {
        const box = editorWrapperRef.current
        box.querySelector('.ck-editor__editable_inline').style.height = (box.offsetHeight - 50) + 'px'
      }
    }, timeout)
  }

  function onClose() {
    isModalClosed = true
    props.onUpdate(task)
    props.onClose()
  }

  async function deleteTask() {
    setIsLoading(true);
    try {
      await taskApi.delete(boardId, task.id)
      props.onDelete(task)
      setTask(undefined)
    } catch (err) {
      alert(err)
    }finally {
      setIsLoading(false);
    }
  }

  async function updateTitle(e) {
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

  async function updateContent(event, editor) {
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
          <header>
            {!isLoading && <Trash onClick={deleteTask} size={20} color={'red'} />}
            {isLoading && <ContainerLoading><img src={Spinner} /></ContainerLoading> }
          </header>

          <input type="text" onChange={updateTitle} value={title} placeholder="Sem titulo" />
          <div className="editorContainer">
            <CKEditor
              editor={ClassicEditor}
              config={ {
                toolbar: ['heading', '|', 'bold', 'italic','underline', '|', 'undo', 'redo', '|', 'numberedList', 'link', 'insertTable', 'blockQuote' ]
              } }
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
