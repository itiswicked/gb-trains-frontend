import React from 'react';
import './RoutePlanner.css';
import StationSelector from './StationSelector'

// TODO: This is so basic styling can get done. 
// Remove when hooking up StationSelector to backend data
const dummyList = [
  "Berlin",
  "Dusseldorf",
  "Frankfurt",
  "Leipzig",
  "Hanover",
  "Nuremberg",
  "Stuttgard"
]


function RoutePlanner() {
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
            stations={dummyList}
          />
        </div>
        <div className="RoutePlanner__row">
          <StationSelector
            label={"To"}
            stations={dummyList}
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
        <button className="RoutePlanner__search-button">Search</button>
      </div>
    </form>
  );
}

export default RoutePlanner;
