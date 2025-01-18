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
                    placeholder='Enter your code'
                    onChange={(e)=>setRelation(e.target.value)}

                />
            </label>
        </form>
      
    </div>
  )
}

export default Forms
