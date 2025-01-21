import React, { useState } from 'react'

const Forms = ({onSubmit}) => {
    const [relation,setrelation]=useState("");

    const handleinputchange=(event)=>{
      setrelation(event.target.value);
    }

    const handlesubmit=(event)=>{
      event.preventDefault();
      alert(`relation submitted ${relation}`);
      onSubmit({relation});
    }
    
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <label>
          <input
            type='text'
            id='relation'
            value={relation}
            onChange={handleinputchange}
            placeholder='enter the relations'
          />
          <button type='submit'>Submit</button>
        </label>
        
      </form>
      
    </div>
  )
}
export default Forms
