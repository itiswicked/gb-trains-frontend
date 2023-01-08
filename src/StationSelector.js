import React from 'react';
import './StationSelector.css';

function StationSelector(props) {
  const lowerCaseLabel = props.label.toLowerCase();
  const [autoFillOpen, setAutoFillOpen] = React.useState(false);
  const [searchTerm, updateAutoFillSearchTerm] = React.useState("");
  const [matchedStations, updateMatchedStations] = React.useState([]);
  const [selectedStation, updateSelectedStation] = React.useState("");
  const displayStations = () => {
    if (matchedStations.length === 0 && searchTerm.length > 0) {
      return []
    } else if (matchedStations.length > 0)
      return matchedStations
    else {
      return props.stations
    }
  }

  console.log(selectedStation);

  const handleStationClick = event => {
    console.log("innnerHTML");
    console.log(event.target.innerHTML)

    updateMatchedStations([])
    updateAutoFillSearchTerm("")
    setAutoFillOpen(false)
    updateSelectedStation(event.target.innerHTML);
  }

  const filterMatchedStations = searchTerm => {
    updateMatchedStations(
      props.stations.filter(station => {
        return station.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1
      })
    )
  }

  const toggleAutoFillState = () => {
    autoFillOpen ? setAutoFillOpen(false) : setAutoFillOpen(true)
  }

  const handleInputChange = event => {
    updateSelectedStation(null)
    updateAutoFillSearchTerm(event.target.value);
    filterMatchedStations(event.target.value);
  }

  const inputValue = () => {
    return searchTerm === "" ? selectedStation : searchTerm
  }

  return (
    <>
      <div onClick={toggleAutoFillState} className="StationSelector">
        <label className="StationSelector__input-label" htmlFor={lowerCaseLabel}>{props.label}</label>
        <div className="StationSelector__input" id={lowerCaseLabel}>
          <input value={inputValue()} placeholder="Station" onChange={handleInputChange} />
        </div>
      </div>
      {
        autoFillOpen &&
        <div className="StationSelector__autofill">
          {
            displayStations().map(station => {
              return <div onClick={handleStationClick} key={station} className="StationSelector__autofill-item">{station}</div>
            })
          }
        </div>
      }
    </>
  )
}

export default StationSelector;