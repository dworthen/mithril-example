// Model
var Thing = {};
Thing.list = function() {
  return [
    {
      id: "01",
      name: "Derek"
    },
    {
      id: "02",
      name: "Kris"
    },
    {
      id: "03",
      name: "What"
    },
    {
      id: "04",
      name: "New"
    }
  ];
};


var things = {};

things.controller = function() {
  var ctrl = this;

  ctrl.list = new list.controller({
    visible: function(item) {
      var searchVal = ctrl.filter.searchTerm().toLowerCase();
      var name = item.name.toLowerCase();
      var id = item.id;
      return name.indexOf(searchVal) > -1 || id.indexOf(searchVal) > -1;
    }
  });

  ctrl.filter = new filter.controller();
};

things.view = function(ctrl) {
  return m('.row', [
    m('.col-md-2', [
      filter.view(ctrl.filter)
    ]),
    m('.col-md-10', [
      list.view(ctrl.list)
    ])
  ]);
};

var filter = {};

filter.controller = function(options) {
  this.searchTerm = m.prop("");
};

filter.view = function(ctrl) {
  return m('input', {
    oninput: m.withAttr('value', ctrl.searchTerm),
    placeholder: 'search'
  });
};

var list = {};

list.controller = function(options) {
  this.items = Thing.list();
  this.visible = options.visible;
};

list.view = function(ctrl) {
  return m('table', [
    ctrl.items.filter(ctrl.visible).map(function(item) {
      return m('tr', [
        m('td', item.id),
        m('td', item.name)
      ]);
    })
  ]);
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('dom loaded');
  m.module(document.getElementById('app'), things);
});
