var displayOn = false;
var currentSchool;
var OSU;
var UofO;
var PSU;
var UofP;


function showData(school) {

    if (displayOn == false){
        currentSchool = school;
        var svg = d3.selectAll("svg")
        svg.selectAll("rect").remove();
        svg.selectAll("g").remove();
        buildBar(school);
        document.getElementById("chart0").style.visibility = "visible";
        document.getElementById("chart0").style.display = "block";
        document.getElementById("mapCell").style.transform = "translate(-280px, 0)";
        document.getElementById("mapCell").style.transitionDuration = "2s";
        document.getElementById("chart0").style.transform = "translate(-50vw, 0)";
        document.getElementById("chart0").style.transitionDuration = "2s";
        displayOn = true;
    }
    else{
        
        document.getElementById("mapCell").style.transform = "translate(0px, 0)";
        document.getElementById("mapCell").style.transitionDuration = "2s";
        document.getElementById("chart0").style.transform = "translate(0px, 0)";
        document.getElementById("chart0").style.transitionDuration = "2s";
        document.getElementById("chart0").style.visibility = "hidden";
        displayOn = false; 
        
    }
}


function buildBar(school){
   
    var index = 0;
    var amplify = 4;
    if(school == "OSU"){
        index = 0;
        amplify = 8;
    }
         
    else if(school == "UofO"){
        index = 1;
        amplify = 2;
    }
        
    else if(school == "PSU")
        index = 2;
    else
        index = 3;
    var target = document.getElementById('graphCell');


    //Create SVG element
    var svg = d3.selectAll("svg"),
    //.attr("id", "chart" + index),
    margin = {top: 20, right: 20, bottom: 100, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

    
    x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.csv("data.csv", function(error, data){
        var wep13 = d3.nest()
        .key(function(d) { return d.INSTNM;})
        .rollup(function(d) { 
            return d3.sum(d, function(g) {return g.WEAPON13; });
        }).entries(data);
       
        
        var drug13 = d3.nest()
        .key(function(d) { return d.INSTNM;})
        .rollup(function(d) { 
            return d3.sum(d, function(g) {return g.DRUG13; });
        }).entries(data);
        
         var liq13 = d3.nest()
        .key(function(d) { return d.INSTNM;})
        .rollup(function(d) { 
            return d3.sum(d, function(g) {return g.LIQUOR13; });
        }).entries(data);
        
        var wep14 = d3.nest()
        .key(function(d) { return d.INSTNM;})
        .rollup(function(d) { 
            return d3.sum(d, function(g) {return g.WEAPON14; });
        }).entries(data);
        
        var drug14 = d3.nest()
        .key(function(d) { return d.INSTNM;})
        .rollup(function(d) { 
            return d3.sum(d, function(g) {return g.DRUG14; });
        }).entries(data);
        
         var liq14 = d3.nest()
        .key(function(d) { return d.INSTNM;})
        .rollup(function(d) { 
            return d3.sum(d, function(g) {return g.LIQUOR14; });
        }).entries(data);
        
        var wep15 = d3.nest()
        .key(function(d) { return d.INSTNM;})
        .rollup(function(d) { 
            return d3.sum(d, function(g) {return g.WEAPON15; });
        }).entries(data);
        
        var drug15 = d3.nest()
        .key(function(d) { return d.INSTNM;})
        .rollup(function(d) { 
            return d3.sum(d, function(g) {return g.DRUG15; });
        }).entries(data);
        
         var liq15 = d3.nest()
        .key(function(d) { return d.INSTNM;})
        .rollup(function(d) { 
            return d3.sum(d, function(g) {return g.LIQUOR15; });
        }).entries(data);

    
       dataset = [
                ["WEAPONS 2013", wep13[index].value,13],
                ["DRUGS 2013", drug13[index].value,13],
                ["LIQUOR 2013", liq13[index].value,13],
                ["WEAPONS 2014", wep14[index].value,14],
                ["DRUGS 2014", drug14[index].value,14],
                ["LIQUOR 2014", liq14[index].value,14],
                ["WEAPONS 2015", wep15[index].value,15],
                ["DRUGS 2015", drug15[index].value,15],
                ["LIQUOR 2015", liq15[index].value,15],
        ];

    x.domain(dataset.map(function(d) { return d[0]; }));
    y.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

    g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 0)
    .attr("x", -10)
    .attr("transform", "rotate(-75)")
    .style("font-size", "10px")
    .style("text-anchor", "end");

    g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");


    g.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("y", function(d) { return y(d[1]); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d[1]); })
    .attr("fill", function(d) 
          { 
            if(d[2] == 13)
                return "#807dba";    
            else if(d[2] == 14)
                return "#e08214";
            else
                return "#41ab5d";
          });
    });
}

function update(data){
	//set domain for the x axis
	x.domain(data.map(function(d){ return d.viewer_age; }) );
	//set domain for y axis
	y.domain( [0, d3.max(data, function(d){ return +d.watch_time_minutes; })] );
	
	//get the width of each bar 
	var barWidth = width / data.length;
	
	//select all bars on the graph, take them out, and exit the previous data set. 
	//then you can add/enter the new data set
	var bars = chart.selectAll(".bar")
					.remove()
					.exit()
					.data(data)		
	//now actually give each rectangle the corresponding data
	bars.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d, i){ return i * barWidth + 1 })
		.attr("y", function(d){ return yChart( d.watch_time_minutes); })
		.attr("height", function(d){ return height - yChart(d.watch_time_minutes); })
		.attr("width", barWidth - 1)
		.attr("fill", function(d){ 
			if(d.viewer_gender === "FEMALE"){
				return "rgb(251,180,174)";
			}else{
				return "rgb(179,205,227)";
			}
		});
	//left axis
	chart.select('.y')
		  .call(yAxis)
	//bottom axis
	chart.select('.xAxis')
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", function(d){
				return "rotate(-65)";
			});
			
}//end update

