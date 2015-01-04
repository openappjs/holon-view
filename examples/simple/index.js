var HolonView = require('../../');

require('./index.css');

var holonView = new HolonView({
  model: require('./index.yml'),
  diameter: Math.min(
    document.body.clientHeight,
    document.body.clientWidth
  ),
});

holonView.render();

document.body.appendChild(holonView.el);
