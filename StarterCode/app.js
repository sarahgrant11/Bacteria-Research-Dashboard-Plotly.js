// Fetch the JSON data and console log it
var sampleData = d3.json("data/samples.json")

function init(){
  sampleData.then(function(data) {
    sampleNames = data.names
    // console.log(sampleNames)
    selOptions = d3.select("#selDataset");
    sampleNames.forEach(sampleid => {
      selOptions.append("option")
      .text(sampleid)
      .property("value", sampleid);
    });

    // //Set the text and value for your options data binding method
    // selOptions.selectAll("option")
    //   .data(sampleNames)
    //   .enter()
    //   .append("option")
    //   .text(function(d) {
    //       return d;
    //   })
    //   .property("value", function(d) {
    //       return d;
    //   });

    initial_id = sampleNames[0]
    console.log(initial_id)
    
    buildDemo(initial_id)
    buildBar(initial_id)
    buildBubble(initial_id)
    buildGauge(initial_id)
  });
}

init()

d3.select("#selDataset").on("change", function(){
  var newID = d3.select("#selDataset").property("value")
  console.log(newID)
  buildDemo(newID)
  buildBar(newID)
  buildBubble(newID)
  buildGauge(newID)
})

function buildDemo(id){
  sampleData.then(data =>{

  })
}

function buildBar(id){
  
};

function buildBubble(id){

};

function buildGauge(id){

};