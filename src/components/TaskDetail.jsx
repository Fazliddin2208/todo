import { faAngleLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import SubTask from './SubTask';

export default function TaskDetail({ open, checker, close, task, done, main_index }) {
  console.log(task);
  const [showButtons, setShowButtons] = useState('')

  const toggleShowButtons = (e) => {
    console.log(e);
    setShowButtons(e)
  }
  const toggleCloseButtons = () => {
    setShowButtons('')
  }

  const [showSubs, setShowSubs] = useState(false)

  const toggleShowSubs = () => {
    setShowSubs(!showSubs)
  }

  const [showComments, setShowComments] = useState(false)

  const toggleShowComments = () => {
    setShowComments(!showComments)
  }

  return (
    <div className={open === checker ? 'modal active' : "modal"}>
      <div className="modal__detail">
        <div className="modal__top">
          <h3>Task detail</h3>
          <p onClick={close}>&times;</p>
        </div>
        <div className="modal__detail__datas">
          <div className="modal__detail__datas__titles">
            <div className="modal__detail__datas__titles__left">
              <div
                className={
                  task?.isDone ? (task?.priority === '1-degree' ? "tasks__list__item__checkbox done_first" :
                    task?.priority === '2-degree' ? "tasks__list__item__checkbox done_second" :
                      "tasks__list__item__checkbox done_third") :
                    (task?.priority === '1-degree' ? "tasks__list__item__checkbox first" :
                      task?.priority === '2-degree' ? "tasks__list__item__checkbox second" :
                        "tasks__list__item__checkbox third")
                }
                onClick={() => {
                  done(task, main_index)

                }}
              >
                {task?.isDone && <FontAwesomeIcon icon={faCheck} />
                }
              </div>
            </div>
            <div className="modal__detail__datas__titles__right">
              
              <div className="modal__detail__datas__titles__right__title">
                <input
                  type="text"
                  onClick={() => toggleShowButtons('title')}
                  defaultValue={task?.main_title}
                  className={showButtons === 'title' ?
                    'modal__detail__datas__titles__right__title__active_input' :
                    task?.isDone && showButtons === '' ? 'overline' : null}
                />
                <div className={showButtons === 'title' ? 'active' : null}>
                  <button onClick={toggleCloseButtons}>Cancel</button>
                  <button>Save</button>
                </div>
              </div>

              <div className="modal__detail__datas__titles__right__title">
                <textarea
                  type="text"
                  onClick={() => toggleShowButtons('description')}
                  defaultValue={task?.main_description}
                  className={showButtons === 'description' ?
                    'modal__detail__datas__titles__right__title__active_input' :
                    task?.isDone && showButtons === '' ? 'italic' : null}
                />
                <div className={showButtons === 'description' ? 'active' : null}>
                  <button onClick={toggleCloseButtons}>Cancel</button>
                  <button>Save</button>
                </div>
              </div>
              <b style={{ paddingLeft:'10px'}}>{task?.priority}</b>
            </div>
          </div>
          <div className="modal__detail__datas__subs">
            <div className="modal__detail__datas__subs__head" onClick={toggleShowSubs}>
                <h4>Sub Tasks ({task?.children?.length}) <span className={showSubs ? 'active' : ''}><FontAwesomeIcon icon={faAngleLeft} /></span></h4>
            </div>
            <div className={showSubs ? "modal__detail__datas__subs__datas active" : "modal__detail__datas__subs__datas"}>
                {
                  task?.children?.map((child, index)=>(
                    <div>
                      <SubTask key={index} child={child} index={index} main_index={main_index} done={done} />
                    </div>
                  ))
                }
                <form className='modal__detail__datas__add_new'>
                  <input type="text" placeholder='Title' />
                  <textarea placeholder='Description'></textarea>
                  <div className='modal__detail__datas__add_new__actions'>
                    <button type='reset'>Cancel</button>
                    <button>Save</button>
                  </div>
                </form>
            </div>
          </div>
          <div className="modal__detail__datas__subs">
            <div className="modal__detail__datas__subs__head" onClick={toggleShowComments}>
              <h4>Comments ({task?.comment?.length}) <span className={showComments ? 'active' : ''}><FontAwesomeIcon icon={faAngleLeft} /></span></h4>
            </div>
            <div className={showComments ? "modal__detail__datas__subs__datas active" : "modal__detail__datas__subs__datas"}>
              {task?.comment?.map(comment=>(
                <p key={comment.comment_id}>{comment.comment}</p>
              ))}
              <form className='modal__detail__datas__add_new'>
                  <input type="text" placeholder='Title' />
                  <textarea placeholder='Description'></textarea>
                  <div className='modal__detail__datas__add_new__actions'>
                    <button type='reset'>Cancel</button>
                    <button>Save</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
