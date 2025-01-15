import React, { useState } from 'react';

const Forms = () => {
    const [relation,setRelation]=useState("");
  return (
    <div>
        <form>
            <label>
                <input
                    type="text"
                    value={relation}
                    placeholder='Enter the relationship between elements separated by "->"'
                    onChange={(e)=>setRelation(e.target.value)}

                />
            </label>
        </form>
      
    </div>
  )
}

export default Forms
