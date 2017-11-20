var dataset = []

for (var i = 0; i < 20; i++) {
  var x = Math.floor((Math.random() * 480) + 20);
  var y = Math.floor((Math.random() * 200) + 20);
  dataset.push([x,y]);
};

//Loading CSV
/*
  Loading CSV data

d3.csv("food.csv", function(data) {
  console.log(data);
})

////
var rowConverter = function(d){
return {
  Food: d.Food;
  Deliciousness: parseFloat(d.Deliciousness)
};
}

d3.csv("food.csv", rowConverter, function(data) {
  console.log(data);
});

*/

//Handling CSV
/*
  Handling asynchronous calls

  var dataset;
  // A global variable to hold the values from the csv

  d3.csv("food.csv", function(data) {
    if(error){

    }else{
      dataset = data;
      //Asign the received data to the global variable
      generateVis();
      hideLoadingMsg();
      //Call functions that require the data to be present
    }
  });

  var useDataLater = function() {
    //Here you can use the data you saved on the dataset variable to access the information more easily.
  }
*/

//Loading JSON
/*
d3.json("waterfallVelocities.json", function(data){
console.log(data);
})
*/

//d3.select("body").append("p").text("New Paragraph!");

//Create a very basic Bar chart using D3
/*
d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar")
      .style('height', function(d) {
        return d + "px";
      })
      .style('background-color', function(d){
        return "rgba(255,"+ d/4 +","+ (d/4)*5 +", 1.0)";
      });
*/

//Create Circles using SVG and assign attributes using D3
/*
var w = 500;
var h = 50;

var svg =
d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

var circles =
svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle');

circles.attr('cx', function(d,i) {
  return (i*50) +25;})
  .attr('cy', h/2)
  .attr('r', function(d) {
  return d;})
  .attr('fill', 'yellow')
  .attr('stroke', 'orange')
  .attr('stroke-width', function (d) {
  return d/5;
}); */

//A More advanced bar chart using D3 but that can be improved upon
/*
d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar")
      .style('height', function(d) {
        var barHeight = d * 5;
        return barHeight + "px";
      })
      .style('background-color', function(d){
        return "rgba("+255/(d/6)+","+ d +","+ (d/8)*5 +", 1.0)";
      });
*/

//The New bar chart with improvements. It uses SVG and appends info to the chart to better convey info.
/*
var w = 500;
var h = 100;
var barPadding = 1;

var svg = d3.select('body')
          .append('svg')
          .attr('width',w)
          .attr('height', h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', function(d, i) {
      return (w/dataset.length)*i;
    })
    .attr('y', function (d) {
      return h-d;
    })
    .attr('width', w/dataset.length-barPadding)
    .attr('height', function (d) {
      return d;
    })
    .attr('fill', function(d){
      return "rgba("+255/(d/6)+","+ d +","+ (d/8)*5 +", 1.0)";
    });

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
      return d;
    })
    .attr('x', function(d, i) {
      return i*(w/dataset.length)+(w/dataset.length-barPadding)/2;
    })
    .attr('y', function (d) {
      return (h-d)+14;
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle');
*/

//Scatterplot using D3

var w = 500;
var h = 200;
var barPadding = 1;

var svg = d3.select('body')
          .append('svg')
          .attr('width', w)
          .attr('height', h);

svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function(d, i) {
    console.log(d);
    return (d[0]);
  })
  .attr('cy', function (d) {
    return d[1];
  })
  .attr('r',function (d) {
    return Math.sqrt(h-d[1]);
  })
  .attr('fill', function(d){
    return "rgba("+255/(d[0]/6)+","+ d[1] +","+ (d[1]/8)*5 +", 1.0)";
  });

  svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function (d) {
      return d[0]+","+d[1];
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '10px')
    .attr('fill', 'teal')
    .attr('x', function (d) {
      return d[0]+15;
    })
    .attr('y', function (d) {
      return d[1]+5;
    })
