//Setting Variables
var dataset = [];
var size = 10;

//Random values
var maxX = 100;
var minX = 20;
var maxY = 100;
var minY = 50;


//Gives a margin to avoid clipping elements
//Created following Mike Bostock margin conventions
//Used on ScaleX and scaleY
var margin = {top: 20, right: 30, bottom: 20, left: 30};

//SVG size
var w = 600 - margin.left - margin.right;
var h = 400 - margin.top - margin.bottom;


//Populating dataset array
for (var i = 0; i < size; i++) {
x = Math.floor((Math.random() * (maxX-minX)) + minX);
y = Math.floor((Math.random() * (maxY-minY)) + minY);
dataset.push([x,y]);
}


//Create X and Y scales in order to make the data fit in every situation
var scaleX = d3.scaleLinear()
    .domain([d3.min(dataset, function (d) {
      return d[0];
    }),d3.max(dataset, function (d) {
      return d[0];
    })
  ])
    .rangeRound([0, w])
    .nice();

var scaleY = d3.scaleLinear()
    .domain([d3.min(dataset, function (d) {
      return d[1];
    }),d3.max(dataset, function (d) {
      return d[1];
    })
  ])
  .rangeRound([h, 0])
  .nice();

//A custom scale for the radius of the circles
/*
var rScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function (d) {
      return d[1];
    })
   ])
    .rangeRound([3, 20])
    .nice();
*/
var aScale = d3.scaleSqrt()
            .domain([0, d3.max(dataset, function (d) {
              return d[1];
            })])
            .range([3, 12]);


//Create Scatterplot

//Create SVG with margins
var svg = d3.select('body')
        .append('svg')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Create Circles
svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function (d) {
    return scaleX(d[0]);
  })
  .attr('cy', function (d) {
    return scaleY(d[1]);
  })
  .attr('r', function (d) {
    return aScale(d[1]);
  })
  .attr('fill', function(d){
    return "rgba("+255/(d[0]/6)+","+ d[1] +","+ (d[1]/8)*5 +", 1.0)";
  });

//Add text labels to circles
svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function (d) {
  return d[0]+", "+d[1];
  })
  .attr('x', function (d) {
    return scaleX(d[0]);
  })
  .attr('y', function (d) {
    return scaleY(d[1]);
  })
  .attr('font-family', 'sans-serif')
  .attr('font-size', '10px')
  .attr('fill', 'teal');
