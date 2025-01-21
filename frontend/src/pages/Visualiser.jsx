import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Visualiser = ({ resp }) => {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    const fetchDiagram = async () => {
      try {
        const response = await axios.post("http://localhost:5000/generate-diagram", {
          diagramSource: resp.response,
        });
        setSvgContent(response.data); 
      } catch (error) {
        console.error("Error fetching diagram:", error);
      }
    };

    if (resp.response) {
      fetchDiagram();
    }
  }, [resp]);

  return (
    <div>
      <h1>Generated Diagram</h1>
      {svgContent ? (
        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <p>Loading diagram...</p>
      )}
    </div>
  );
};

export default Visualiser;
