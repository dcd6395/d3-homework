// @TODO: YOUR CODE HERE!

var svgWidth = 1000;
var svgHeight = 500;

var margin = {
    top: 10,
    right: 40,
    bottom: 90,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



// data import
d3.csv("assets/data/data.csv")
    .then(function (healthData) {

        //Get data from data.csv file and turn strings into integers if needed
            healthData.forEach(function(data){
                data.poverty = +data.poverty;
                data.healthcare = +data.healthcare;
                data.age = +data.age;
                data.income = +data.income;
                data.smokes = +data.smokes;
                data.obesity = +data.obesity;
        });
        //Create scales for X and Y
        let xLinearScale = d3.scaleLinear()
            .domain([8.5, d3.max(healthData, d => d.poverty)])
            .range([0, width]);

        let yLinearScale = d3.scaleLinear()
            .domain([3.5, d3.max(healthData, d => d.healthcare)])
            .range([height, 0]);


        //Create axis
        let bottomAxis = d3.axisBottom(xLinearScale);
        let leftAxis = d3.axisLeft(yLinearScale);

        //Append axis to the chartGroup
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

        //Circles
        let circlesGroup = chartGroup.selectAll("circle")
            .data(healthData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", 10)
            .attr("fill", "lightblue")
            .attr("opacity", ".6")
            .attr("stroke-width", "1")
            .attr("stroke", "black");

        chartGroup.select("g")
            .selectAll("circle")
            .data(healthData)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare))
            .attr("dy", -395)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black");

        console.log(healthData);

        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 50)
            .attr("x", 0 - 250)
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Lacks Healthcare (%)");

        chartGroup.append("text")
            .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
            .attr("class", "axisText")
            .text("In Poverty (%)");



    });