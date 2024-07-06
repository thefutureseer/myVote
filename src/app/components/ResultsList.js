'use client';
import React from 'react';
import '../../styles/resultsList.css';
import countIdKeys from './CountUsers';

const ResultsList = ({ results }) => {
  const result = results;
  if (!results || results.length === 0) return <p>No results found.</p>;
  const {idCount, majorityVote} = countIdKeys(JSON.stringify(results));

  function getColorClass(index){
    const colorClasses = ['color-red', 'color-yellow', 'color-green', 'color-blue',  'color-purple', 'color-orange', 'color-magenta'];
    return colorClasses[index % colorClasses.length]
  };
  
  return (
    <div style={{display:"flex"}}>
     <div className='list-container'>
      <ul>
        {results.map((result, index) => (
          <li key={result._id}> <h3 className={getColorClass(index)} style={{borderTop: '4px solid gold', background:"#0087ff" }}>{index}</h3>
            <pre>{
              Object.entries(result).map(([key, value], i)=>(
                <div className={`li-div-1 ${getColorClass(i)}`} key={i}>
                  {'\n'} 
                  <p >
                   Q:{key.replace(/-/g, ' ')}{" " }{'\n'} 
                  </p>
                  <p style={{textWrap:'wrap', height:'15%', alignItems:'stretch'}}>
                    A: {Array.isArray(value) ? value.join(', ') : value.toString()}
                  </p> 
                </div>
              ))}</pre>
          </li>
        ))}
      </ul>
     </div>
      <div style={{margin: '3px'}}>
      <h2>Total Vote Results</h2>
      <p>Votes taken: {idCount}</p>
      <p >Majority vote #1 & #2: {majorityVote}</p>
      </div>
    </div>
  );
};
export default ResultsList;