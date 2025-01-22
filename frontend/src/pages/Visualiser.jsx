import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Visualiser = ({ resp }) => {
  const [svgContent, setSvgContent] = useState(null);
  const [isimageloaded,setisimageloaded]=useState(false);

  useEffect(() => {
    const fetchDiagram = async () => {
      try {
        const response = await axios.post("http://localhost:5000/generate-diagram", {
          diagramSource: resp.response,
        });
        setSvgContent(response.data); 
        setisimageloaded(true);
      } catch (error) {
        console.error("Error fetching diagram:", error);
      }
    };

    if (resp.response) {
      fetchDiagram();
    }
  }, [resp]);

  const handleaddtocollection=async()=>{
    try{
      const response=await axios.post("http://localhost:5000/save-diagram",{
        stringcommand:resp.response
      });
    }catch(error){
      console.log("error saving data to database ",error);
    }
  }

  const handleviewlastcollection=async()=>{
    try{
      const response=await axios.get("http://localhost:5000/get-last-item");
      const newimage=response.data.stringcommand;
        const fetchDiagram2 = async () => {
          try {
            const response = await axios.post("http://localhost:5000/generate-diagram", {
              diagramSource: newimage,
            });
            setSvgContent(response.data); 
            setisimageloaded(true);
          } catch (error) {
            console.error("Error fetching diagram:", error);
          }
        };
        if (resp.response) {
          fetchDiagram2();
        }
    }catch(error){
      console.log("error vieinglast data",error);
    }
  }

  const handleremovelastcollection= async()=>{
    try{
      const response = await axios.delete("http://localhost:5000/delete-diagram")
    }catch(error){
      console.log("error deleting last data",error);
    }
  }

  return (
    <div>
      <h1>Generated Diagram</h1>
      {svgContent ? (
        <div className='diva'
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <p>Loading diagram...</p>
      )}

      {isimageloaded &&(
        <div style={{ marginTop: "20px" }}>
        <button onClick={handleaddtocollection}>Add to Collection</button>
        <button onClick={handleviewlastcollection}>View Last Collection</button>
        <button onClick={handleremovelastcollection}>Remove Last Collection</button>
      </div>
      )}
    </div>
  );
};

export default Visualiser;
