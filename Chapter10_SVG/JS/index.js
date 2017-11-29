/*
In here I'll create a basic time series viz in order to practice working with timeScales
Lets Begin >:D
*/


  var dataset = []

  for (var i = 0; i < 20; i++) {
    var x = Math.floor((Math.random() * 400) + 50);
    var y = Math.floor((Math.random() * 200) + 50);
    dataset.push(
      {
        x: x,
        y: y,
        key: dataset.length
      });
  };

//Create the key function
var key = function (d) {
  return d.key;
};

var sortOrder = false;

//Create the margin and the viz measurements
  var margin = {top: 60, right: 60, bottom: 60, left: 60},
      w = 960 - margin.left - margin.right,
      h = 500 - margin.top - margin.bottom;

  var svg = d3.select('body').append('svg')
      .attr('width', w + margin.left + margin.right)
      .attr('height', h + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Create the scales that the viz is going to use
  var xAxis, yAxis, xScale, yScale;

  xScale = d3.scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, w])
      .paddingInner(0.05);

  yScale = d3.scaleLinear()
      .domain([0,d3.max(dataset, function (d) {
        return d.y +20;
      })])
      .range([h, 0]);

  yAxis = d3.axisLeft(yScale);
  yAxis.ticks(5);


//Create rect for the scatterplot
  svg.selectAll('rect')
  .data(dataset, key)
  .enter()
  .append('rect')
  .attr('y', function (d) {
    return yScale(d.y);
  })
  .attr('x', function (d,i) {
    return xScale(i);
  })
  .attr('width', xScale.bandwidth())
  .attr('height', function (d) {
    return h-yScale(d.y)+5;
  })
  .attr('class', 'bar')
  .on('mouseover', function (d) {
    var xPos =
    parseFloat(d3.select(this).attr('x')) +
    xScale.bandwidth() / 2;
    var yPos =
    parseFloat(d3.select(this).attr('y')) +
    14;
    console.log(xPos + " : "+ yPos);
    svg.append('text')
    .attr('id', "tooltip")
    .attr('x', xPos)
    .attr('y', yPos)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('font-size', "12px")
    .attr('font-weight', 'bold')
    .text(d.y);
  })
  .on('mouseout', function () {
    d3.select('#tooltip').remove();
  })
  .on('click', function () {
    console.log("enter");
    sortBars();
  });

  //Create Axis
  svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0,'+ 0 + ')')
  .call(yAxis);


///Funtions
var sortBars = function() {

sortOrder = !sortOrder;

svg.selectAll('rect')
  .sort(function(a, b) {
    if (sortOrder) {
      return d3.ascending(a.y, b.y);
    } else {
      return d3.descending(a.y, b.y);
    }
  })
  .transition("Sort")
  .delay(function (d, i) {
    return 20*i;
  })
  .duration(500)
  .attr('x', function (d, i) {
  return xScale(i);
  });

};
