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

  // style={{ position: "absolute" }}

  return (
    <div className="App">
      <div className="Route-planning-container">Route planning</div>
      <div id="map-container" className="Map-container">
        <img className="Map-image" src={map} alt="Map of Germany" />
        {(() => {
          if (mapNetworkData) {
            return <Map networkData={mapNetworkData} />;
          }
        })()}
      </div>
    </div>
  );
}

export default App;
