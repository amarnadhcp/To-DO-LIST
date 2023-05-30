import './App.css';
import {useState} from 'react'
import Swal from 'sweetalert2'

function App() {

  const [toDos,setToDos] = useState([])
  const [toDo,setToDo] = useState('')

  const currentDay = new Date().toLocaleDateString(
    "default",{weekday : "long"}
  )

  const addNewToDo = ()=>{
    if(toDo.trim()===''){
      Swal.fire({
        icon : 'error',
        text : 'please enter valid item'
      })
      return
    }

    const duplicate = toDos.some((item)=>item.text === toDo)

    if(duplicate){
      Swal.fire({
        icon: 'error',
        text: 'This item already exists in the list!',
      })
    }else{
      setToDos([...toDos,{id:Date.now(),text:toDo,status:false}])}
      setToDo('')

    }

    const Deletion = (id)=>{
      setToDos(toDos.filter((obj)=>obj.id!==id))
    }
  
  
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={addNewToDo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
      { toDos.map((obj)=>{

        return <div className="todo">
          <div className="left">
            <input onChange={(e)=>{

            setToDos(toDos.filter(obj2=>{
              if(obj2.id===obj.id){
               obj2.status = e.target.checked 
              }
              return obj2
            }))
            }} value={obj.status} type="checkbox" name="" id="" />
            <p>{obj.text}</p>
          </div>
          <div className="right">
            <i onClick={()=>Deletion(obj.id)} className="fas fa-times"></i>
          </div>
        </div>

           })  }

          {/* {toDos.map((obj)=>{
            if(obj.status){
              return(<h1>{obj.text}</h1>)
            }
            return null
          })}  */}
   
      </div>
    </div>
  );
}

export default App;
