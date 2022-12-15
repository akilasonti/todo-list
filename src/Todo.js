import "./Todo.css";
import { useState } from "react";
export function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [todoListFlag, setTodoListFlag] = useState([]);
  const [inp, setInp] = useState("");
  const [editField, updateEditField] = useState("");
  // const [flag, setFlag] = useState(false);
  // const edit = function () {};
  function toggle(index){
    const arr = todoListFlag;
    arr.splice(index, 1, !arr[index]);
    setTodoListFlag([...arr]);
  }
  const update = function (index) {
    const arr = todoList;
    arr.splice(index, 1, editField);
    setTodoList([...arr]);
    updateEditField("");
    toggle(index);
    // setFlag(false);
  };
  const add = (event) => {
    //prevent to refresh the page on form submit
    event.preventDefault();

    const arr = todoList;
    if(arr.includes(inp)){
      alert('Entered value already exists! Please enter a new value!');
      setInp("");
      return false;
    }
    arr.push(inp);
    todoListFlag.push(false);
    setTodoList([...arr]);
    setInp("");
  };
  const deleteList = (idx) => {
    const arr = todoList;
    arr.splice(idx, 1);
    todoListFlag.splice(idx, 1);
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
              {todoListFlag[index] ? (
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
              {todoListFlag[index] ? (
                <>
                <button
                  className="updatebtn"
                  onClick={() => {
                    update(index);
                  }}
                >
                  Update
                </button>
                <button onClick={()=>{
                  toggle(index);updateEditField("");
                }}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="fstbtn" onClick={() =>{
                    toggle(index);
                    updateEditField(todoList[index]);
                  }}>
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
