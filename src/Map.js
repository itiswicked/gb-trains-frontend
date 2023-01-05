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
    const links = this.props.networkData.segments
    console.log(stations);

    // const link = svg
    //   .selectAll("line")
    //   .data(linksWithCoordinates)
    //   .enter()
    //   .append("line")
    //   .attr("x1", function (d) { console.log(d); return d.sourceNode.cx; })
    //   .attr("y1", function (d) { return d.sourceNode.cy; })
    //   .attr("x2", function (d) { return d.targetNode.cx; })
    //   .attr("y2", function (d) { return d.targetNode.cy; })
    //   .style("stroke", "black")
    //   .style("stroke-width", 2);

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