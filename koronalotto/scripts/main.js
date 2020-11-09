$.getJSON('https://covid.ourworldindata.org/data/owid-covid-data.json', function(data) {

var tspans=['tspan1447','tspan1977','tspan1853','tspan1845','tspan1825'];
var pid=["path1458","path1985","path1859","path1851","path1833"]
var x2=["442.19034","442.19034","40.87421","19.791666","1.2940332"];
var x3=["441.19034","441.19034","39.87421","18.791666","0.2940332"];

console.log('run')
for (i = 0; i < 5; i++) {
  var text = `${data["HUN"]["data"].slice(-1*(i+1))[0]["new_deaths"]}`
  document.getElementById(tspans[i]).textContent = text;
  document.getElementById(pid[i]).setAttribute("style","fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1")
  if (text.length == 2){
  document.getElementById(tspans[i]).setAttribute("x",x2[i]);
  } else {
  document.getElementById(tspans[i]).setAttribute("x",x3[i]);
  }
} 
});
