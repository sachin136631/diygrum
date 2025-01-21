import React from 'react';
import Forms from "../components/Forms";
import{useNavigate} from "react-router-dom";
import axios from "axios";

const Input = ({respsetter}) => {
  const navigate = useNavigate();
  const handleformsubmit=async(data)=>{
    try{
      const response=await axios.post("http://localhost:5000/gemini",{ text: data.relation });
      respsetter(response.data);
      navigate("/visualiser");
      console.log("response from backend is ",response.data);
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
