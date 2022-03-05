data_pie = {AA: 0, DA:0, SA:0, USA:0, UA:0, VA:0}

//Read the CSV file into D3
d3.csv("/static/data/Kaggle_TwitterUSAirlineSentiment.csv", function(error, data) {
  if (error) throw error;

//Iterate over each object of the data array created
  for (index = 0; index < data.length; index++) {

    //Checks airline then increments the sentiment rating of the corresponding data object.
    if (data[index]['airline'] == 'American'){
        data_pie['AA'] = data_pie['AA'] + 1
    }
    else if (data[index]['airline'] == 'Delta'){
        data_pie['DA'] = data_pie['DA'] + 1

    }
    else if (data[index]['airline'] == 'Southwest'){
      data_pie['SA'] = data_pie['SA'] + 1

  }
    else if (data[index]['airline'] == 'US Airways'){
      data_pie['USA'] = data_pie['USA'] + 1

}
    else if (data[index]['airline'] == 'United'){
      data_pie['UA'] = data_pie['UA'] + 1

    }

    else if (data[index]['airline'] == 'Virgin America'){
      data_pie['VA'] = data_pie['VA'] + 1

    }
  }

  create_piechart(data_pie)
})
function create_piechart(data_pie){


// set the dimensions and margins of the graph
var width = 450
    height = 450
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg2 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
//var data = {a: 9, b: 20, c:30, d:8, e:12}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data_pie)
  .range(["#f6511d", "#ffb400", "#00A6ED", "#7FB800", "#0d2c54", "#80AD77"])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data_pie))
// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.

var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)
svg2
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)         // This is the size of the donut hole
    .outerRadius(radius)
  )
  .on("mouseover", onMouseOver2) // Add listener for event
  .on("mouseout", onMouseOut2)
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

  // Now add the annotation. Use the centroid method to get the best coordinates
svg2
.selectAll('mySlices')
.data(data_ready)
.enter()
.append('text')
.text(function(d){ return "Grp " + d.data.key})
.attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
.style("text-anchor", "middle")
.style("font-size", 17)

}


function onMouseOver2(d, i) {
  // Get bars xy values, then augment for the tooltip
  var xPos = 150;
  var yPos = 250 ;

  //Update Tooltip's posistion and value
  d3.select('#tooltip3')
    .select('#airline_name').text(return__airline(d))


  d3.select('#tooltip3')
    .select('#tweets').text(d.value)

  d3.select('#tooltip3')
    .select('#percent').text((d.value / 200 )* 100)

  
  
  //Reveal tooltip
  d3.select('#tooltip3').classed('hidden', false);


  
  d3.select(this)
    .attr("stroke","white")
    .transition()
    .duration(1000)            
    .attr("stroke-width","10px")
}

function onMouseOut2(d, i) {
  //Hide tooldtip
  d3.select('#tooltip3').classed('hidden', true);

  d3.select(this)
    .transition() //add animation
    .duration(300)
    .attr("stroke", "black")
    .style("stroke-width", "2px")



}

function return__airline(d) {

  if (d.data.key == "AA") {
    return("American Airlines")
  }
  else if (d.data.key == "DA") {
    return("Delta Airlines") 
    }

  else if (d.data.key == "SA") {
    return("Southwest Airlines") 
    }
  else if (d.data.key == "USA") {
    return("US Airways") 
    }
  else if (d.data.key == "UA") {
    return("United Airlines") 
    }
  else if (d.data.key == "VA") {
    return("Virgin America") 
    }
  
}