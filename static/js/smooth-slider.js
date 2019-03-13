var svg = d3v4.select("svg"),
    margin = { right: 50, left: 50 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height");

var hueActual = 0,
    hueTarget = 70,
    hueAlpha = 0.2,
    hueTimer = d3v4.timer(hueTween);

var x = d3v4.scaleLinear()
    .domain([0, 180])
    .range([0, width])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
    .select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
    .select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3v4.drag()
        .on("start.interrupt", function () { slider.interrupt(); })
        .on("start drag", function () { hue(x.invert(d3v4.event.x)); }));

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
    .selectAll("text")
    .data(x.ticks(10))
    .enter().append("text")
    .attr("x", x)
    .attr("text-anchor", "middle")
    .text(function (d) { return d + "°"; });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

function hue(h) {
    hueTarget = h;
    // hueTimer.restart(hueTween);
}

function hueTween() {
    var hueError = hueTarget - hueActual;
    if (Math.abs(hueError) < 1e-3) hueActual = hueTarget, hueTimer.stop();
    else hueActual += hueError * hueAlpha;
    handle.attr("cx", x(hueActual));
    svg.style("background-color", d3v4.hsl(hueActual, 0.8, 0.8));
}
