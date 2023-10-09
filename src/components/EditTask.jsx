import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function EditTask({ openEdit, checker, closeEdit, title, todos, task, pickProperty, save }) {

    return (
        <div className={openEdit === checker ? 'modal active' : 'modal'}>
            <div className="modal__add">
                <div className="modal__top">
                    <h3>{title}</h3>
                    <p onClick={closeEdit}>&times;</p>
                </div>
                <div className="modal__add__datas">
                    <div className="modal__add__datas__title">
                        <label>Title</label>
                        <input onChange={(e) => pickProperty(e)} value={task?.main_title ? task.main_title : ''} name='main_title' type="text" placeholder='Write title of your task' />
                    </div>
                    <div className="modal__add__datas__title">
                        <label>Description</label>
                        <textarea value={task?.main_title ? task.main_description : ''} onChange={(e) => pickProperty(e)} name='main_description' placeholder='Write descriotion of your task'></textarea>
                    </div>
                    <div className="modal__add__datas__priorities">
                        <div>
                            <label htmlFor="first" style={{ color: 'rgba(236, 55, 28, 0.7)' }}><FontAwesomeIcon icon={faFlag} />1-degree</label>
                            <input checked={task.priority === '1-degree'} onChange={(e) => pickProperty(e)} type="radio" id='first' value="1-degree" name='priority' />
                        </div>
                        <div>
                            <label htmlFor="second" style={{ color: 'rgba(184, 158, 10, 0.7)' }}><FontAwesomeIcon icon={faFlag} />2-degree</label>
                            <input checked={task.priority === '2-degree'} onChange={(e) => pickProperty(e)} type="radio" id='second' value="2-degree" name='priority' />
                        </div>
                        <div>
                            <label htmlFor="third" style={{ color: 'rgba(43, 226, 119, 0.7)' }}><FontAwesomeIcon icon={faFlag} />3-degree</label>
                            <input checked={task.priority === '3-degree'} onChange={(e) => pickProperty(e)} type="radio" id='third' value="3-degree" name='priority' />
                        </div>
                    </div>
                    <div className="modal__actions">
                        <button onClick={closeEdit}>Cancel</button>
                        <button onClick={() => save(todos)}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
