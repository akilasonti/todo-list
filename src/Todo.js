import "./Todo.css";
import { useState } from "react";
export function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [inp, setInp] = useState("");
  const [editField, updateEditField] = useState("");
  const [flag, setFlag] = useState(false);
  const edit = function () {};
  const update = function (index) {
    const arr = todoList;
    arr.splice(index, 1, editField);
    setTodoList([...arr]);
    updateEditField("");
    setFlag(false);
  };
  const add = (event) => {
    //prevent to refresh the page on form submit
    event.preventDefault();

    const arr = todoList;
    arr.push(inp);
    setTodoList([...arr]);
    setInp("");
  };
  const deleteList = (idx) => {
    const arr = todoList;
    arr.splice(idx, 1);
    setTodoList([...arr]);
  };
  return (
    <div className="container1">
      <div className="container2">
        <h1>Todo-List</h1>
        <form onSubmit={add}>
          <input
            required
            id="addInput"
            type="text"
            placeholder="Enter a todo....."
            value={inp}
            onChange={(event) => {
              setInp(event.target.value);
            }}
            className="task-input"
          />
          <button className="button-add" type="submit">
            Add
          </button>
        </form>
        {todoList.map((value, index) => {
          return (
            <div className="task-input2">
              {flag ? (
                <input
                  type="text"
                  value={editField}
                  onChange={(event) => {
                    updateEditField(event.target.value);
                  }}
                ></input>
              ) : (
                <input type="text" value={value} disabled></input>
              )}
              {flag ? (
                <button
                  className="updatebtn"
                  onClick={() => {
                    update(index);
                  }}
                >
                  Update
                </button>
              ) : (
                <>
                  <button className="fstbtn" onClick={() => setFlag(true)}>
                    Edit
                  </button>
                  <button
                    className="sndbtn"
                    onClick={() => {
                      deleteList(index);
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
