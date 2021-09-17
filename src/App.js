import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'



// hämta all data från den länken
const url = 'https://course-api.com/react-tours-project'
function App() {


// setState för loading som visas när vi fetch
  const [loading, setLoading] = useState(true); 
// setState empty
  const [tours, setTours] = useState([]);


const removeTour = (id) => {

  const newTours = tours.filter((tour) => tour.id !== id);
  setTours(newTours)

}

  const fetchTours = async () => {
    setLoading(true);


      try {
      const response = await fetch(url);
      const tours = await response.json()
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
useEffect(() => {

fetchTours();

}, []);


// om loading visa loading.js
  if(loading){

    return (
      <main>
       <Loading />
      </main>
    )

  }

  // om tours data = 0 så visa nedan. fetchTours hämtar all tour data igen 
  if(tours.length === 0) {

    return (

      <main>
        <div className="title">
          <h2>No tours left.</h2>
        
          <button className="btn" onClick={fetchTours}>Refresh</button> 
        </div>
      </main>

    )

  }

  return (
  
  <main>
    
    <Tours tours={tours} removeTour={removeTour}/>
    
    </main>

  ); 
}

export default App
