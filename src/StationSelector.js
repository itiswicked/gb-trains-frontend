import React from 'react';
import './StationSelector.css';

class StationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoFillOpen: false,
      searchTerm: "",
      matchedStations: [],
      selectedStation: this.props.selection,
    }
  }

  displayStations = () => {
    if (this.state.matchedStations.length === 0 && this.state.searchTerm.length > 0) {
      return [];
    } else if (this.state.matchedStations.length > 0) {
      return this.state.matchedStations;
    } else {
      return this.props.stations;
    }
  }

  handleStationClick = (event) => {
    const selectedStationId = event.target.attributes.stationid.nodeValue;
    const selectedStationName = event.target.innerHTML
    this.props.onSelectionChange(selectedStationId);

    this.setState({
      matchedStations: [],
      searchTerm: "",
      autoFillOpen: false,
      selectedStation: selectedStationName
    });
  }

  toggleAutoFillState = () => {
    this.setState({ autoFillOpen: !this.state.autoFillOpen });
  }

  handleInputChange = (event) => {
    const searchTerm = event.target.value;
    const filteredStationResults = this
      .props
      .stations
      .filter(station => station.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1);

    this.props.onSelectionChange(null);
    this.setState({
      autoFillOpen: true,
      selectedStation: null,
      matchedStations: filteredStationResults,
      searchTerm: searchTerm
    });
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
                return (
                  <div
                    onClick={this.handleStationClick}
                    stationid={station.id}
                    key={station.id}
                    className="StationSelector__autofill-item">{station.name}</div>
                )
              })
            }
          </div>
        }
      </>
    )
  }
}

export default StationSelector;