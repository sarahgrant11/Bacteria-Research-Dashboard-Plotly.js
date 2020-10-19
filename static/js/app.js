var URL = "https://raw.githubusercontent.com/sarahgrant11/plotly-challenge/master/data/samples.json"

function init() {
    // Grab a reference to the dropdown select element
    var dropdown = d3.select("#selDataset");
    //pull all IDs from names
 
    d3.json(URL).then(function (IDs) {
        var IDs = IDs.names;
        IDs.forEach((id) => {
            dropdown
                .append("option")
                .text(id)
                .property("value", id);
        });

    //set the initial ID to the first name
    var firstID = IDs[0];
    
    //build the plots with the firstID
    buildDemos(firstID);
    buildPlots(firstID);
    });
};

//Populate the Demographic Info section based on selected ID
function buildDemos(ID) {
    d3.json(URL).then(function (data) {
    var metadata = data.metadata;
    //filter to get metadata for passed ID
    var filteredDemo = metadata.filter(metadataID => metadataID.id == ID)[0];
    //clear any previous metadata
    d3.select('#sample-metadata').html('');
    //add each key value pair from metaData
        Object.entries(filteredDemo).forEach(([key, value]) => {
            d3.select('#sample-metadata')
            .append('p').text(`${key}: ${value}`);
        });
    });
};

function buildPlots(ID) {
    d3.json(URL).then(function(plotData) {
        //filter samples data to ID for plotting
        var samplePlot = plotData.samples.filter(plotID => plotID.id == ID)[0];
        //console.log(samplePlot);
        //slice top 10 of each samples data: otu_ids, otu_labels, and sample_values
        //map otu_ids to string with OTU label
        var slice_otu_ids = samplePlot.otu_ids.slice(0, 10).map(id => `OTU${id.toString()}`);
        var slice_otu_labels = samplePlot.otu_labels.slice(0, 10);
        var slice_sample_values = samplePlot.sample_values.slice(0, 10);
        
        //BAR CHART plot
        var traceBar = {
            type: 'bar',
            x: slice_sample_values.reverse(),
            y: slice_otu_ids.reverse(),
            text: slice_otu_labels.reverse(),
            marker: {
                color: '#1978B5',
              },
            orientation: 'h'
        };

        var barData = [traceBar];

        var barLayout = {
            title: 'Top 10 Microbes (OTUs) Found',
            showlegend: false,
            width: 600,
            height: 400
        };

        Plotly.newPlot('bar', barData, barLayout);
        //console.log(barData);

        //BUBBLE CHART
        var otu_ids = samplePlot.otu_ids.slice(0, 10);
        var traceBubble = {
            type: 'bubble',
            x: otu_ids,
            y: slice_sample_values,
            mode: 'markers',
            marker: {
                color: otu_ids,
                colorscale: 'Viridis',
                size: slice_sample_values
              },
            text: slice_otu_labels
        };

        var bubbleData = [traceBubble];

        var bubbleLayout = {
            title: "Top 10 Microbes Bubble Chart",
            x: "OTU ID",
            pointStyle: "circle"
        }

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        //GAUGE CHART
        //find the wash frequency variable
        var metadata = plotData.metadata.filter(plotID => plotID.id == ID)[0];
        var washFreq = metadata.wfreq;
        console.log(washFreq);

        var traceGauge = {
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,
            title: { text: 'Bellybutton WashFrequency'},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9] },
                steps: [
                    { range: [0, washFreq], color: '#1978B5' }
                ],
                    threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                        value: washFreq
                }
            }
        };

        var gaugeData = [traceGauge];

        var gaugeLayout = {
            width: 500, height: 400, margin: { t: 0, b: 0 }
        };

        Plotly.newPlot('gauge', gaugeData, gaugeLayout);
        
    });
};

//on ID dropwdown change, rebuild plots
function optionChanged(newID) {
    //     // Fetch new data each time a new sample is selected
    buildDemos(newID);
    buildPlots(newID);
  };

//d3.select('#selDataset').on('change', {
  //buildDemos(this.value)
//})

//run init to start
init();