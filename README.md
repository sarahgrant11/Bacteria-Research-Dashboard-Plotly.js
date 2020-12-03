# A Naval-Gazing Investigation of Bacteria in the Belly Button

![Bacteria by filterforge.com](Images/bacteria.jpg)

## Object 

According to findings by North Carolina State University's Public Science Lab, a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare. To better understand and explore this dataset, I built an interactive dashboard that catalogs the microbes that colonize human navels. 

## Data Set

[Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/) 
Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable.

## Visualizations Using D3, Plotly

* Used the D3 library to read in `samples.json`.
* Created a horizontal bar chart with a dropdown menu to display the Top 10 OTUs found in a given individual.
* Created a bubble chart that displays each sample.
* Displayed the sample metadata (demographic information).
* Displayed each key-value pair from the metadata JSON object on the page.
* Adapted the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of chosen individual (values ranging from 0 through 9 times). And made sure the chart updates whenever a new individual (sample) is selected. 


