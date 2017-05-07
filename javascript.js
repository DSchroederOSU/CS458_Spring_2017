var displayOn = false;
var currentSchool;
var OSU;
var UofO;
var PSU;
var UofP;


function showData(school) {
        document.getElementById('startup').style.visibility = "hidden";
        document.getElementById('choose0').style.visibility = "hidden";
        document.getElementById('choose1').style.visibility = "hidden";
        document.getElementById('choose2').style.visibility = "hidden";
        currentSchool = school;
        var svg = d3.selectAll("svg")
        svg.selectAll("rect").remove();
        svg.selectAll("g").remove();
        svg.selectAll("text").remove();
        buildBar(school);
        document.getElementById('currentschool').innerHTML = currentSchool +":";
        /*document.getElementById("chart0").style.visibility = "visible";
        document.getElementById("chart0").style.display = "block";
        document.getElementById("mapCell").style.transform = "translate(-280px, 0)";
        document.getElementById("mapCell").style.transitionDuration = "2s";
        document.getElementById("chart0").style.transform = "translate(-50vw, 0)";
        document.getElementById("chart0").style.transitionDuration = "2s";
        document.getElementById("buttonGroup").style.transform = "translate(-85vw, 0)";
        document.getElementById("buttonGroup").style.transitionDuration = "2s";
        */
        document.getElementById("buttonGroup").style.visibility = "visible";
        displayOn = true;
   
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
    margin = {top: 50, right: 20, bottom: 100, left: 50},
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
                ["WEAPONS 2014", wep14[index].value,14],
                ["WEAPONS 2015", wep15[index].value,15],
                ["DRUGS 2013", drug13[index].value,13],
                ["DRUGS 2014", drug14[index].value,14],
                ["DRUGS 2015", drug15[index].value,15],
                ["LIQUOR 2013", liq13[index].value,13],
                ["LIQUOR 2014", liq14[index].value,14],
                ["LIQUOR 2015", liq15[index].value,15],
        ];

    x.domain(dataset.map(function(d) { return d[0]; }));
    y.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

    g.append("g")
    .attr("class", "axis axis--x")
    .attr("stroke-width", "3px")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 13)
    .attr("transform", "rotate(0)")
    .style("font-size", "11px")
    .style("text-anchor", "end")
    g.selectAll("text")
    .text(function(d) { 
        
        return d.substr(d.length-4,4); });
    g.append("text")
    .attr("x", (width/5) - 10)             
    .attr("y", height + (margin.bottom/2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("font-family", "Verdana, Geneva, sans-serif")
    .text("WEAPONS");  
    g.append("text")
    .attr("x", (width/5)*3 - 35)             
    .attr("y", height + (margin.bottom/2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("font-family", "Verdana, Geneva, sans-serif") 
    .text("DRUGS");  
    g.append("text")
    .attr("x", width - 70)             
    .attr("y", height + (margin.bottom/2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("font-family", "Verdana, Geneva, sans-serif")
    .text("LIQUOR");  
    
    g.append("g")
    .attr("class", "axis axis--y")
    .attr("stroke-width", "3px")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    g.append("text")
    .attr("x", -(height/2))             
    .attr("y", -35)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("font-family", "Verdana, Geneva, sans-serif")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Number of Crimes");      
     
        
        
    svg.append("text")
    .attr("x", ((width + margin.left + margin.right) / 2) + 20)             
    .attr("y", 0 + (margin.top/2) + 10)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("font-family", "Verdana, Geneva, sans-serif")
    .text("Crimes on " + school + " Campus");
        
    g.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("y", function(d) { return y(d[1]) - 1; })
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

function weapons(){
    
    var school = currentSchool;
    
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
    margin = {top: 50, right: 20, bottom: 100, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
    svg.selectAll("rect").remove();
    svg.selectAll("g").remove();
    svg.selectAll("text").remove();
    
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
                ["WEAPONS 2014", wep14[index].value,14],
                ["WEAPONS 2015", wep15[index].value,15],
        ];

    x.domain(dataset.map(function(d) { return d[0]; }));
    y.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

    g.append("g")
    .attr("class", "axis axis--x")
    .attr("stroke-width", "3px")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 45)
    .attr("transform", "rotate(0)")
    .style("font-size", "12px")
    .style("text-anchor", "end");

    g.append("g")
    .attr("class", "axis axis--y")
    .attr("stroke-width", "3px")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");
    g.append("text")
    .attr("x", -(height/2))             
    .attr("y", -35)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("font-family", "Verdana, Geneva, sans-serif")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Number of Crimes");  
        
    svg.append("text")
    .attr("x", ((width + margin.left + margin.right) / 2) + 20)             
    .attr("y", 0 + (margin.top/2) + 10)
    .attr("text-anchor", "middle")  
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .attr("font-family", "Verdana, Geneva, sans-serif")
    .text("Weapon Only Crimes on " + school + " Campus By Year");

    g.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("y", function(d) { return y(d[1]) - 1; })
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
			
}//end weapons
function drugs(){
    var school = currentSchool;
   
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
    margin = {top: 50, right: 20, bottom: 100, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
    svg.selectAll("rect").remove();
    svg.selectAll("g").remove();
    svg.selectAll("text").remove();
    
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
                ["DRUGS 2013", drug13[index].value,13],
                ["DRUGS 2014", drug14[index].value,14],
                ["DRUGS 2015", drug15[index].value,15],
        ];

    x.domain(dataset.map(function(d) { return d[0]; }));
    y.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

    g.append("g")
    .attr("class", "axis axis--x")
    .attr("stroke-width", "3px")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 35)
    .attr("transform", "rotate(0)")
    .style("font-size", "12px")
    .style("text-anchor", "end");

    g.append("g")
    .attr("class", "axis axis--y")
    .attr("stroke-width", "3px")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");
    g.append("text")
    .attr("x", -(height/2))             
    .attr("y", -35)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("font-family", "Verdana, Geneva, sans-serif")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Number of Crimes");  
        
    svg.append("text")
    .attr("x", ((width + margin.left + margin.right) / 2) + 20)             
    .attr("y", 0 + (margin.top/2) + 10)
    .attr("text-anchor", "middle")  
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .attr("font-family", "Verdana, Geneva, sans-serif")
    .text("Drug Only Crimes on " + school + " Campus By Year");

    g.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("y", function(d) { return y(d[1]) - 1; })
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
 
}//end drugs
function liquor(){
    var school = currentSchool;
    
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
    margin = {top: 50, right: 20, bottom: 100, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
    svg.selectAll("rect").remove();
    svg.selectAll("g").remove();
    svg.selectAll("text").remove();
    
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
                ["LIQUOR 2013", liq13[index].value,13],
                ["LIQUOR 2014", liq14[index].value,14],
                ["LIQUOR 2015", liq15[index].value,15],
        ];

    x.domain(dataset.map(function(d) { return d[0]; }));
    y.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

    g.append("g")
    .attr("class", "axis axis--x")
    .attr("stroke-width", "3px")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 40)
    .attr("transform", "rotate(0)")
    .style("font-size", "12px")
    .style("text-anchor", "end");

    g.append("g")
    .attr("class", "axis axis--y")
    .attr("stroke-width", "3px")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");
    g.append("text")
    .attr("x", -(height/2))             
    .attr("y", -35)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("font-family", "Verdana, Geneva, sans-serif")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Number of Crimes");  
        
    svg.append("text")
    .attr("x", ((width + margin.left + margin.right) / 2) + 20)             
    .attr("y", 0 + (margin.top/2) + 10)
    .attr("text-anchor", "middle")  
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .attr("font-family", "Verdana, Geneva, sans-serif")
    .text("Liquor Only Crimes on " + school + " Campus By Year");

    g.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("y", function(d) { return y(d[1]) - 1; })
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
}//end liquor

function compareAll(){
    
    var type = document.getElementById("type").value;
    console.log(type);
    //Create SVG element
    var svg = d3.selectAll("svg"),
    //.attr("id", "chart" + index),
    margin = {top: 50, right: 20, bottom: 100, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
    svg.selectAll("rect").remove();
    svg.selectAll("g").remove();
    svg.selectAll("text").remove();
    
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

        console.log(wep13);
        
        var wOSU = wep13[0].value + wep14[0].value + wep15[0].value;
        var wUofO = wep13[1].value + wep14[1].value + wep15[1].value;
        var wPSU = wep13[2].value + wep14[2].value + wep15[2].value;
        var dOSU = drug13[0].value + drug14[0].value + drug15[0].value;
        var dUofO = drug13[1].value + drug14[1].value + drug15[1].value;
        var dPSU = drug13[2].value + drug14[2].value + drug15[2].value;
        var lOSU = liq13[0].value + liq14[0].value + liq15[0].value;
        var lUofO = liq13[1].value + liq14[1].value + liq15[1].value;
        var lPSU = liq13[2].value + liq14[2].value + liq15[2].value;
        
        var title;
        if(type == "weapon"){
            dataset = [
                ["OSU", wOSU],
                ["UofO", wUofO],
                ["PSU", wPSU],
            ];
            title = "Weapon";
        }
        else if(type == "drug"){
            dataset = [
                ["OSU", dOSU],
                ["UofO", dUofO],
                ["PSU", dPSU],
            ];     
            title = "Drug";
        }
        else{
            dataset = [
                ["OSU", lOSU],
                ["UofO", lUofO],
                ["PSU", lPSU],
            ];    
            title = "Liquor";
        }
        
        

    x.domain(dataset.map(function(d) { return d[0]; }));
    y.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

    g.append("g")
    .attr("class", "axis axis--x")
    .attr("stroke-width", "3px")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 13)
    .attr("x", 17)
    .attr("transform", "rotate(0)")
    .style("font-size", "16px")
    .style("text-anchor", "end");

    g.append("g")
    .attr("class", "axis axis--y")
    .attr("stroke-width", "3px")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");
    g.append("text")
    .attr("x", -(height/2))             
    .attr("y", -35)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Number of Crimes");  
    svg.append("text")
    .attr("x", ((width + margin.left + margin.right) / 2) + 20)             
    .attr("y", 0 + (margin.top/2) + 10)
    .attr("font-family", "Verdana, Geneva, sans-serif")
    .attr("text-anchor", "middle")  
    .style("font-size", "20px")
    .text("" + title + " Crimes By School (2013-2015)");

    g.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d[0]); })
    .attr("y", function(d) { return y(d[1]) - 1; })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d[1]); })
    .attr("fill", function(d) 
          { 
            if(d[0] == "OSU")
                return "#807dba";    
            else if(d[0] == "UofO")
                return "#e08214";
            else
                return "#41ab5d";
          });
    });
}