import React from 'react';
import './RoutePlanner.css';
import StationSelector from './StationSelector'
import axios from 'axios';
import { backendUrl } from './App';

// TODO: This is so basic styling can get done. Remove when hooking up StationSelector to backend.
const dummyList = [
  "Berlin",
  "Dusseldorf",
  "Frankfurt",
  "Leipzig",
  "Hanover",
  "Nuremberg",
  "Stuttgard"
]


class RoutePlanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      to: null,
      from: null,
      datetime: null
    };
  }

  componentDidMount() {
    const stationsUrl = `${backendUrl}/stations`
    axios.get(stationsUrl).then((response) => {
      const stations = response.data.map(station => ({ id: station.id, name: station.name }))
      this.setState({ stations: stations });
    });
  }

  updateStationSelection = (propertyName) => {
    return stationId => {
      this.setState({ [propertyName.toLowerCase()]: stationId });
    }
  }

  submitForm = event => {
    event.preventDefault();

    if (this.formComplete()) {
      console.log("Form submitted!!");
      const request = axios({
        method: 'post',
        url: `${backendUrl}/journeys`,
        data: {
          source_station: this.state.from,
          target_station: this.state.to,
          date_time: this.state.datetime
        }
      })
      request
        .then(response => console.log(response))
        .catch(err => console.log("Change me when the Journeys endpoint is complete!"));
    }
  }

  formComplete = () => {
    return this.state.to != null && this.state.from != null
  }


  render() {
    return (
      <form>
        <div className="RoutePlanner__wrapper">
          <div className="RoutePlanner__top-banner">
            <div className="RoutePlanner__gb-logo">GB</div>
            <div className="RoutePlanner__clear-button">Clear all</div>
          </div>
          <div className="RoutePlanner__row">
            <StationSelector
              label={"From"}
              stations={this.state.stations}
              onSelectionChange={this.updateStationSelection("from")}
            />
          </div>
          <div className="RoutePlanner__row">
            <StationSelector
              label={"To"}
              stations={this.state.stations}
              onSelectionChange={this.updateStationSelection("to")}
            />
          </div>
          <div className="RoutePlanner__row">
            <div className="RoutePlanner__departure-wrapper">
              <div className="RoutePlanner__input-text--departure">
                <label className="RoutePlanner__input-label--departure" htmlFor="departureTime">Departure</label>
                <div id="departureTime" className="RoutePLanner__input-datetime">Fri Jan 6 2023 10:29am</div>
              </div>
              <button className="RoutePlanner__now-button">Now</button>
            </div>
          </div>
        </div>
        <div className="RoutePlanner__search-button-wrapper">
          <button onClick={this.submitForm} className="RoutePlanner__search-button">Search</button>
        </div>
      </form>
    );
  }
}

export default RoutePlanner;