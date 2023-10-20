import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TaskComponent from '../components/TaskComponent'
import AddTask from '../components/AddTask'

export default function Task() {
    const { id } = useParams()

    const [myTodos, setMyTodos] = useState([])
    const [todo, setTodo] = useState({})

    useEffect(() => {
        const array = sessionStorage.getItem('todos')
        setMyTodos(JSON.parse(array) || [])
        JSON.parse(array)?.map(item => {
            if (item.id == id) {
                setTodo(item)
            }
        })
    }, [])

    const getTodos = () => {
        const array = sessionStorage.getItem('todos')
        setMyTodos(JSON.parse(array))
        JSON.parse(array)?.map(item => {
            if (item.id == id) {
                setTodo(item)
            }
        })
    }

    const [task, setTask] = useState({ priority: '1-degree' })
    const pickProperty = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const [addModal, setAddModal] = useState(false)
    const closeAdd = () => {
        setAddModal(false)
    }

    const keys = ['main_title', 'main_description', 'priority']

    const pushTodo = (elem) => {
        getTodos()
        myTodos?.map(item => {
            if (item?.id === todo?.id) {
                if (keys.every(key => task.hasOwnProperty(key))) {
                    if (item?.children?.length > 0) {
                        item?.children?.push({ ...task, id: elem[elem.length - 1]?.id + 1, isDone: false, index: elem.length })
                        sessionStorage.setItem('todos', JSON.stringify(myTodos))
                        getTodos()
                        setTask({
                            main_title: '',
                            main_description: '',
                            priority: '1-degree'
                        })
                        setTask({ priority: '1-degree' })
                        closeAdd()
                    } else {
                        item?.children?.push({ ...task, id: 0, isDone: false, index: 0 })
                        sessionStorage.setItem('todos', JSON.stringify(myTodos))
                        getTodos()
                        setTask({
                            main_title: '',
                            main_description: '',
                            priority: '1-degree'
                        })
                        setTask({ priority: '1-degree' })
                        closeAdd()
                    }
                } else {
                    alert('Please check values!')
                }
            }
        })
        getTodos()
    }

    const deleteTask = (index) => {
        myTodos?.map(item => {
            if (item.id == id) {
                item?.children?.splice(item?.children?.indexOf(item?.children[index]), 1)
            }
        })
        sessionStorage.setItem('todos', JSON.stringify(myTodos))
        getTodos()
    }

    const [openEdit, setOpenEdit] = useState(false)

    const [editTask, setEditTask] = useState({})

    const getOneTask = (elem) => {
        setEditTask(elem)
        setOpenEdit(elem.id)
    }

    const pickEditProperty = (e) => {
        setEditTask({ ...editTask, [e.target.name]: e.target.value })
    }

    const editTaskProps = () => {
        myTodos?.map(todo => {
            todo?.children?.map(item=>{
                if (item?.id === editTask.id) {
                    todo?.children?.splice(todo?.children?.indexOf(item), 1, editTask)
                }
            })
        })
        sessionStorage.setItem('todos', JSON.stringify(myTodos))
        getTodos()
        closeEdit()
    }

    const closeEdit = () => {
        setOpenEdit(false)
    }

    const changeIsDone = (elem, index, child) => {
        myTodos?.map(item=>{
            if(item.id === todo.id){
                item?.children?.map(child=>{
                    if(child.id === elem.id){
                        child.isDone = !child.isDone
                    }
                })
            }
        })
        sessionStorage.setItem('todos', JSON.stringify(myTodos))
        getTodos()
    }

    return (
        <div className='tasks'>
            <div className="tasks__all">
                <div className="tasks__all__header">
                    <h2>{todo?.main_title}</h2>
                    <button onClick={() => setAddModal(!addModal)}>Add new</button>
                    <AddTask
                        openAdd={addModal}
                        closeAdd={closeAdd}
                        todos={todo?.children}
                        pickProperty={pickProperty}
                        setTask={setTask}
                        task={task}
                        save={pushTodo}
                        title='Add new task'
                    />
                </div>

                <div className="tasks__list">
                    {todo?.children?.map((item, main_index) => (
                        <TaskComponent
                            key={item?.id}
                            todo={item}
                            main_index={main_index}
                            myTodos={myTodos}
                            setMyTodos={setMyTodos}
                            getTodos={getTodos}
                            setTask={setTask}
                            deleteTask={deleteTask}
                            getOneTask={getOneTask}
                            pickEditProperty={pickEditProperty}
                            editTaskProps={editTaskProps}
                            closeEdit={closeEdit}
                            editTask={editTask}
                            setEditTask={setEditTask}
                            openEdit={openEdit}
                            changeIsDone={changeIsDone}
                        />

                    ))}
                </div>
            </div>
        </div>
    )
}
