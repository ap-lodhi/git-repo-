import React from "react"
import { useEffect } from "react";
import { useState } from "react";

 const Serach = ()=>{

    const [name , setName]=useState("react");
    const [data, setData] = useState([]);
    const [page, setPage]=useState(1)


    const handleChange = (e)=>{
        setName(e.target.value)
    }
  
    useEffect(()=>{
        getPage()
    },[page])

    const handleSearch = () => {
        fetch(`https://api.github.com/search/repositories?q=${name}`)
        .then((res) => res.json())
        .then((res) => setData(res.items))
        .catch((err) => console.log(err))
    }
      
    const getPage =()=>{
        fetch(`https://api.github.com/search/repositories?q=${name}&_page=${page}&_limit=${5}`)
        .then((res) => res.json())
        .then((res) => setData(res.items))
        .catch((err) => console.log(err))
    }
    

    return(
        <>
        <h1>Github Repositories</h1>
        
        <input type="text"  placeholder="Search " value={name}  onChange={handleChange} />
        <button  onClick={ handleSearch }>Search</button>


        {
                data.map((e,ind) => (
                
                    <h2  key={ind}>{e.full_name}</h2>
                ))
            }

                <button onClick={()=> setPage(pre=> pre-1)}>previous</button>
                {page}
                <button onClick={()=> setPage(pre=> pre+1)}> Next</button>

        </>
    )
 }

 export default Serach;