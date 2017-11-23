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

d3.csv("../time_scale_data.csv", function(d) {

  rowConverter(d);
  console()
  dataset=d;
  for (var i = 0; i < dataset.length; i++) {
    rowConverter(dataset[i]);
}
});

var rowConverter = function (d) {
  console.log(d);
  return {
    Date: parseTime(d.Date),
    Amount: parseInt(d.Amount)
  };
};

var parseTime = d3.timeParse("%m/%d/%y");

var xScale=
d3.scaleTime()
    .domain([d3.min(dataset, function (d) {
      return d.Date;
    }), d3.max(dataset, function (d) {
      return d.Amount;
    }) ])
    .range([0 , w]);
