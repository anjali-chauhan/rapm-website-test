---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
<!DOCTYPE html>
<html>
<head>
  <h3>DC.js Dashboard Using YAML and Jekyll</h3>
  <meta charset="UTF-8">
  <!--Imports for .js and .css files-->
  <!--<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="../css/dc.css"/>-->
  <link rel="stylesheet" href="css/dc.css">
  <link rel="stylesheet" href="css/bootstrap.css">
  <link rel="stylesheet" href="css/style.css">
  <script type="text/javascript" src="js/d3.js"></script>
  <script type="text/javascript" src="js/crossfilter.js"></script>
  <script type="text/javascript" src="js/dc.js"></script>
  <script type="text/javascript" src="js/script.js"></script>
</head>


<body>
  <!-- Creating containers to hold charts -->
  <div style="width: 100%">
    <div class="chart" id="dateFreq" style="margin-left: 1px;"></div>
  </div>

  <div class="float-container">
    <div class="float-child2">
      <div class="chart" id="cityRowChart"></div>
    </div>
    <div class="float-child2">
      <div class="chart" id="genreRowChart" ></div>
    </div>
  </div>

    <div class="float-container">
    <div class="float-child4">
      <div class="chart" id="affiliationChart"></div>
    </div>
    <div class="float-child4">
      <div class="chart" id="genderChart"></div>
    </div>
    <div class="float-child4">
      <div class="chart" id="languageChart"></div>
    </div>
    <div class="float-child4">
      <div class="chart" id="sourceGenreChart"></div>
    </div>
  </div>


</body>
</html>
