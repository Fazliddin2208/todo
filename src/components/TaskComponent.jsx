import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faComment,
  faDiagramNext,
  faEdit,
  faGripVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import EditTask from "./EditTask";
import { Link, useParams } from "react-router-dom";

export default function TaskComponent({
  todo,
  main_index,
  myTodos,
  setMyTodos,
  changeIsDone,
  setTask,
  deleteTask,
  getOneTask,
  pickEditProperty,
  editTaskProps,
  closeEdit,
  editTask,
  setEditTask,
  openEdit,
}) {
  const param = useParams();

  return (
    <div className="tasks__list__item">
      <>
        <div className="tasks__list__datas">
          <div className="tasks__list__item__left">
            {!param?.id && (
              <FontAwesomeIcon
                icon={faGripVertical}
                className="tasks__list__item__drag"
              />
            )}
            <div
              className={
                todo?.isDone
                  ? todo?.priority === "1-degree"
                    ? "tasks__list__item__checkbox done_first"
                    : todo?.priority === "2-degree"
                    ? "tasks__list__item__checkbox done_second"
                    : "tasks__list__item__checkbox done_third"
                  : todo?.priority === "1-degree"
                  ? "tasks__list__item__checkbox first"
                  : todo?.priority === "2-degree"
                  ? "tasks__list__item__checkbox second"
                  : "tasks__list__item__checkbox third"
              }
              onClick={() => {
                changeIsDone(todo, main_index);
              }}
            >
              {todo?.isDone ? <FontAwesomeIcon icon={faCheck} /> : null}
            </div>
            <div className="tasks__list__item__title">
              <div
                className="tasks__list__item__title__head"
              >
                <Link to={!param.id && `/task/${todo?.id}`}>
                  <h4 className={todo?.isDone ? "italic overline" : null}>
                    {todo?.main_title}
                  </h4>
                  <p className={todo?.isDone ? "italic" : null}>
                    {todo?.main_description}
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="tasks__list__item__right">
            <FontAwesomeIcon
              onClick={() => {
                getOneTask(todo);
              }}
              icon={faEdit}
            />
            <FontAwesomeIcon
              onClick={() => deleteTask(main_index)}
              icon={faTrash}
            />
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
            title="Edit task"
          />
        </div>
        <div className="tasks__list__infos">
          {!param?.id && (
            <>
              <p>
                <FontAwesomeIcon icon={faComment} /> {todo?.comment?.length}
              </p>
              <p>
                <FontAwesomeIcon icon={faDiagramNext} />{" "}
                {todo?.children?.length}
              </p>
            </>
          )}
        </div>
      </>
    </div>
  );
}
