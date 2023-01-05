import React, { Component } from 'react';
import * as d3 from "d3";

const WIDTH = 390;
const HEIGHT = 440;

class Map extends Component {

  componentDidMount() {
    var svg = d3.select("body")
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .append("g")

    const stations = this.props.networkData.stations
    const segments = this.props.networkData.segments
    console.log(segments);

    const enteredSegments = svg
      .selectAll("line")
      .data(segments)
      .enter()

    enteredSegments
      .append("line")
      .attr("x1", segment => segment.source_station.coordinates.x)
      .attr("y1", segment => segment.source_station.coordinates.y)
      .attr("x2", segment => segment.target_station.coordinates.x)
      .attr("y2", segment => segment.target_station.coordinates.y)
      .style("stroke", "black")
      .style("stroke-width", 1.5);

    const enteredStations = svg
      .selectAll("circle")
      .data(stations)
      .enter()

    enteredStations
      .append("circle")
      .attr("r", 2)
      .attr("cx", station => station.coordinates.x)
      .attr("cy", station => station.coordinates.y)
      .style("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", 2)

    enteredStations
      .append("text")
      .text(station => station.name)
      .attr("text-anchor", "middle")
      .attr("dx", station => station.coordinates.x)
      .attr("dy", station => station.coordinates.y - 6)
      .style("font-size", "8px")
  }

  render() {
    return null;
  }
};

export default Map;