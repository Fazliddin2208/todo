import React, { useState } from 'react'
import TaskDetail from './TaskDetail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faComment, faEdit, faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons'
import EditTask from './EditTask'
import SubTask from './SubTask'

export default function Task({ todo, main_index, myTodos, setMyTodos, getTodos, setTask }) {

    const [currentCard, setCurrentCard] = useState(null)
    function dragStartHandler(e, slide) {
        setCurrentCard(slide)
        console.log('start');
    }
    function dragOverHandler(e) {
        e.preventDefault()
        console.log('over');
    }

    const dropHandler = async (e) => {
        console.log('drop');
        // slides.forEach((item) => {
        //     arr.push({ id: item.id, order: item.order })
        //     setOrders(arr)
        // })
        // arr.forEach((a) => {
        //     if (a.id == currentCard.id && currentCard.order > slide.order) {
        //         a.order = slide.order
        //     } else {
        //         if (a.order >= currentCard.order + 1) {
        //             a.order = a.order
        //         } else if (a.order >= slide.order) {
        //             a.order++
        //         }
        //     }
        //     if (a.id == currentCard.id && currentCard.order < slide.order) {
        //         a.order = slide.order
        //     } else {
        //         if (a.order > slide.order || a.order <= currentCard.order) {
        //             a.order
        //         } else if (a.order <= slide.order && a.order >= currentCard.order) {
        //             a.order--
        //         }
        //     }
        // })
        // const banners = arr

    }

    const [detailOpen, setDetailOpen] = useState(false)

    const openDetailModal = (elem) => {
        setDetailOpen(elem.id)
    }
    const closeDetailModal = () => {
        setDetailOpen(false)
    }

    const changeIsDone = (elem, index, child) => {
        console.log(elem, index, child);
        if (elem.hasOwnProperty('child_id')) {
            myTodos[index].children[child].isDone = !myTodos[index].children[child].isDone
            sessionStorage.setItem('todos', JSON.stringify(myTodos))
            const array = sessionStorage.getItem('todos')
            setMyTodos(JSON.parse(array))
        } else {
            myTodos[index].isDone = !myTodos[index].isDone
            sessionStorage.setItem('todos', JSON.stringify(myTodos))
            const array = sessionStorage.getItem('todos')
            setMyTodos(JSON.parse(array))
        }
    }

    const deleteTask = (elem, index) => {
        myTodos.splice(myTodos.indexOf(myTodos[index]), 1)
        sessionStorage.setItem('todos', JSON.stringify(myTodos))
        getTodos()
    }

    const [openEdit, setOpenEdit] = useState(false)

    const [editTask, setEditTask] = useState({})

    const getOneTask = (elem) => {
        console.log(elem);
        setEditTask(elem)
        setOpenEdit(elem.id)
    }

    const pickEditProperty = (e) => {
        setEditTask({ ...editTask, [e.target.name]: e.target.value })
    }

    const editTaskProps = () => {
        myTodos?.map(todo => {
            if (todo.id === editTask.id) {
                myTodos.splice(myTodos.indexOf(todo), 1, editTask)
            }
        })
        console.log(myTodos, editTask);
        sessionStorage.setItem('todos', JSON.stringify(myTodos))
        getTodos()
        closeEdit()
    }

    const closeEdit = () => {
        setOpenEdit(false)
    }

    return (
        <div className="tasks__list__item" key={todo.id}
            draggable
            onDragStart={(e) => dragStartHandler(e)}
            onDragEnd={(e) => dragOverHandler(e)}
            onDrag={(e) => dropHandler(e)}
        >
            <TaskDetail open={detailOpen} checker={todo.id} close={closeDetailModal} task={todo} done={changeIsDone} main_index={main_index} />
            <>
                <div className="tasks__list__datas">
                    <div className="tasks__list__item__left">
                        <FontAwesomeIcon
                            draggable
                            onDragStart={(e) => dragStartHandler(e)}
                            onDragEnd={(e) => dragOverHandler(e)}
                            onDrag={(e) => dropHandler(e)}
                            icon={faGripVertical} className="tasks__list__item__drag" />
                        <div
                            className={
                                todo.isDone ? (todo.priority === '1-degree' ? "tasks__list__item__checkbox done_first" :
                                    todo.priority === '2-degree' ? "tasks__list__item__checkbox done_second" :
                                        "tasks__list__item__checkbox done_third") :
                                    (todo.priority === '1-degree' ? "tasks__list__item__checkbox first" :
                                        todo.priority === '2-degree' ? "tasks__list__item__checkbox second" :
                                            "tasks__list__item__checkbox third")
                            }
                            onClick={() => {
                                changeIsDone(todo, main_index)

                            }}
                        >
                            {todo.isDone ?
                                <FontAwesomeIcon icon={faCheck} /> : null
                            }
                        </div>
                        <div className="tasks__list__item__title">
                            <div onClick={() => openDetailModal(todo)} className="tasks__list__item__title__head">
                                <h4 className={todo.isDone ? 'italic overline' : null}>{todo.main_title}</h4>
                                <p className={todo.isDone ? 'italic' : null}>{todo.main_description}</p>
                            </div>
                            {todo.children?.map((child, index) => (
                                // <div key={index} className="tasks__list__item__title__sub">
                                //     <div className=" tasks__list__item__left">
                                //         <FontAwesomeIcon icon={faGripVertical} className="tasks__list__item__drag" />
                                //         <div className={
                                //             child.isDone ? (child.priority === '1-degree' ? "tasks__list__item__checkbox done_first" :
                                //                 child.priority === '2-degree' ? "tasks__list__item__checkbox done_second" :
                                //                     "tasks__list__item__checkbox done_third") :
                                //                 (child.priority === '1-degree' ? "tasks__list__item__checkbox first" :
                                //                     child.priority === '2-degree' ? "tasks__list__item__checkbox second" :
                                //                         "tasks__list__item__checkbox third")
                                //         }
                                //             onClick={() => changeIsDone(child, main_index, index)}
                                //         >
                                //             {child.isDone ?
                                //                 <FontAwesomeIcon icon={faCheck} /> : null
                                //             }
                                //         </div>
                                //         <div>
                                //             <h4>{child.title}</h4>
                                //             <p>{child.description}</p>
                                //         </div>
                                //     </div>
                                //     <div className="tasks__list__item__title__sub__right">
                                //         <FontAwesomeIcon icon={faEdit} />
                                //         <FontAwesomeIcon icon={faTrash} />
                                //     </div>
                                // </div>
                                <SubTask key={index} child={child} index={index} main_index={main_index} done={changeIsDone} />
                            ))}
                        </div>
                    </div>
                    <div className="tasks__list__item__right">
                        <FontAwesomeIcon onClick={() => {
                            getOneTask(todo)
                        }} icon={faEdit} />
                        <FontAwesomeIcon onClick={() => deleteTask(todo, main_index)} icon={faTrash} />
                    </div>
                    <EditTask
                        openEdit={openEdit}
                        checker={todo?.id}
                        closeEdit={closeEdit}
                        todos={myTodos}
                        pickProperty={pickEditProperty}
                        setTask={setTask}
                        task={editTask}
                        setEdit={setEditTask}
                        save={editTaskProps}
                        title='Edit task'

                    />
                </div>
                <div className="tasks__list__infos">
                    <FontAwesomeIcon icon={faComment} /> {todo?.comment?.length}
                </div>
            </>
        </div>
    )
}
