var dataset = []

for (var i = 0; i < 20; i++) {
  dataset.push(Math.floor((Math.random() * 100) + 5));
}

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

//A More advanced bar chart using D3



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
