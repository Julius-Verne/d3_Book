/*
In here I'll create a basic time series viz in order to practice working with timeScales
Lets Begin >:D
*/


var dataset = []

for (var i = 0; i < 20; i++) {
  var x = Math.floor((Math.random() * 400) + 50);
  var y = Math.floor((Math.random() * 400) + 20);
  dataset.push([x,y]);
};

var margin = {top: 40, right: 40, bottom: 40, left: 40},
    w = 960 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;

var xAxis,yAxis,xScale,yScale;

xScale= d3.scaleLinear()
    .domain([
      d3.min(dataset,
        function (d) {
          return d[0];
        }),
      d3.max(dataset,
        function (d) {
          return d[0];
        })])
    .range([0, w]);

yScale= d3.scaleLinear()
    .domain([
      d3.min(dataset,
        function (d) {
          return d[1];
        }),
      d3.max(dataset,
        function (d) {
          return d[1];
        })])
    .range([h, 0]);

xAxis= d3.axisBottom(xScale);
xAxis.ticks(5);
//xAxis.tickValues([0,100,500,1000]);

yAxis = d3.axisLeft(yScale);
yAxis.ticks(5);


var svg = d3.select('body').append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cy', function (d) {
    return yScale(d[1]);
  })
  .attr('cx', function (d) {
    return xScale(d[0]);
  })
  .attr('r', 2);

svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,'+ ( h ) +')')
    .call(xAxis);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate('+(0)+',0)')
  .call(yAxis);
