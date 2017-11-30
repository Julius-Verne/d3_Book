/*
In here I'll create a basic time series viz in order to practice working with timeScales
Lets Begin >:D
*/

//Create dataset
var dataset=[];

for (var i = 0; i < 5; i++) {
var num = Math.floor(Math.random()*40)+10;
dataset.push(num);
}

var pie= d3.pie();

var margin = {top:60, right: 60, bottom: 60, left: 60},
    w = 960 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;

var svg = d3.select('body').append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var outerRadius = w/2;
var innerRadius = 0;
var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
