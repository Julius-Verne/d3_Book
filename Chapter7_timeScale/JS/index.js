/*
In here I'll create a basic time series viz in order to practice working with timeScales
Lets Begin >:D
*/

//Load data from CSV
var dataset=[];

//Margins
var margin = {top: 20, right: 30, bottom: 20, left: 30};

//SVG size
var w = 600 - margin.left - margin.right;
var h = 400 - margin.top - margin.bottom;

var dataset, xScale, yScale;  //Empty, for now

//For converting strings to Dates
var parseTime = d3.timeParse("%m/%d/%y");

//For converting Dates to strings
var formatTime = d3.timeFormat("%b %e");

//Function for converting CSV values from strings to Dates and numbers
var rowConverter = function(d) {
  return {
    Date: parseTime(d.Date),
    Amount: parseInt(d.Amount)
  };
}

//Load in the data
d3.csv("time_scale_data.csv", rowConverter, function(data) {

  //Copy data into global dataset
  dataset = data;

  //Create scale functions
  xScale = d3.scaleTime()
           .domain([
            d3.min(dataset, function(d) { return d.Date; }),
            d3.max(dataset, function(d) { return d.Date; })
          ])
           .range([padding, w - padding]);

  yScale = d3.scaleLinear()
           .domain([
            d3.min(dataset, function(d) { return d.Amount; }),
            d3.max(dataset, function(d) { return d.Amount; })
          ])
           .range([h - padding, padding]);

  //Create SVG element
  var svg = d3.select("body")
        .append("svg")
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"

  //Generate date labels first, so they are in back
  svg.selectAll("text")
     .data(dataset)
     .enter()
     .append("text")
     .text(function(d) {
        return formatTime(d.Date);
     })
     .attr("x", function(d) {
        return xScale(d.Date) + 4;
     })
     .attr("y", function(d) {
        return yScale(d.Amount) + 4;
     })
     .attr("font-family", "sans-serif")
     .attr("font-size", "11px")
     .attr("fill", "#bbb");

  //Generate circles last, so they appear in front
  svg.selectAll("circle")
     .data(dataset)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
        return xScale(d.Date);
     })
     .attr("cy", function(d) {
        return yScale(d.Amount);
     })
     .attr("r", 2);

});
