function buildMetadata(sample) {

    var url=`/metadata/${sample}`
    d3.json(url).then (function(data) {
      console.log(data);
  
      var selector = d3.select("#sample-metadata");
      selector.html("");
      Object.entries(data).forEach(([key,value]) => {
        selector.append("ul").append("li").text(`${value}`);
      });

    });
  }
  
  function buildCharts(sample) {
    // radial chart
    var url=`/${sample}`;
    d3.select('#bar').html('');
    if (sample =='overall') { 
        radial_chart();
      
      }
    
    else { 
     
      d3.json(url).then (function(data) {
        console.log(data); 
        trace = {
          "x": data["name"].slice(0,10),
          "y": data["count"].slice(0,10),
          "type": "bar"
      }
        var bar_data = [trace];
        var layout = { margin: { t: 30, b: 100 } };
        Plotly.newPlot("bar", bar_data, layout);
      });}     
  }; 
       
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    sampleNames=['overall','1970s','1980s','1990s','2000s','2010s']//,'map'
    // Use the list of sample names to populate the select options
    
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
        });

     // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    };
    

  function optionChanged(newSample) {
    
      buildCharts(newSample);
      buildMetadata(newSample);
    };
  
  // Initialize the dashboard
  init();
  