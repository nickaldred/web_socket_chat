

// Creates a data set for each airline
var data7 = [
    {group: "Negative", value: 0},
    {group: "Neutral", value: 0},
    {group: "Positive", value: 0}
  ];
  
  var data8 = [
    {group: "Negative", value: 0},
    {group: "Neutral", value: 0},
    {group: "Positive", value: 0}
  ];
  
  var data9 = [
    {group: "Negative", value: 0},
    {group: "Neutral", value: 0},
    {group: "Positive", value: 0}
  ];
  
  var data10 = [
    {group: "Negative", value: 0},
    {group: "Neutral", value: 0},
    {group: "Positive", value: 0}
  ];
  
  var data11 = [
    {group: "Negative", value: 0},
    {group: "Neutral", value: 0},
    {group: "Positive", value: 0}
  ];
  
  var data12 = [
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
          data7[2]['value'] = data7[2]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'neutral'){
          data7[1]['value'] = data7[1]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'negative'){
          data7[0]['value'] = data7[0]['value'] + 1
        }
  
      }
      //Checks airline then increments the sentiment rating of the corresponding data object.
      if (data[index]['airline'] == 'Delta'){
        if (data[index]['airline_sentiment'] == 'positive'){
          data8[2]['value'] = data8[2]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'neutral'){
          data8[1]['value'] = data8[1]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'negative'){
          data8[0]['value'] = data8[0]['value'] + 1
        }
  
      }
  
      //Checks airline then increments the sentiment rating of the corresponding data object.
      if (data[index]['airline'] == 'Southwest'){
        if (data[index]['airline_sentiment'] == 'positive'){
          data9[2]['value'] = data9[2]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'neutral'){
          data9[1]['value'] = data9[1]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'negative'){
          data9[0]['value'] = data9[0]['value'] + 1
        }
  
      }
      //Checks airline then increments the sentiment rating of the corresponding data object.
      if (data[index]['airline'] == 'US Airways'){
        if (data[index]['airline_sentiment'] == 'positive'){
          data10[2]['value'] = data10[2]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'neutral'){
          data10[1]['value'] = data10[1]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'negative'){
          data10[0]['value'] = data10[0]['value'] + 1
        }
  
      }
      //Checks airline then increments the sentiment rating of the corresponding data object.
      if (data[index]['airline'] == 'United'){
        if (data[index]['airline_sentiment'] == 'positive'){
        data11[2]['value'] =data11[2]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'neutral'){
        data11[1]['value'] =data11[1]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'negative'){
        data11[0]['value'] =data11[0]['value'] + 1
        }
  
      }
      //Checks airline then increments the sentiment rating of the corresponding data object.
      if (data[index]['airline'] == 'Virgin America'){
        if (data[index]['airline_sentiment'] == 'positive'){
          data12[2]['value'] = data12[2]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'neutral'){
          data12[1]['value'] = data12[1]['value'] + 1
        }
        else if (data[index]['airline_sentiment'] == 'negative'){
          data12[0]['value'] = data12[0]['value'] + 1
        }
  
      }
  
    }
  
  
  })
  
  
  // set the dimensions and margins of the graph
  var margin = {top: 30, right: 30, bottom: 70, left: 60},
      width = 621 - margin.left - margin.right,
      height = 540 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  var svg3 = d3.select("#airline_barchart2")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
  // X axis
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data7.map(function(d) { return d.group; }))
    .padding(0.2);
  svg3.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
  //Add X axis label
  svg3.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 330)
    .attr("y", 495)
    .text("Tweet Sentiment");
  
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 35])
    .range([ height, 0]);
  svg3.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));
  //Add Y axis label
  svg3.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -60)
    .attr("x", -160)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Number of tweets");
    
    
  
  // A function that create / update the plot for a given variable:
  function update2(data) {
  
    var u = svg3.selectAll("rect")
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
    d3.select('#tooltip2')
      .select('#value').text(d.value)
    
    //Reveal tooltip
    d3.select('#tooltip2').classed('hidden', false);
  
  
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
    d3.select('#tooltip2').classed('hidden', true);
  
    d3.select(this).attr("fill", "#3cd0ff")
    d3.select(this)
      .transition() //add animation
      .duration(300)
      .attr('width', x.bandwidth())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value) - 10; })
  
  
  
  }
  
  
  
  
  // Initialize the plot with the first dataset
  update(data7)
  
  