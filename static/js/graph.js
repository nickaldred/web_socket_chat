

// Creates a data set for each airline
var data1 = [
  {group: "Negative", value: 0},
  {group: "Neutral", value: 0},
  {group: "Positive", value: 0}
];

var data2 = [
  {group: "Negative", value: 0},
  {group: "Neutral", value: 0},
  {group: "Positive", value: 0}
];

var data3 = [
  {group: "Negative", value: 0},
  {group: "Neutral", value: 0},
  {group: "Positive", value: 0}
];

var data4 = [
  {group: "Negative", value: 0},
  {group: "Neutral", value: 0},
  {group: "Positive", value: 0}
];

var data5 = [
  {group: "Negative", value: 0},
  {group: "Neutral", value: 0},
  {group: "Positive", value: 0}
];

var data6 = [
  {group: "Negative", value: 0},
  {group: "Neutral", value: 0},
  {group: "Positive", value: 0}
];

//Read the CSV file into D3
d3.csv("/static/data/Kaggle_TwitterUSAirlineSentiment.csv", function(error, data) {
  if (error) throw error;

//Iterate over each object of the data array created
  for (index = 0; index < data.length; index++) {

    //Checks airline then increments the sentiment rating of the corresponding data object.
    if (data[index]['airline'] == 'American'){
      if (data[index]['airline_sentiment'] == 'positive'){
        data1[2]['value'] = data1[2]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'neutral'){
        data1[1]['value'] = data1[1]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'negative'){
        data1[0]['value'] = data1[0]['value'] + 1
      }

    }
    //Checks airline then increments the sentiment rating of the corresponding data object.
    if (data[index]['airline'] == 'Delta'){
      if (data[index]['airline_sentiment'] == 'positive'){
        data2[2]['value'] = data2[2]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'neutral'){
        data2[1]['value'] = data2[1]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'negative'){
        data2[0]['value'] = data2[0]['value'] + 1
      }

    }

    //Checks airline then increments the sentiment rating of the corresponding data object.
    if (data[index]['airline'] == 'Southwest'){
      if (data[index]['airline_sentiment'] == 'positive'){
        data3[2]['value'] = data3[2]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'neutral'){
        data3[1]['value'] = data3[1]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'negative'){
        data3[0]['value'] = data3[0]['value'] + 1
      }

    }
    //Checks airline then increments the sentiment rating of the corresponding data object.
    if (data[index]['airline'] == 'US Airways'){
      if (data[index]['airline_sentiment'] == 'positive'){
        data4[2]['value'] = data4[2]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'neutral'){
        data4[1]['value'] = data4[1]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'negative'){
        data4[0]['value'] = data4[0]['value'] + 1
      }

    }
    //Checks airline then increments the sentiment rating of the corresponding data object.
    if (data[index]['airline'] == 'United'){
      if (data[index]['airline_sentiment'] == 'positive'){
        data5[2]['value'] = data5[2]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'neutral'){
        data5[1]['value'] = data5[1]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'negative'){
        data5[0]['value'] = data5[0]['value'] + 1
      }

    }
    //Checks airline then increments the sentiment rating of the corresponding data object.
    if (data[index]['airline'] == 'Virgin America'){
      if (data[index]['airline_sentiment'] == 'positive'){
        data6[2]['value'] = data6[2]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'neutral'){
        data6[1]['value'] = data6[1]['value'] + 1
      }
      else if (data[index]['airline_sentiment'] == 'negative'){
        data6[0]['value'] = data6[0]['value'] + 1
      }

    }

  }


})


// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 621 - margin.left - margin.right,
    height = 540 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#airline_barchart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data1.map(function(d) { return d.group; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
//Add X axis label
svg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", 330)
  .attr("y", 495)
  .text("Tweet Sentiment");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 35])
  .range([ height, 0]);
svg.append("g")
  .attr("class", "myYaxis")
  .call(d3.axisLeft(y));
//Add Y axis label
svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -60)
  .attr("x", -160)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("Number of tweets");
  
  

// A function that create / update the plot for a given variable:
function update(data) {

  var u = svg.selectAll("rect")
    .data(data)

  u
    .enter()
    .append("rect")
    .attr("class", "bar")
    .on("mouseover", onMouseOver) // Add listener for event
    .on("mouseout", onMouseOut)
    .merge(u)
    .transition()
    .duration(1000)
      .attr("x", function(d) { return x(d.group); })
      .attr("y", function(d) { return y(d.value) - 10; })

      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "#3cd0ff")
}

//MouseOver event handler

function onMouseOver(d, i) {
  // Get bars xy values, then augment for the tooltip


  //Update Tooltip's posistion and value
  d3.select('#tooltip')

    .select('#value').text(d.value)
  
  //Reveal tooltip
  d3.select('#tooltip').classed('hidden', false);


  d3.select(this).attr("fill", "orange")
  d3.select(this)
    .transition() //add animation
    .duration(300)
    .attr('width', x.bandwidth() + 5)
    .attr("y", function(d) { return y(d.value) - 20; })
    .attr("height", function(d) { return height - y(d.value) + 10; })



}

function onMouseOut(d, i) {
  //Hide tooldtip
  d3.select('#tooltip').classed('hidden', true);

  d3.select(this).attr("fill", "#3cd0ff")
  d3.select(this)
    .transition() //add animation
    .duration(300)
    .attr('width', x.bandwidth())
    .attr("y", function(d) { return y(d.value)-10; })
    .attr("height", function(d) { return height - y(d.value); })



}




// Initialize the plot with the first dataset
update(data1)

