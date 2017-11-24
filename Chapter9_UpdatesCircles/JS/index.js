/*
In here I'll create a basic time series viz in order to practice working with timeScales
Lets Begin >:D
*/


  var dataset = []

  for (var i = 0; i < 30; i++) {
    var x = Math.floor((Math.random() * 400) + 50);
    var y = Math.floor((Math.random() * 200) + 50);
    dataset.push([x,y]);
  };

  var margin = {top: 40, right: 40, bottom: 40, left: 40},
      w = 960 - margin.left - margin.right,
      h = 500 - margin.top - margin.bottom;

  var xAxis,yAxis,xScale,yScale;
  var scaleMargin = 50;

  yScale= d3.scaleLinear()
      .domain([
        0 ,
        d3.max(dataset,
          function (d) {
            return d[1] + scaleMargin;
          })])
      .range([h,0]);

  xScale= d3.scaleLinear()
      .domain([
        0,
        d3.max(dataset,
          function (d) {
            return d[0] + scaleMargin;
          })])
      .range([0, w]);

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


  svg.append('g')
    .attr('id', 'circles')
    .attr('clip-path', 'url(#chart-area)')
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cy', function (d) {
      return yScale(d[1]);
    })
    .attr('cx', function (d) {
      return xScale(d[0]);
    })
    .attr('r', 4)
    .attr('class', 'bar');

    svg.append('clipPath')
      .attr('id', 'chart-area')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', w)
      .attr('height', h);

  /*
  svg.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(function (d) {
        return Math.round(yScale(d));
      })
      .attr('x', function (d) {
        return xScale(d[0]);
      })
      .attr('y', function (d) {
        return yScale(d[1]);
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('fill', '#fafafa')
      .attr('text-anchor', 'middle');
  */

  svg.append('g')
      //.attr('class', 'axis')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,'+ ( h ) +')')
      .call(xAxis);

  svg.append('g')
    //.attr('class', 'axis')
    .attr('class', 'y-axis')
    .attr('transform', 'translate('+(0)+',0)')
    .call(yAxis);


  d3.select('p')
    .on('click', function () {

      dataset.splice(0,dataset.length);
      for (var i = 0; i < 30; i++) {
        var num = Math.floor((Math.random() * 1000) + 200)
        var x = Math.floor((Math.random() * num) + 50);
        var y = Math.floor((Math.random() * num) + 50);
        dataset.push([x,y]);
      };

      xScale.domain([0, d3.max(dataset, function (d) {
        return d[0] + scaleMargin;
      })]);
      yScale.domain([0, d3.max(dataset, function (d) {
        return d[1] +scaleMargin;
      })]);

      svg.selectAll('circle')
        .data(dataset)
        .transition()
        .delay(function (d,i) {
          return i/dataset.length * 500;
        })
        .duration(1000)
        .on('start',function () {
            d3.select(this)
              .attr('fill','teal')
              .attr('r', 10);
        })
        .on('end',function () {
          d3.select(this)
          .transition()
          .duration(500)
          .attr('fill', '#d42aa8')
          .attr('r', '5');
        })
        .attr('cy', function (d) {
          return yScale(d[1]);
        })
        .attr('cx', function (d) {
          return xScale(d[0]);
        });

        svg.select('.x-axis')
        .transition()
        .duration(1000)
        .call(xAxis);

        svg.select('.y-axis')
        .transition()
        .duration(1000)
        .call(yAxis);


  /*
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
        })*/

    });
