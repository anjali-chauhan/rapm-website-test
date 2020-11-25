
// Create DC charts and bind them to the previously created containers
var testPieChart = new dc.PieChart("#pieChart");
var dateFreqChart = dc.barChart("#dateFreq");
var pubFromCitiesChart = dc.rowChart('#cityRowChart');
var genreChart = dc.rowChart('#genreRowChart');
var affiliationChart = dc.rowChart('#affiliationChart');
var genderChart = dc.pieChart('#genderChart');
var languageChart = dc.pieChart('#languageChart');
var sourceGenreChart = dc.pieChart('#sourceGenreChart');

// Main function for loading data into previously defined charts
d3.json("data/music.json").then(function(data) {
  var ndx = crossfilter(data);
  var all = ndx.groupAll();

  // Define Dimensions (you can think of these as the X axis) for charts, one per chart.
  // There are two dataDim objects because it seems that charts to not like to share, which would
  // make sense when interactive filtering is involed. The simplest solution would be to just have
  // exclusive Dimensions & Groups for each chart.
  var dateDim = ndx.dimension(d => {return d.date});
  var dateDim2 = ndx.dimension(d => {return d.date});
  var cityDim = ndx.dimension(d => {return d.pub_city});
  var genreDim = ndx.dimension(d => {return d.genre});
  var affiliationDim = ndx.dimension(d => {return d.affiliation});
  var genderDim = ndx.dimension(d => {return d.gender});
  var languageDim = ndx.dimension(d => {return d.language});
  var sourceGenreDim = ndx.dimension(d => {return d.source_genre});

  // Define Groups for each chart, counts the Frequency of the aforementioned Dimensions (Y axis)
  var dateTypeGroup = dateDim.group();
  var dateTypeGroup2 = dateDim2.group();
  var cityGroup = cityDim.group();
  var genreGroup = genreDim.group();
  var affiliationGroup = affiliationDim.group();
  var genderGroup = genderDim.group();
  var languageGroup = languageDim.group();
  var sourceGenreGroup = sourceGenreDim.group();

  // Not visible in dashboard, more for experimentation purposes
  testPieChart
    .width(500)
    .height(360)
    .slicesCap(15)
    .innerRadius(50)
    .externalLabels(50)
    .externalRadiusPadding(50)
    .drawPaths(true)
    //.x(d3.scaleLinear().domain([1970,2020]))
    //.brushOn(false)
    //.yAxisLabel("Frequency")
    .dimension(dateDim)
    .group(dateTypeGroup)
    .legend(dc.legend())
    //.controlsUseVisibility(true)
    testPieChart
    .on('pretransition', function(chart) {
      chart.selectAll('.dc-lengend-item text')
        .text('')
        .append('tspan')
        .text(function(d) {return d.name})
        .append('tspan')
        .attr('x', 100)
        .attr('text-anchor', 'end')
        .text(function(d) {return d.data});
    });

    // Bar chart that shows how many papers there are each year
    // elasticX shrinks and expands the X axis as a user filters through the dashboard
    // d.top(x) returns the top x items in the list, which is updated as the user filter thorugh the dashboard
    dateFreqChart
      .width(1000)
      .height(200)
      .margins({top: 10, right: 50, bottom: 30, left:40})
      .dimension(dateDim2)
      .group(dateTypeGroup2)
      .x(d3.scaleLinear().domain([1970, 2021]));
      //.elasticX(true)
      //.data(d => {return d.top(3)})


    pubFromCitiesChart
      .width(500)
      .height(200)
      .x(d3.scaleLinear().domain[0, 30])
      //.elasticX(true)
      .dimension(cityDim)
      .group(cityGroup)
      .data(d => {return d.top(10)});


    genreChart
      .width(500)
      .height(200)
      .x(d3.scaleLinear().domain[0, 30])
      //.elasticX(true)
      .dimension(genreDim)
      .group(genreGroup)
      .data(d => {return d.top(10)});


    affiliationChart
      .width(400)
      .height(250)
      .x(d3.scaleLinear().domain[0, 30])
      //.elasticX(true)
      .dimension(affiliationDim)
      .group(affiliationGroup)
      .data(d => {return d.top(10)});


    genderChart
      .width(230)
      .height(250)
      .innerRadius(30)
      .externalLabels(20)
      .externalRadiusPadding(20)
      .drawPaths(true)
      .dimension(genderDim)
      .group(genderGroup)
      .on('pretransition', function(chart) {
        chart.selectAll('text.pie-slice').text(d => {
          return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        })
      });


    languageChart
      .width(230)
      .height(250)
      .innerRadius(30)
      .externalLabels(20)
      .externalRadiusPadding(20)
      .drawPaths(true)
      .dimension(languageDim)
      .group(languageGroup)
      .on('pretransition', function(chart) {
        chart.selectAll('text.pie-slice').text(d => {
          return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        })
      });


    sourceGenreChart
      .width(230)
      .height(250)
      .innerRadius(30)
      .externalLabels(20)
      .externalRadiusPadding(20)
      .drawPaths(true)
      .dimension(sourceGenreDim)
      .group(sourceGenreGroup)
      .on('pretransition', function(chart) {
        chart.selectAll('text.pie-slice').text(d => {
          return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        })
      });

    dc.renderAll();
    });
