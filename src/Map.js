import React, { Component } from 'react';
import * as d3 from "d3";

const WIDTH = 600;
const HEIGHT = 700;

const STATION_RADIUS = 3;
const STATION_STROKE_WIDTH = 2;
const STATION_LABEL_PIXEL_OFFSET = 6


class Map extends Component {
  componentDidMount() {
    var svg = d3.select("#map-container")
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .append("g")

    const stations = this.props.networkData.stations
    const segments = this.props.networkData.segments

    const enteredSegments = svg
      .selectAll("line")
      .data(segments)
      .enter()

    enteredSegments
      .append("line")
      .attr("x1", segment => this.scaleX(segment.source_station.coordinates.x))
      .attr("y1", segment => this.scaleY(segment.source_station.coordinates.y))
      .attr("x2", segment => this.scaleX(segment.target_station.coordinates.x))
      .attr("y2", segment => this.scaleY(segment.target_station.coordinates.y))
      .style("stroke", "black")
      .style("stroke-width", 1.5);

    const enteredStations = svg
      .selectAll("circle")
      .data(stations)
      .enter()

    // might need additoinal attr to assign circle id
    // later down the chain, add a click listener .on, and assign a listener
    // Stretch goal: use transition to animate color changes for example
    // For larger click box use Voronio
    enteredStations
      .append("circle")
      .attr("r", STATION_RADIUS)
      .attr("cx", station => this.scaleX(station.coordinates.x))
      .attr("cy", station => this.scaleY(station.coordinates.y))
      .style("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", STATION_STROKE_WIDTH)



    enteredStations
      .append("text")
      .text(station => station.name)
      .attr("text-anchor", "middle")
      .attr("dx", station => this.scaleX(station.coordinates.x))
      .attr("dy", station => this.scaleY(station.coordinates.y - STATION_LABEL_PIXEL_OFFSET))
      .style("font-size", "12px")
  }

  render() {
    return null;
  }

  // This needs to scale, as it was decided that the map image would be larger
  // than originally anticipated. An 2.0 version of the map would eliminate this issue by 
  // working with GPS and GIS data.
  scaleX(value) {
    return value * 1.54 + 4
  }

  scaleY(value) {
    return value * 1.54 + 5
  }
};

export default Map;