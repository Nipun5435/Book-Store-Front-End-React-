// rfc
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {

    let navigate=useNavigate()

    const {id} = useParams()


    const [user,setUser] = useState ({
        title:"",
        author:"",
        cost:""
    })

    const{title,author,cost} = user;

    const onInputChange=(e)=>{

        setUser({ ...user,[e.target.name]: e.target.value});       
    };

    useEffect(()=>{
        loadUser()
    }, []);

    const onSubmit=async(e)=> {
        e.preventDefault();
        await axios.put(`http://localhost:8090/book/${id}`,user)
        navigate("/")
    };


    const loadUser = async ()=>{
        const result=await axios.get(`http://localhost:8090/book/${id}`)
        setUser(result.data)
    }



  return (
    <div className="container">

        <div className = "row">
            <div className= "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Edit User</h2>


<form onSubmit={(e)=> onSubmit(e)}>

                <div className="mb-3">
                    <label htmlFor="Title" className="form-lable">
                        Title
                    </label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Enter Title" 
                    name="title" 
                    value={title}
                    onChange={(e)=>onInputChange(e)}
                    />



                </div>

                <div className="mb-3">
                    <label htmlFor="Title" className="form-lable">
                    Author Name
                    </label>
                    <input type="text" className="form-control" placeholder="Enter Author Name" name="author" value={author}  onChange={(e)=>onInputChange(e)}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="Cost" className="form-lable">
                        Cost
                    </label>
                    <input type="Number" className="form-control" placeholder="Enter Cost" name="cost" value={cost}  onChange={(e)=>onInputChange(e)}/>
                </div>

                <button type="submit" className="btn btn-outline-primary"> Submit </button>
                <Link className="btn btn-outline-danger mx-2" to="/" > Cancel </Link>
</form>

            </div>
        </div>
     
    </div>
  )
}
