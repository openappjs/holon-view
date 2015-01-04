var d3 = require('d3');

module.exports = HolonView;

function HolonView (options) {
  this.el = options.el;
  this.model = options.model;
  this.diameter = options.diameter || 960;
};

HolonView.prototype.render = function () {
  this.el = this.el || document.createElement('div');

  /*
  if (this.el && this.el.parentNode) {
    this.el = el = this.el.parentNode.replaceChild(this.el, el);
  } else {
    this.el = el;
  }
  */

  var el = this.el;
  var model = this.model;
  var diameter = this.diameter;

  var format = d3.format(",d");

  var pack = d3.layout.pack()
    .size([diameter - 4, diameter - 4])
    .value(function(d) { return d.size; })
  ;

  var svg = d3.select(el).append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .append('g')
    .attr('transform', 'translate(2,2)')
  ;

  var node = svg.datum(model).selectAll('.node')
    .data(pack.nodes)
    .enter().append('g')
    .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
  ;

  node.append("title")
    .text(function(d) { return d.name + (d.children ? "" : ": " + format(d.size)); })
  ;

  node.append("circle")
    .attr("r", function(d) { return d.r; })
  ;

  node.filter(function(d) { return !d.children; }).append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function(d) { return d.name.substring(0, d.r / 3); })
  ;

  d3.select(el).style('height', '100%');
    
  return this;
};

HolonView.prototype.remove = function () {
  var parent = this.el.parentNode;
  if (parent) parent.removeChild(this.el);
}
