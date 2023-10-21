import React,{useState,useEffect} from "react"
import AddTaskForm from "./components/AddTaskForm.jsx";
import ToDo from "./components/ToDo.jsx";
import UpdateForm from "./components/UpdateForm.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faPen,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {

  const [toDo,setToDo]=useState([])
  // "all" to show all tasks, "completed" to show completed tasks, "notCompleted" to show not completed tasks
  const [filter, setFilter] = useState("all"); 
  
    const [newTask,setNewTask]=useState("");
    const [updatedData,setUpdatedData]=useState("")

    //adding tasks to local storage 
    const loadTasksFromLocalStorage = () => {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setToDo(JSON.parse(storedTasks));
      }
    };
  
    useEffect(() => {
      loadTasksFromLocalStorage();
    }, []);


    //add task 
    const addTask=()=>{
      //
      if(newTask){
        let num=toDo.length+1;
        let newEntry={id:num,title:newTask,status:false}
        const updatedTasks = [...toDo, newEntry];
        setToDo([...toDo,newEntry])
        setNewTask("");

        //adding tasks to local storage 
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
    }

    //deleteTask
    const deleteTask=(id)=>{
        //
        let newTask=toDo.filter(task=>task.id!=id)
        setToDo(newTask);
        // Update local storage
        localStorage.setItem("tasks", JSON.stringify(newTask));

    }
    //markDone 
    const markDone=(id)=>{
      //
      let newTask=toDo.map(task=>{
        if(task.id==id){
          return({...task,status:!task.status})
        }
        return task; 
      })
      setToDo(newTask);
    }
    //cancel update
    const cancelUpdate=()=>{
      setUpdatedData("")
    }

    const getFilteredTasks = () => {
      if (filter === "completed") {
        return toDo.filter((task) => task.status === true);
      } else if (filter === "notCompleted") {
        return toDo.filter((task) => task.status === false);
      } else {
        return toDo;
      }
    };
    

    //changeTask for update 
    const changeTask=(e)=>{
      let newEntry={
        id:updatedData.id,
        title:e.target.value,
        status:updatedData.status?true:false

      }
      setUpdatedData(newEntry)
    }


    //updateTask 
    const updateTask=()=>{
      let filterRecords=[...toDo].filter(task=>task.id!==updatedData.id);
      console.log(filterRecords)
      let updatedObject=[...filterRecords,updatedData]
      setToDo(updatedObject)
      setUpdatedData("");

       // Update local storage
      localStorage.setItem("tasks", JSON.stringify(updatedObject));

    }




  return (
    <div className="container App">
      <h1 className="heading">ToDo List App</h1>
      {/* update task */}
      {updatedData && updatedData ? (
       <UpdateForm
       updatedData={updatedData}
       changeTask={changeTask}
       updateTask={updateTask}
       cancelUpdate={cancelUpdate}
       />
      ):(
        <AddTaskForm
          newTask={newTask} setNewTask={setNewTask} addTask={addTask}
        />
      )}

      {/* filter tasks  */}

      <div className="filter-controls">
        <label htmlFor="filter">Filter Tasks:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="notCompleted">Not Completed Tasks</option>
        </select>
      </div>

      
      {toDo && toDo.length ? "":<h1>No Tasks</h1> }
      <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdatedData={setUpdatedData}
      deleteTask={deleteTask}
      filter={filter} 
      />
    </div>
  );
}

export default App;
