import React from 'react';

const Visualiser = ({resp}) => {
  return (
    <div>
      <h1>the value of response is{typeof resp === "object" ? JSON.stringify(resp.response):resp ||"No response received yet. "}</h1>
    </div>
  )
}

export default Visualiser
