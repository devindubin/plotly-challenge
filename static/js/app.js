function init () {
  console.log('init')

  d3.json('../data/samples.json').then(function (data) {
    console.log(data)
    var names = data.names
    var metadata = data.metadata
    var samples = data.samples
    console.log(names)

    var chosenid = d3.select('#selDataset')
    chosenid.on('change', chooseName)
    names.forEach(sampID => {
      chosenid.append('option').text(sampID).property('value', sampID)
    })

    showInfo(names[0])
    barChart(names[0])
    bubbleChart(names[0])

    function chooseName () {
      var pick = String(chosenid.node().value)
      console.log('chooseName', chosenid)
      console.log('here', pick)
      showInfo(pick)
      barChart(pick)
      bubbleChart(pick)
    }
  })
}

function showInfo (sampID) {
  console.log('showinfo')

  d3.json('../data/samples.json').then(function (data) {
    var metadata = data.metadata
    var rlist = metadata.filter(data => data.id == sampID)
    console.log(rlist[0])

    var infoslide = d3.select('#sample-metadata')
    infoslide.html('')

    Object.entries(rlist[0]).forEach(([key, value]) => {
      const displayValue = `${key}: ${value}`
      infoslide.append('p').text(displayValue)
    })
  })
};

function barChart (sampID) {
  console.log('barchart')
  d3.json('../data/samples.json').then(function (data) {
    var samples = data.samples
    var rlist = samples.filter(data => data.id == sampID)
    console.log(rlist[0])

    var indUnit = rlist[0]

    var otu_ids = indUnit.otu_ids
    var otu_labels = indUnit.otu_labels
    var sample_values = indUnit.sample_values

    var yticks = otu_ids.slice(0,5).map(otuId => `OTU ${otuId}`).reverse();

    var val = {
      type: 'bar',
      x: sample_values.slice(0,5).reverse(),
      y: yticks,
      orientation: 'h'
    }

    var layout = {
      title: 'Sample values'
    }

    Plotly.newPlot('bar', [val], layout)
  })
};

function bubbleChart (sampID) {
  console.log('bubbleChart')
  d3.json('../data/samples.json').then(function (data) {
    var samples = data.samples
    var rlist = samples.filter(data => data.id == sampID)
    console.log(rlist[0])

    var indUnit = rlist[0]

    var otu_ids = indUnit.otu_ids
    var otu_labels = indUnit.otu_labels
    var sample_values = indUnit.sample_values

    var trace = {
      mode: 'markers',
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      marker: {
        size: sample_values
      }
    };

    var layout = {
      title: 'Bubbles'
    }

    Plotly.newPlot('bubble',[trace],layout)
  })  
};
init()