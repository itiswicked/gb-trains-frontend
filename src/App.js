import map from './map.png';
import React from 'react';
import './App.css';
import Map from './Map.js';
import axios from 'axios';

const baseUrl = "http://localhost:3001";
const mapUrl = `${baseUrl}/map`;

function App() {
  const [mapNetworkData, setMapNetworkData] = React.useState(null);

  React.useEffect(() => {
    axios.get(mapUrl).then((response) => {
      setMapNetworkData(response.data);
    });
  }, []);

  return (
    <div className="App">
      <img style={{ "zIndex": "auto" }} className="Map-image" src={map} alt="Map of Germany" />
      {(() => {
        if (mapNetworkData) {
          return <Map networkData={mapNetworkData} />;
        }
      })()}
    </div>
  );
}

export default App;
