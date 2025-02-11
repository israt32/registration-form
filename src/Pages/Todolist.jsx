// import React,{useState} from "react";
// import './App.css'
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";






const Todolist = () => {
  const userName = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("loggedin");
    // localStorage.removeItem("user"); // Optional: Clears user data too
    navigate("/login");
  }
    
  // email validation
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.email === "israt3@gmail.com";



  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = () =>{
    if (!isAdmin) return; // Restrict unauthorized users


    let newTodoItem ={
      title:newTitle,
      description: newDescription
    }
    
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));


     // Clear input fields after adding
     setNewTitle("");
     setNewDescription("");
  }
  
   const handleDeleteTodo = (index) =>{
    if (!isAdmin) return; // Restrict unauthorized users

    
     let reducedTodo = [...allTodos];
     reducedTodo.splice(index,1);

     localStorage.setItem('todolist', JSON.stringify(reducedTodo));
     setTodos(reducedTodo);

   }

   const handleComplete = (index)=>{

    if (!isAdmin) return; // Restrict unauthorized users

    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' ' + 'at' + ' ' + h + ':' + m + ':' + s;
    
    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updateCompletedArr = [...completedTodos];
    updateCompletedArr.push(filteredItem);
    setCompletedTodos(updateCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updateCompletedArr));
   }

   const handleDeleteCompletedTodo = (index) =>{

    if (!isAdmin) return; // Restrict unauthorized users

    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
   };

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
    if(savedTodo){
      setTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[])

  const handleEdit = (ind,item) =>{
    if (!isAdmin) return; // Restrict unauthorized users

     setCurrentEdit(ind);
     setCurrentEditedItem(item);
  }
  const handleUpdateTitle = (value)=>{
   setCurrentEditedItem((prev)=>{
    return{...prev, title:value}
   })
  }
  const handleUpdateDescription = (value)=>{
    setCurrentEditedItem((prev)=>{
      return{...prev, description:value}
     })
  }

  const handleUpdateTodo = () =>{
    if (!isAdmin) return; // Restrict unauthorized users

    let newToDo  = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
  }

  return (
    <div className="todo-container">
      <h3 className="todo-heading">{userName.name}'s Task List</h3>
      <div className="todo-wrapper">

      {isAdmin && (
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="">Title</label>
            <input value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} type="text" placeholder="What's the task title?" />
          </div>
          <div className="todo-input-item">
            <label htmlFor="">Description</label>
            <input value={newDescription} onChange={(e)=> setNewDescription(e.target.value)} type="text" placeholder="What's the task description?" />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
          </div>
        </div>

           )}


        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen===false && `active`}`} onClick={() =>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && `active`}`} onClick={() =>setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className="todo-list">
          



        {
           isCompleteScreen===false && allTodos.map((item, index)=>{
            if(currentEdit===index){
              
              return(
                <div className="edit_wrapper" key={index}>
             
                <input type="text" placeholder="Updated Title" onChange={(e)=>handleUpdateTitle(e.target.value)} value={currentEditedItem.title} />
                <textarea type="text" placeholder="Updated Title" rows={4} onChange={(e)=>handleUpdateDescription(e.target.value)} value={currentEditedItem.description} />
                
                <button type="button" onClick={handleUpdateTodo} className="primaryBtn">Update</button>

               </div>
              )
          
            }
            else{
            return(
                
              <div className="todo-list-item" key={index}>
              <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              </div>
     

          {/* ✅ Only show delete, edit, and complete icons if the user is an admin */}
         {isAdmin && ( 
              <div>
              <AiOutlineDelete className="icon" onClick={()=>handleDeleteTodo(index)} title="Delete?"></AiOutlineDelete>

              <BsCheckLg 
              className="check-icon" onClick={()=>handleComplete(index)} title="Complete?">

              </BsCheckLg>
              <AiOutlineEdit  className="check-icon" onClick={()=>handleEdit(index,item)} title="Edit?"></AiOutlineEdit>
              </div>
     
         )}



              </div>
                   )
                  }
            })
        }

      



         {
           isCompleteScreen===true && completedTodos.map((item, index)=>{
              return(
                
         <div className="todo-list-item" key={index}>
         <div>
         <h3>{item.title}</h3>
         <p>{item.description}</p>
         <p><small>Completed on: {item.completedOn}</small></p>
         </div>


        {/* ✅ Only show delete icon if the user is an admin */}
        {isAdmin && ( 
         <div>
         <AiOutlineDelete className="icon" onClick={()=>handleDeleteCompletedTodo(index)} title="Delete?"></AiOutlineDelete>
         </div>

        )}

         </div>
              )
            })
        }


        </div>

       
      </div>


      <button onClick={handleLogout} type="button" className="logoutBtn">Log Out</button>
      
    </div>
  );
};

export default Todolist;


