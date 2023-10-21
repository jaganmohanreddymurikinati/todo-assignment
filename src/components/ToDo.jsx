import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faPen,faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ToDo=({toDo,markDone,setUpdatedData,deleteTask,filter})=>{
    const filteredTasks =
    filter === "completed"
      ? toDo.filter((task) => task.status === true)
      : filter === "notCompleted"
      ? toDo.filter((task) => task.status === false)
      : toDo;
    return(
        <>
      {filteredTasks.length === 0 ? "" : (
        filteredTasks.map((task, index) => {
          return (
            // Your task rendering logic here
            

<React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status?"done":""}>
                  <span className="taskNumber">{index+1}</span>
                  <span className="taskText">{task.title}</span>
                </div>
                <div className="iconsWrap">
                  <span title="competed / not completed " onClick={(e)=>markDone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck}/>
                  </span>
                  {task.status?null:(
                    <span onClick={()=>setUpdatedData({
                      id:task.id,
                      title:task.title,
                      status:task.status?true:false
    
                    })} title="Edit">
                      <FontAwesomeIcon icon={faPen}/>
                    </span>
                  )}
                  
                  <span title="delete" onClick={()=>deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan}/>
                  </span>
                </div>
              </div>
              
            </React.Fragment>
          );
        })
      )}
    </>
    )
}

export default ToDo