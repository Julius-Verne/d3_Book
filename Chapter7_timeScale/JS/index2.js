/*
In here I'll create a basic time series viz in order to practice working with timeScales
Lets Begin >:D
*/

//Load data from CSV
var dataset;

//Margins
var margin = {top: 20, right: 30, bottom: 20, left: 30},
  w = 600 - margin.left - margin.right,
  h = 400 - margin.top - margin.bottom;

//Empty Variables
var xScale;
var yScale;

//Turns string into Dates
var parseTime = d3.timeParse("%m/%d/%y");

//Turns dates into string
var formatTime = d3.timeFormat("%b %e");

//Converts values to the desired type
var rowConverter = function (d) {
  return {
    Date: parseTime(d.Date),
    Amount: parseInt(d.Amount)
  };
}


d3.csv("time_scale_data.csv", rowConverter, function(data) {

  dataset=data;
  console.log(dataset);
  xScale = d3.scaleTime()
      .domain([
          d3.min(dataset, function (d) { return d.Date; }) ,
          d3.max(dataset, function (d) { return d.Date; })])
      .range([0, w]);

  yScale = d3.scaleLinear()
      .domain([
          d3.min(dataset, function (d) { return d.Amount; }) ,
          d3.max(dataset, function (d) { return d.Amount; })])
      .range([ h, 0]);


    var svg = d3.select('body').append('svg')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      svg.selectAll('text')
          .data(dataset)
          .enter()
          .text(function (d) {
            console.log("text:", formatTime(d.Date));
            return formatTime(d.Date);
          })
          .attr("x", function(d) {

             return xScale(d.Date) + 4;
          })
          .attr("y", function(d) {
             return yScale(d.Amount) + 4;
          })
          .attr('font-family', 'sans-serif')
          .attr('font-size', '10px')
          .attr('fill', '#bbb');

      svg.selectAll("circle")
          .data(dataset)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
            console.log("HAALP");
            return xScale(d.Date);
         })
         .attr("cy", function(d) {
            return yScale(d.Amount);
          })
          .attr("r", 2);


});
