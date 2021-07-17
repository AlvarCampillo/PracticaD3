d3.json('practica_airbnb.json')
    .then((featureCollection) => {
        drawMap(featureCollection);
    });

function drawMap(featureCollection) {
    var width = 900;
    var height = 800;
    var Color1 = "#12BB37"
    var Color2 = "#D32121"

    var svg = d3.select('div')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g');

    var center = d3.geoCentroid(featureCollection); //Encontrar la coordenada central del mapa
    var projection = d3.geoMercator()
        .fitSize([width, height], featureCollection) 
        .center(center)
        .translate([width / 2, height / 2])

    console.log(featureCollection);
    console.log(featureCollection.features[0].properties.name);

    //Para crear paths a partir de una proyección 
    var pathProjection = d3.geoPath().projection(projection);
    
    var features = featureCollection.features;

    var createdPath = svg.selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', (d) => pathProjection(d))
        .attr("stroke-width", 1)
        .attr("stroke", "black");
    
    

    
    createdPath.on('mouseover', function(d) {
        d3.select(this).attr('stroke', "#0027FF").attr("stroke-width", 5);
    })

    createdPath.on('mouseout', function(d) {
        d3.select(this).attr('stroke', "black").attr("stroke-width", 1);

    })

    var scaleColor = d3.scaleLinear().domain([25,100])
    .range([Color1, Color2]);
    createdPath.attr('fill', (d) => scaleColor(d.properties.avgprice));

// Leyenda
    var colors = [Color2, Color1];
    var legend_grad = d3.select('div')
    .append('svg')
    .attr('width', 500)
    .attr('height',700)
    .attr("x", 40)             
    .attr("y", 15);
  
    var grad = legend_grad.append('defs')
        .append('linearGradient')
        .attr('id', 'grad')
        .attr('x1', '0%')
        .attr('x2', '0%')
        .attr('y1', '0%')
        .attr('y2', '100%');
  
    grad.selectAll('stop')
        .data(colors)
        .enter()
        .append('stop')
        .style('stop-color', function(d){ return d; })
        .attr('offset', function(d,i){
        return 100 * (i / (colors.length - 1)) + '%';
        })
    
    legend_grad.append('rect')
        .attr('x', 15)
        .attr('y', 20)
        .attr('width', 50)
        .attr('height', 150)
        .style('fill', 'url(#grad)');

    legend_grad.append('svg')
        .attr('width', 100)
        .attr('height', 200)
        .append("text")
        .attr("x", 40)             
        .attr("y", 195)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .style("font-family", "sans-serif") 
        .attr("font-weight", 700)
        .text("25 EUR");
    
    legend_grad.append('svg')
        .attr('width', 100)
        .attr('height', 250)
        .append("text")
        .attr("x", 40)             
        .attr("y", 15)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .style("font-family", "sans-serif")
        .attr("font-weight", 700) 
        .text("> 120 EUR");
    
    legend_grad.append('svg')
        .attr('width', 100)
        .attr('height', 100);
    
    legend_grad.append('svg')
        .append("rect")
        .attr("width", 25)             
        .attr("height", 25)
        .attr("x", 0)
        .attr("y", 230)
        .style("fill", "black")
    
    legend_grad.append("svg")
        .append("text")
        .attr("x", 60)             
        .attr("y", 250)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .style("font-family", "sans-serif") 
        .attr("font-weight", 700)
        .text("No Data");
    
        //Título
    legend_grad.append("svg")
        .append("text")
        .attr("x", 200)             
        .attr("y", 350)
        .attr("text-anchor", "middle")  
        .style("font-size", "36px")  
        .style("font-family", "sans-serif") 
        .attr("font-weight", 700)
        .text("Precio de Airbnb");

    legend_grad.append("svg")
        .append("text")
        .attr("x", 200)             
        .attr("y", 400)
        .attr("text-anchor", "middle")  
        .style("font-size", "36px")  
        .style("font-family", "sans-serif") 
        .attr("font-weight", 700)
        .text("por barrios (Madrid)");

    legend_grad.append("svg")
        .append("text")
        .attr("x", 200)             
        .attr("y", 450)
        .attr("text-anchor", "middle")  
        .style("font-size", "36px")  
        .style("font-family", "sans-serif") 
        .attr("font-weight", 700)
        .text("<------------------");

        //Título 2
    var Conteo = d3.select('div')
        .append('svg')
        .attr('width', 500)
        .attr('height',700);
        
    Conteo.append("svg")
        .append("text")
        .attr("x", 200)             
        .attr("y", 300)
        .attr("text-anchor", "middle")  
        .style("font-size", "36px")  
        .style("font-family", "sans-serif") 
        .attr("font-weight", 700)
        .text("Conteo Airbnbs segun");

    Conteo.append("svg")
        .append("text")
        .attr("x", 200)             
        .attr("y", 350)
        .attr("text-anchor", "middle")  
        .style("font-size", "36px")  
        .style("font-family", "sans-serif") 
        .attr("font-weight", 700)
        .text("las habitaciones");

    Conteo.append("svg")
        .append("text")
        .attr("x", 200)             
        .attr("y", 400)
        .attr("text-anchor", "middle")  
        .style("font-size", "36px")  
        .style("font-family", "sans-serif") 
        .attr("font-weight", 700)
        .text("(Palacio)");

    Conteo.append("svg")
        .append("text")
        .attr("x", 200)             
        .attr("y", 450)
        .attr("text-anchor", "middle")  
        .style("font-size", "36px")  
        .style("font-family", "sans-serif") 
        .attr("font-weight", 700)
        .text("------------------>");
    

// BarChart
    var input = [{
        value: 79,
        bedrooms: "0 Habitaciones",
    },
    {
        value: 684,
        bedrooms: "1 Habitacion",
    },
    {
        value: 221,
        bedrooms: "2 Habitaciones",
    },
    {
        value: 78,
        bedrooms: "3 Habitaciones",
    },
    {
        value: 20,
        bedrooms: "4 Habitaciones",
    }
    ];

    // Lienzo
    var heightB = 800;
    var widthB = 800;
    var marginbottom = 100;
    var margintop = 50;

    var svg3 = d3.select('div')
        .append('svg')
        .attr('width', widthB + 50)
        .attr('height', heightB + marginbottom + margintop)
        .append("g")
        .attr("transform", "translate(50," + margintop + ")");

    //Creacion de escalas
    var xscale = d3.scaleBand()
        .domain(input.map(function(d) {
            return d.bedrooms;
        }))
        .range([0, widthB])
        .padding(0.1);

    var yscale = d3.scaleLinear()
        .domain([0, 684])
        .range([heightB, 0]);
    
    //Creación de eje X e Y
    var xaxis = d3.axisBottom(xscale)
    var yaxis = d3.axisLeft(yscale)

    //Creacion de los rectangulos
    var rect = svg3
        .selectAll('rect')
        .data(input)
        .enter()
        .append('rect')
        .attr("fill", "#0027FF");

    rect
        .attr("x", function(d) {
            return xscale(d.bedrooms);
        })
        .attr('y', d => {
            return yscale(0)
        })
        .attr("width", xscale.bandwidth())
        .attr("height", function() {
            return heightB - yscale(0);
        })
        
        //Cuando se pasa el ratón
        .on("mouseover", function() {
            d3.select(this).attr('fill', "#00F2FF")
        })
        .on("mouseout", function() {
            d3.select(this).attr('fill', "#0027FF")
        });       

    //transición de entrada
    rect
        .transition()
        .ease(d3.easeBounce)
        .duration(2000)
        .delay(function(d, i) {
            console.log(i);
            return (i * 300)
        })
        .attr('y', d => {
            return yscale(d.value)
        })
        .attr("height", function(d) {
            return heightB - yscale(d.value); //Altura real de cada rectangulo.
        });
        
        //Añadimos el eje X
    svg3.append("g")
        .attr("transform", "translate(0," + heightB + ")")
        .call(xaxis)
        .attr("font-size", 22);
    
    svg3.append("g")
        .call(yaxis)
        .attr("font-size", 22);

}
