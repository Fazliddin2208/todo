import React, { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import Task from "../components/TaskComponent";
import { ReactSortable } from "react-sortablejs";

export default function Tasks() {
  const [myTodos, setMyTodos] = useState([]);

  useEffect(() => {
    const array = sessionStorage.getItem("todos");
    setMyTodos(JSON.parse(array) || []);
  }, []);

  const getTodos = () => {
    const array = sessionStorage.getItem("todos");
    setMyTodos(JSON.parse(array));
  };

  const [addModal, setAddModal] = useState(false);
  const closeAdd = () => {
    setAddModal(false);
  };

  const [task, setTask] = useState({ priority: "1-degree" });

  const pickProperty = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const keys = ["main_title", "main_description", "priority"];

  const pushTodo = (elem) => {
    getTodos();
    if (keys.every((key) => task.hasOwnProperty(key))) {
      if (elem?.length > 0) {
        elem.push({
          ...task,
          id: elem[elem.length - 1]?.id + 1,
          isDone: false,
          index: elem.length,
          children: [],
          comment: [],
        });
        sessionStorage.setItem("todos", JSON.stringify(elem));
        getTodos();
        setTask({
          main_title: "",
          main_description: "",
          priority: "1-degree",
        });
        setTask({ priority: "1-degree" });
        closeAdd();
      } else {
        elem.push({
          ...task,
          id: 0,
          isDone: false,
          index: 0,
          children: [],
          comment: [],
        });
        sessionStorage.setItem("todos", JSON.stringify(elem));
        getTodos();
        setTask({
          main_title: "",
          main_description: "",
          priority: "1-degree",
        });
        setTask({ priority: "1-degree" });
        closeAdd();
      }
    } else {
      alert("Please check values!");
    }
  };

  const deleteTask = (index) => {
    myTodos.splice(myTodos.indexOf(myTodos[index]), 1);
    sessionStorage.setItem("todos", JSON.stringify(myTodos));
    getTodos();
  };

  const [openEdit, setOpenEdit] = useState(false);

  const [editTask, setEditTask] = useState({});

  const getOneTask = (elem) => {
    setEditTask(elem);
    setOpenEdit(elem.id);
  };

  const pickEditProperty = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const editTaskProps = () => {
    myTodos?.map((todo) => {
      if (todo.id === editTask.id) {
        myTodos.splice(myTodos.indexOf(todo), 1, editTask);
      }
    });
    sessionStorage.setItem("todos", JSON.stringify(myTodos));
    getTodos();
    closeEdit();
  };

  const closeEdit = () => {
    setOpenEdit(false);
  };

  const changeIsDone = (elem, index, child) => {
    if (elem.hasOwnProperty("child_id")) {
      myTodos[index].children[child].isDone =
        !myTodos[index].children[child].isDone;
      sessionStorage.setItem("todos", JSON.stringify(myTodos));
      const array = sessionStorage.getItem("todos");
      setMyTodos(JSON.parse(array));
    } else {
      myTodos[index].isDone = !myTodos[index].isDone;
      sessionStorage.setItem("todos", JSON.stringify(myTodos));
      const array = sessionStorage.getItem("todos");
      setMyTodos(JSON.parse(array));
    }
  };

  useEffect(() => {
    sortList(myTodos);
  }, [myTodos]);

  const sortList = (elem) => {
    sessionStorage.setItem("todos", JSON.stringify(myTodos));
  };

  return (
    <div className="tasks">
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
            title="Add new task"
          />
        </div>

        <div className="tasks__list">
          <ReactSortable
            list={myTodos}
            setList={setMyTodos}
            onChange={() => sortList(myTodos)}
          >
            {myTodos?.length > 0 ? (
              myTodos?.map((todo, main_index) => (
                <Task
                  key={todo.id}
                  todo={todo}
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
              ))
            ) : (
              <h2>You don't have any tasks!</h2>
            )}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
}
