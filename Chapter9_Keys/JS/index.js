/*
In here I'll create a basic time series viz in order to practice working with timeScales
Lets Begin >:D
*/


var dataset = [ { key: 0, value: 5 },		//dataset is now an array of objects.
        { key: 1, value: 10 },		//Each object has a 'key' and a 'value'.
        { key: 2, value: 13 },
        { key: 3, value: 19 },
        { key: 4, value: 21 },
        { key: 5, value: 25 },
        { key: 6, value: 22 },
        { key: 7, value: 18 },
        { key: 8, value: 15 },
        { key: 9, value: 13 },
        { key: 10, value: 11 },
        { key: 11, value: 12 },
        { key: 12, value: 15 },
        { key: 13, value: 20 },
        { key: 14, value: 18 },
        { key: 15, value: 17 },
        { key: 16, value: 16 },
        { key: 17, value: 18 },
        { key: 18, value: 23 },
        { key: 19, value: 25 } ];

var margin = {top: 40, right: 40, bottom: 40, left: 40},
    w = 960 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;

var xAxis,yAxis,xScale,yScale;

yScale= d3.scaleLinear()
    .domain([
        0,
      d3.max(dataset,
        function (d) {
          return d.value+25;
        })])
    .range([h, 0]);

xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var key = function (d) {
  return d.key;
};

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
  .data(dataset, key)
  .enter()
  .append('rect')
  .attr('y', function (d) {
    return yScale(d.value);
  })
  .attr('x', function (d, i) {
    return xScale(i);
  })
  .attr('width', xScale.bandwidth())
  .attr('height', function (d) {
    return h-yScale(d.value)+5;
  })
  .attr('class', 'bar')
  .attr('fill-opacity', '1');

svg.selectAll('text')
    .data(dataset, key)
    .enter()
    .append('text')
    .text(function (d) {
      return d.value;
    })
    .attr('x', function (d, i) {
      return xScale(i) + (xScale.bandwidth()/2);
    })
    .attr('y', function (d) {
      return yScale(d.value)+15;
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '10px')
    .attr('fill', '#fafafa')
    .attr('text-anchor', 'middle')
    .attr('class', 'bar_txt');

  svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate('+(0)+',0)')
  .call(yAxis);


//THIS BUTTON DELETES AN ELEMENT AND A LABEL EVERYTIME ITS CLICKED
 d3.selectAll('button')
   .on('click', function () {

     var btnID = d3.select(this).attr('id');
     console.log(btnID);

     if (btnID == "addBtn") {
       var lastKeyValue = dataset[dataset.length - 1].key;
       var newBar = Math.floor((Math.random() * 15) + 10);
       dataset.push({
         key: lastKeyValue+1 ,
         value: newBar
       });

     } else {

       dataset.shift();

     }

     xScale.domain(d3.range(dataset.length));
     yScale.domain([0, d3.max(dataset, function (d) {
       return d.value+25;
     })]);

/////////////////////

     var bars = svg.selectAll('rect').data(dataset, key);

     bars.enter()
     .append('rect')
     .attr('y', function (d) {
       return yScale(d.value);
     })
     .attr('x', function (d) {
       return w + margin.right;
     })
     .attr('width', xScale.bandwidth())
     .attr('height', function (d) {
       return h-yScale(d.value)+5;
     })
     .attr('class', 'bar')
     .merge(bars)
    .transition()
    .duration(1000)
    .attr('y', function (d) {
      return yScale(d.value);
    })
    .attr('x', function (d, i) {
      return xScale(i);
    })
    .attr('width', xScale.bandwidth())
    .attr('height', function (d) {
      return h-yScale(d.value)+5;
    });

    bars.exit()
    .transition()
    .duration(500)
    .attr('x', -xScale.bandwidth())
    .attr('fill-opacity', '0')
    .remove();

//////////////////////

    var txt = svg.selectAll('.bar_txt').data(dataset, key);

    txt.enter()
    .append('text')
    .text(function (d) {
      return d.value;
    })
    .attr('x', function (d, i) {
      return w + (xScale.bandwidth()/2);
    })
    .attr('y', function (d) {
      return (h-yScale(d.value))+15;
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '10px')
    .attr('fill', '#fafafa')
    .attr('text-anchor', 'middle')
    .attr('class', 'bar_txt')
   .merge(txt)
    .transition()
    .duration(1000)
    .text(function (d) {
      return d.value;
    })
    .attr('x', function (d, i) {
      return xScale(i) + (xScale.bandwidth()/2);
    })
    .attr('y', function (d) {
      return yScale(d.value)+15;
    });

    txt.exit()
    .remove();

    svg.select('.y-axis')
    .transition()
    .duration(1000)
    .call(yAxis);

  });
