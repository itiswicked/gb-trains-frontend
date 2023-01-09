import React from 'react';
import './StationSelector.css';

class StationSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autoFillOpen: false,
      searchTerm: "",
      matchedStations: [],
      selectedStation: "",
    }
  }

  displayStations = () => {
    if (this.state.matchedStations.length === 0 && this.state.searchTerm.length > 0) {
      return []
    } else if (this.state.matchedStations.length > 0) {
      return this.state.matchedStations
    } else {
      return this.props.stations
    }
  }

  handleStationClick = (event) => {
    this.setState({ matchedStations: [] });
    this.setState({ searchTerm: "" });
    this.setState({ autoFillOpen: false });
    this.setState({ selectedStation: event.target.innerHTML });
  }

  toggleAutoFillState = () => {
    this.state.autoFillOpen ? this.setState({ autoFillOpen: false }) : this.setState({ autoFillOpen: true })
  }

  handleInputChange = (event) => {
    this.setState({ autoFillOpen: true });
    this.setState({ selectedStation: null });

    const searchTerm = event.target.value;
    const filteredStationResults = this
      .props
      .stations
      .filter(station => station.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1);
    this.setState({ matchedStations: filteredStationResults });
    this.setState({ searchTerm: searchTerm });
  }

  render() {
    const inputValue = this.state.searchTerm === "" ? this.state.selectedStation : this.state.searchTerm;
    const label = this.props.label.toLowerCase();

    return (
      <>
        <div onClick={this.toggleAutoFillState} className="StationSelector">
          <label className="StationSelector__input-label" htmlFor={label}>{this.props.label}</label>
          <div className="StationSelector__input" id={label}>
            <input value={inputValue} placeholder="Station" onChange={this.handleInputChange} />
          </div>
        </div>
        {
          this.state.autoFillOpen &&
          <div className="StationSelector__autofill">
            {
              this.displayStations().map(station => {
                return <div onClick={this.handleStationClick} key={station} className="StationSelector__autofill-item">{station}</div>
              })
            }
          </div>
        }
      </>
    )
  }
}

export default StationSelector;