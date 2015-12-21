(function() {
  var ENTER_KEY, app;

  app = app || {};

  ENTER_KEY = 13;

  $(function() {
    return new app.AppView();
  });

}).call(this);

(function() {
  var app;

  app = app || {};

  $(function() {
    var Todos;
    Todos = Backbone.Collection.extend({
      model: app.Todo,
      localStorage: new Backbone.LocalStorage('todos-backbone'),
      nextOrder: function() {
        var ref;
        return (ref = this.length) != null ? ref : this.last().get('order') + {
          1: 1
        };
      },
      comparator: 'order'
    });
    return app.todos = new Todos();
  });

}).call(this);
