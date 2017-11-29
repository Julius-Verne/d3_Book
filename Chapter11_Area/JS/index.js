/*
In here I'll create a basic time series viz in order to practice working with timeScales
Lets Begin >:D
*/

//Create Variables
var dataset;
var xScale, yScale;
var xAxis, yAxis;

// Create rowConverter to adapt the dataset to our needs
  var rowConverter = function(d) {
  return {
    date: new Date(+d.year, (+d.month - 1)),
    average: parseFloat(d.average)
    };
  }

  var formatTime = d3.timeFormat("%b %e");

  //Set Margins
  var margin = {top: 60, right: 60, bottom: 60, left: 60},
      w = 960 - margin.left - margin.right,
      h = 500 - margin.top - margin.bottom;

//Load CSV
  d3.csv('./mauna_loa_co2_monthly_averages.csv', rowConverter, function(data) {

    dataset = data;

    var svg = d3.select('body').append('svg')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    xScale =
    d3.scaleTime()
        .domain([
          d3.min(dataset, function (d){
          return d.date;
          }),
          d3.max(dataset, function (d) {
          return d.date;
          })
          ])
        .range([0, w]);

    yScale=
    d3.scaleLinear()
        .domain([
          d3.min(dataset, function (d) {
            if (d.average >= 0) return d.average;
          }) - 10, d3.max(dataset,function (d){
          return d.average;
        })])
        .range([h, 0]);

  //Set Axis
  xAxis=d3.axisBottom(xScale)
  xAxis.ticks(5);

  yAxis=d3.axisLeft(yScale)
  yAxis.ticks(5);


  //Draw a line
  var area = d3.area()
     .defined(function (d) {
       return d.average >= 0 && d.average <=350;
     })
    .x(function(d) { return xScale(d.date); })
    .y0(function(d) { return yScale.range()[0]; })
    .y1(function(d) { return yScale(d.average); });

    var dangerArea = d3.area()
       .defined(function (d) {
         return d.average >= 350;
       })
      .x(function(d) { return xScale(d.date); })
      .y0(function(d) { return yScale.range()[0]; })
      .y1(function(d) { return yScale(d.average); });

    svg.append('path')
      .datum(dataset)
      .attr('d', area);

      svg.append('path')
        .datum(dataset)
        .attr('class', 'danger')
        .attr('d', dangerArea);

    //Draw 350 ppm line
    svg.append("line")
      .attr("class", "line safeLevel")
      .attr("x1", 0)
      .attr("x2", w)
      .attr("y1", yScale(350))
      .attr("y2", yScale(350));


    svg.append('g')
       .attr('class', 'axis')
       .attr('transform', 'translate(0,'+( h )+' )')
       .call(xAxis);

     svg.append('g')
       .attr('class', 'axis')
       .attr('transform', 'translate( '+(0)+',0)')
       .call(yAxis);
  });




//Set Scales
