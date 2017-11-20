//Setting Variables
var dataset = [];
var size = 20;

//Random values
var maxX = 100;
var minX = 20;
var maxY = 500;
var minY = 100;

//SVG size
var w = 500;
var h = 800;

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
    .range([0,w]);

var scaleY = d3.scaleLinear()
    .domain([d3.min(dataset, function (d) {
      return d[1];
    }),d3.max(dataset, function (d) {
      return d[1];
    })
  ])
  .range([0,h]);

  //Create Scatterplot

var svg = d3.select('body')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

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
    return Math.sqrt(h-scaleY(d[1]));
  })
  .attr('fill', function(d){
    return "rgba("+255/(d[0]/6)+","+ d[1] +","+ (d[1]/8)*5 +", 1.0)";
  });
