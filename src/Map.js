import React from 'react';
import * as d3 from "d3";
// const data = [12, 5, 6, 6, 9, 10];
// const svg = d3.select("body").append("svg").attr("width", 700).attr("height", 300);
// svg.selectAll("rect").data(data).enter().append("rect")
//   .attr("x", (d, i) => i * 70)
//   .attr("y", 0)
//   .attr("width", 65)
//   .attr("height", (d, i) => d * 10)
//   .attr("fill", "green");

class Map extends React.Component {

  componentDidMount() {
    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const links = [
      { source: 1, target: 2 },
      { source: 2, target: 3 }
    ]

    const nodes = [
      { id: 1, name: "A", cx: "80", cy: "80" },
      { id: 2, name: "B", cx: "120", cy: "120" },
      { id: 3, name: "C", cx: "120", cy: "160" }
    ]


    // Initialize the nodes
    const node = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("cx", node => node.cx)
      .attr("cy", node => node.cy)
      .style("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", 2)

    const linksWithCoordinates = links.map(link => {
      // Replace this dummy data with node lookup
      const targetNode = { id: 1, name: "A", cx: "80", cy: "80" }
      const sourceNode = { id: 2, name: "B", cx: "120", cy: "120" }
      return Object.assign(
        link,
        {
          sourceNode: { cx: sourceNode.cx, cy: sourceNode.cy },
          targetNode: { cx: targetNode.cx, cy: targetNode.cy }
        }
      );
    });

    console.log(linksWithCoordinates)

    const link = svg
      .selectAll("line")
      .data(linksWithCoordinates)
      .enter()
      .append("line")
      .attr("x1", function (d) { console.log(d); return d.source.cx; })
      .attr("y1", function (d) { return d.source.cy; })
      .attr("x2", function (d) { return d.target.cx; })
      .attr("y2", function (d) { return d.target.cy; })
      .style("stroke", "#aaa");

    // console.log(data.nodes.slice(0, 1))

    // Let's list the force we wanna apply on the network
    // const simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
    //   .force("link", d3.forceLink()                               // This force provides links between nodes
    //     .id(function (d) { return d.id; })                     // This provide  the id of a node
    //     .links(data.links)                                    // and this the list of links
    //   )
    //   .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
    //   .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
    //   .on("end", ticked);

    // This function is run at each iteration of the force algorithm, updating the nodes position.
    // function ticked() {
    //   link
    //     .attr("x1", function (d) { return d.source.x; })
    //     .attr("y1", function (d) { return d.source.y; })
    //     .attr("x2", function (d) { return d.target.x; })
    //     .attr("y2", function (d) { return d.target.y; });

    //   node
    //     .attr("cx", function (d) { return d.x + 6; })
    //     .attr("cy", function (d) { return d.y - 6; });
    // }

  }

  render() {
    return null;
  }
};
export default Map;