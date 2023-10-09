import { faCheck, faEdit, faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function SubTask({ child, index, main_index, done }) {
    return (
        <div key={index} className="tasks__list__item__title__sub">
            <div className=" tasks__list__item__left">
                <FontAwesomeIcon icon={faGripVertical} className="tasks__list__item__drag" />
                <div className={
                    child.isDone ? (child.priority === '1-degree' ? "tasks__list__item__checkbox done_first" :
                        child.priority === '2-degree' ? "tasks__list__item__checkbox done_second" :
                            "tasks__list__item__checkbox done_third") :
                        (child.priority === '1-degree' ? "tasks__list__item__checkbox first" :
                            child.priority === '2-degree' ? "tasks__list__item__checkbox second" :
                                "tasks__list__item__checkbox third")
                }
                    onClick={() => done(child, main_index, index)}
                >
                    {child.isDone ?
                        <FontAwesomeIcon icon={faCheck} /> : null
                    }
                </div>
                <div>
                    <h4>{child.title}</h4>
                    <p>{child.description}</p>
                </div>
            </div>
            <div className="tasks__list__item__title__sub__right">
                <FontAwesomeIcon icon={faEdit} />
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>
    )
}
