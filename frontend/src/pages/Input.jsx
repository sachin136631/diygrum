import React from 'react';
import Forms from "../components/Forms";
import axios from "axios";

const Input = () => {
  var resp="";
  const handleformsubmit=async(data)=>{
    try{
      const response=await axios.post("http://localhost:5000/gemini",{ text: data.relation });
      resp=response.data;
      console.log("response from backend is ",resp);
    }catch(error){
      console.log("Error:", error);
    }
  }
  return (
    <div>
        <h1>input page</h1>
        <Forms onSubmit={handleformsubmit}/>
    </div>
  )
}

export default Input
