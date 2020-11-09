$.getJSON('https://covid.ourworldindata.org/data/owid-covid-data.json', function(data) {

var text1 = `day 1: ${data["HUN"]["data"].slice(-1)[0]["new_deaths"]}`
var text2 = `day 2: ${data["HUN"]["data"].slice(-2)[0]["new_deaths"]}`
var text3 = `day 3: ${data["HUN"]["data"].slice(-3)[0]["new_deaths"]}`
var text4 = `day 4: ${data["HUN"]["data"].slice(-4)[0]["new_deaths"]}`
var text5 = `day 5: ${data["HUN"]["data"].slice(-5)[0]["new_deaths"]}`

console.log(text1);
console.log(text2);
console.log(text3);
console.log(text4);
console.log(text5);
});
