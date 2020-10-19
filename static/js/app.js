// Set the URL to import the json data 
const url = "https://raw.githubusercontent.com/sarahgrant11/plotly-challenge/master/data/samples.json";

function getPlots(id) {
// Get all plots for a particular ID

d3.json("https://raw.githubusercontent.com/sarahgrant11/plotly-challenge/master/data/samples.json").then(function(data){
    console.log(data)
    var filter_data = data.samples.filter(sample => sample.id.toString()===id)[0]
    var ids = filter_data.otu_ids;
    console.log(ids)
    var samplevalues = filter_data.sample_values.slice(0,10).reverse();
    console.log(samplevalues)
    var otulabels = filter_data.otu_labels.slice(0,10);
    console.log(otulabels)
    var otu_top = (filter_data.otu_ids.slice(0,10)).reverse();
    console.log(otu_top)
    
    var otu_id = otu_top.map(d => "otu" + d);
    console.log(`OTU IDS: ${otu_id}`)
    var otulabels = filter_data.otu_labels.slice(0,10);
    console.log(`OTU Labels: ${otulabels}`)
    
    
    var trace = {
        x: samplevalues,
        y: otu_id,
        hovertemplate: otulabels,
        marker: {
        color: 'blue'},
        type: "bar",
        orientation: "h",
    };

    var data_trace1 = [trace];

   
    var layout ={
        title: "Top 10 OTU",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 40

        }
    };
    Plotly.newPlot("bar", data_trace1, layout);

    console.log("Before bubble");
    console.log(data.samples);
    var trace1 = {
        x: filter_data.otu_ids,
        y: filter_data.sample_values,
        mode: "markers",
        marker: {
            size: filter_data.sample_values,
            color: filter_data.otu_ids
        },
        text: filter_data.otu_labels
    };

    var layout2 = {
        xaxis:{title:"OTU ID"},
        height: 500,
        width: 1000
    };

    var data1 = [trace1];

    Plotly.newPlot("bubble", data1,layout2);

});

}

function getdempographicsInfo(id){
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)

        var results = metadata.filter(meta => meta.id.toString()===id)[0];
        console.log(results);
        var demoInfo = d3.select("#sample-metadata");

        demoInfo.html("");

        Object.entries(results).forEach((key)=> {
            demoInfo.append("h5").text(key[0].toUpperCase() + ":" + key[1] + "\n");
        });
    });
}

function optionChanged(id) {
    getPlots(id);
    getdempographicsInfo(id);
    // gaugeChart(id)
}

function init()
{
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) { 
            dropdown.append("option").text(name).property("value");
        });

        getPlots(data.names[0]);
        getdempographicsInfo(data.names[0]);
    });
}

init();