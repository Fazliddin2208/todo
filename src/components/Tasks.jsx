import { faCheck, faComment, faEdit, faFlag, faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import AddTask from './AddTask'
import EditTask from './EditTask'
import TaskDetail from './TaskDetail'
import Task from './Task'

const todos = [
    {
        id: 0,
        index: 0,
        main_title: 'Read book',
        main_description: 'Read 20 page from book',
        isDone: false,
        priority: '1-degree',
    },
    {
        id: 1,
        index: 1,
        main_title: 'Gym',
        main_description: 'Do gym in the morning',
        isDone: false,
        priority: '3-degree',
        children: [
            {
                child_id: 0,
                child_index: 0,
                title: 'Football',
                description: 'Play football with friends',
                isDone: false,
                priority: '2-degree',
            },
            {
                child_id: 1,
                child_index: 1,
                title: 'Chess',
                description: 'Play Chess with friends',
                isDone: false,
                priority: '3-degree',
            }
        ]
    },
    {
        id: 2,
        index: 2,
        main_title: 'Write Code',
        main_description: 'Write some code',
        isDone: true,
        priority: '2-degree',
        comment: [
            { comment_id: 0, comment: 'I have done these' },
            { comment_id: 1, comment: 'I have done these' }
        ]
    }
]

export default function Tasks() {

    const [myTodos, setMyTodos] = useState([])

    useEffect(() => {
        const array = sessionStorage.getItem('todos')
        setMyTodos(JSON.parse(array) || [])
    }, [])

    const getTodos = () => {
        const array = sessionStorage.getItem('todos')
        setMyTodos(JSON.parse(array))
    }

    const [addModal, setAddModal] = useState(false)
    const closeAdd = () => {
        setAddModal(false)
    }

    const [task, setTask] = useState({ priority: '1-degree' })

    const pickProperty = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const keys = ['main_title', 'main_description', 'priority']

    const pushTodo = (elem) => {
        getTodos()
        if (keys.every(key => task.hasOwnProperty(key))) {
            if (elem?.length > 0) {
                elem.push({ ...task, id: elem[elem.length - 1]?.id + 1, isDone: false, index: elem.length, children: [], comment: [] })
                sessionStorage.setItem('todos', JSON.stringify(elem))
                getTodos()
                setTask({
                    main_title: '',
                    main_description: '',
                    priority: '1-degree'
                })
                setTask({ priority: '1-degree' })
                closeAdd()
            } else {
                elem.push({ ...task, id: 0, isDone: false, index: 0 })
                sessionStorage.setItem('todos', JSON.stringify(elem))
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

    return (
        <div className='tasks'>
            <div className="tasks__all">
                <div className="tasks__all__header">
                    <h2>All tasks</h2>
                    <button onClick={() => setAddModal(!addModal)}>Add new</button>
                    <AddTask
                        openAdd={addModal}
                        closeAdd={closeAdd}
                        todos={myTodos}
                        pickProperty={pickProperty}
                        setTask={setTask}
                        task={task}
                        save={pushTodo}
                        title='Add new task'
                    />
                </div>

                <div className="tasks__list">
                    {myTodos?.length > 0 ?
                        myTodos?.map((todo, main_index) => (
                            <Task
                                key={todo.id}
                                todo={todo}
                                main_index={main_index}
                                myTodos={myTodos}
                                setMyTodos={setMyTodos}
                                getTodos={getTodos}
                                setTask={setTask}
                            />
                        )) :
                        <h2>You don't have any tasks!</h2>
                    }
                </div>
            </div>

            {/* <div className="tasks__new">
            add new task
        </div>
        <FontAwesomeIcon icon={faFlag} /> */}
        </div>
    )
}
