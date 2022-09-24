import { useEffect, useState } from 'react';
import './App.css';
import Icons from './components/Icons';

function App() {
  const [search, setSearch] = useState('New York');
  const [values, setValues] = useState('')
  const [icon, setIcon] = useState('')

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=93ff5f0cb3748b65b353eb2dfd568b8f`
  const getData = async () => {
    await fetch(URL)
      .then(response => {return response.json()})
      .then( data => {
        if(data.cod >= 400) {
          setValues(false)
        }else{         
          setIcon(data.weather[0].main)
          setValues(data)
        }        
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSearch = (e) => {
    if(e.key === 'Enter'){      
      setSearch(e.target.value)
    }
  }
  useEffect(()=>{
    getData()
  },[search]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <div className="container">
      <h1>El Tiempo de hoy</h1>
      <div className='row'>
        <input 
          onKeyDown={handleSearch}
          type="text"          
          autoFocus
        />
      </div>
    </div>

    <div className='card'>
      {(values) ? (
        <div className='card-container'>
          <h2 className='city-name'>{values.name}</h2>
          <p className='temp'>{values.main.temp.toFixed(0)}&deg;</p>
          <img className='icon' src={Icons(icon)} alt="icon-weather" />
          <div className='card-footer'>
            <p className='temp-max-min'>{values.main.temp_min.toFixed(0)}&deg;  |  {values.main.temp_max.toFixed(0)}&deg;</p>
          </div>
        </div>
      ) : (
        <h2>{"La ciudad no fue encontrada"}</h2>
        
      )
      }

    </div>

    </>  
  );
}

export default App;
