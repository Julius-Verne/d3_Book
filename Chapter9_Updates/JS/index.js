/*
In here I'll create a basic time series viz in order to practice working with timeScales
Lets Begin >:D
*/



var dataset = []

for (var i = 0; i < 30; i++) {
  var num = Math.floor((Math.random() * 400) + 50);
  dataset.push(num);
};

var margin = {top: 40, right: 40, bottom: 40, left: 40},
    w = 960 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;

var xAxis,yAxis,xScale,yScale;

yScale= d3.scaleLinear()
    .domain([
      d3.min(dataset,
        function (d) {
          return d - 20;
        }),
      d3.max(dataset,
        function (d) {
          return d;
        })])
    .range([0,h]);

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

//xAxis= d3.axisBottom(xScale);
//xAxis.ticks(5);
//xAxis.tickValues([0,100,500,1000]);

yAxis = d3.axisLeft(yScale);
yAxis.ticks(5);


var svg = d3.select('body').append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('y', function (d) {
    return h-yScale(d);
  })
  .attr('x', function (d, i) {
    return xScale(i);
  })
  .attr('width', xScale.bandwidth())
  .attr('height', function (d) {
    return yScale(d)+5;
  })
  .attr('class', 'bar')

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function (d) {
      return Math.round(yScale(d));
    })
    .attr('x', function (d, i) {
      return xScale(i) + (xScale.bandwidth()/2);
    })
    .attr('y', function (d) {
      return (h-yScale(d))+15;
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '10px')
    .attr('fill', '#fafafa')
    .attr('text-anchor', 'middle');

/*
svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,'+ ( h ) +')')
    .call(xAxis);
*/
svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate('+(0)+',0)')
  .call(yAxis);


d3.select('p')
  .on('click', function () {

    dataset.splice(0,dataset.length);
    for (var i = 0; i < 30; i++) {
      var num = Math.floor((Math.random() * 400) + 50);
      dataset.push(num);
    };

    svg.selectAll('rect')
      .data(dataset)
      .transition()
      .delay(function (d,i) {
        return i/dataset.length * 1000;
      })
      .duration(1000)
      .ease(d3.easeElasticOut)
      .attr('y', function (d) {
        return h-yScale(d);
      })
      .attr('x', function (d, i) {
        return xScale(i);
      })
      .attr('width', xScale.bandwidth())
      .attr('height', function (d) {
        return yScale(d)+5;
      })

      svg.selectAll('text')
      .data(dataset)
      .transition()
      .delay(function (d,i) {
        return i/dataset.length * 1000;
      })
      .duration(1000)
      .ease(d3.easeElasticOut)
      .text(function (d) {
        return Math.round(yScale(d));
      })
      .attr('x', function (d, i) {
        return xScale(i) + (xScale.bandwidth()/2);
      })
      .attr('y', function (d) {
        return (h-yScale(d))+15;
      })

  });