import './Todo.css';
import { useState } from 'react';
export function Todo(){
    const [todoList,setTodoList]= useState([]);
    const [inp,setInp]=useState("");
    const add=(event)=>{
        event.preventDefault()

// const value=document.getElementById("addInput").value;
        const arr=todoList;
        // arr.push(value);
        arr.push(inp);
        setTodoList([...arr]);
        setInp("");
    }
    const deleteList=(idx)=>{
        const arr=todoList;
       arr.splice(idx,1);
         setTodoList([...arr]);
        
    }
    return (
        <div className='container1'>
            <div className='container2'>
            <h1>Todo-List</h1>
            <form onSubmit={add}>
            <input required id="addInput" type="text" placeholder='Enter a todo.....' onChange={(event)=>{
                setInp(event.target.value);
            }} className='task-input'/>
                <button className='button-add' type="submit">Add</button>

            </form>
{todoList.map((value,index)=>{
    return(
        <div type="text" className='task-input2' >{value}
        <div>
      <button className='fstbtn'>Edit</button>
      <button className='sndbtn' onClick={()=>{
        deleteList(index);
      }}>Delete</button>
            </div>     
    </div> 
    );
})}
              
            </div>
           </div>
          
        
    )
}