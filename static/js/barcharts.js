var w = 800,
                h = 400,
                padding = 40;

            var dataset = [
                { apples: 5,  oranges: 10, grapes: 22 },
                { apples: 4,  oranges: 12, grapes: 28 },
                { apples: 2,  oranges: 19, grapes: 32 },
                { apples: 7,  oranges: 23, grapes: 35 },
                { apples: 23, oranges: 17, grapes: 43 },
            ];

            var fruits = Object.keys(dataset[0]);

            var colors = d3v4.scaleOrdinal(d3v4.schemeCategory10);

            var xScale = d3v4.scaleBand()
                .domain(d3v4.range(dataset.length))
                .range([padding, w - padding])
                .paddingInner(0.05);

            var yScale = d3v4.scaleLinear()
                .domain([0, d3v4.max(dataset, function(d) {
                    var total = 0;
                    for (var i = 0; i < fruits.length; i++) {
                        total += d[fruits[i]];
                    }
                    return total;
                })])
                .range([h - padding, 0]);
            
            var yAxis = d3v4.axisLeft()
                .scale(yScale)
                .ticks(6);

            var stack = d3v4.stack()
                .keys(fruits)
                .order(d3v4.stackOrderDescending);
            
            var series = stack(dataset);
            
            var svg = d3v4.select('svg')
                .attr('width', w)
                .attr('height', h)

            var groups = svg.selectAll('g')
                .data(series)
                .enter()
                .append('g')
                .style('fill', function(d, i){
                    return colors(i);
                });

            var rects = groups.selectAll('rect')
                .data(function(d){return d;})
                .enter()
                .append('rect')
                .attr('x', function(d, i){
                    return xScale(i);
                })
                .attr('y', function(d){
                    return yScale(d[1]);
                })
                .attr('height', function(d) {
                    return yScale(d[0]) - yScale(d[1]);
                })
                .attr('width', xScale.bandwidth());
            
            svg.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + padding + ', 0)')
                .call(yAxis);

            var legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', 'translate(' + (padding + 12) + ', 0)');

            legend.selectAll('rect')
                .data(fruits)
                .enter()
                .append('rect')
                .attr('x', 0)
                .attr('y', function(d, i){
                    return i * 18;
                })
                .attr('width', 12)
                .attr('height', 12)
                .attr('fill', function(d, i){
                    return colors(i);
                });
            
            legend.selectAll('text')
                .data(fruits)
                .enter()
                .append('text')
                .text(function(d){
                    return d;
                })
                .attr('x', 18)
                .attr('y', function(d, i){
                    return i * 18;
                })
                .attr('text-anchor', 'start')
                .attr('alignment-baseline', 'hanging');