var dataset = [1,2,5,7,4,14];
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

d3.select("body").selectAll("p")
      .data(dataset)
      .enter()
      .append("p")
      .text(function(d) { return d;})
      .style("color", function(d){
        if(d > 6){
          return "red";
        } else {
          return "blue";
        }
      });
