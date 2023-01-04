import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [users,setUsers] = useState([])

    //Find id for delete
    const {id}=useParams()

    useEffect(()=>{
       
        loadUsers();

    },[]);

    const loadUsers=async () => {
        const result=await axios.get("http://localhost:8090/books")
        setUsers(result.data);
    };

    //delete
    const deleteUser=async (id)=>{
      await axios.delete(`http://localhost:8090/book/${id}`)
      loadUsers()
    }


  return (
    <div className='container'>

        <div className='py-4'>




        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">title</th>
      <th scope="col">author</th>
      <th scope="col">cost</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

    {
        users.map((user,index)=>(

    <tr>
      <th scope="row" key={index}>{index+1}</th>
      <td>{user.title}</td>
      <td>{user.author}</td>
      <td>{user.cost}</td>
      <td>
        <Link class="btn btn-primary mx-2">View</Link>
        <Link class="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
        <button class="btn btn-danger mx-2" onClick={()=>deleteUser(user.id)}>Delete</button>
      </td>
    </tr>

        ))
    }

    
    
  </tbody>
</table>





        </div>
      
    </div>
  )
}
