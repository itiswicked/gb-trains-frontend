import logo from './logo.svg';
import React from 'react';
import './App.css';
import Map from './Map.js';
import axios from 'axios';

const baseURL = "http://localhost:3001/stations";

function App() {

  const [stations, setStations] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setStations(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
