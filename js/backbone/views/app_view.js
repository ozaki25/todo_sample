var app = app || {};

(function($) {
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '.todoapp',

    events: {
      'keypress .new-todo': 'createOnEnter'
    },

    initialize: function() {
      this.$input = this.$('.new-todo');
      this.$list = this.$('.todo-list');

      this.listenTo(app.todos, 'add', this.addOne);
      this.listenTo(app.todos, 'reset', this.addAll);

      app.todos.fetch({ reset: true });
    },

    render: function() {
      app.todos.length ? this.$list.show() : this.$list.hide();
    },

    addOne: function(todo) {
      var view = new app.TodoView({ model: todo });
      this.$list.append(view.render().el);
    },

    addAll: function() {
      this.$list.html('');
      if(app.todos.length != 0) app.todos.each(this.addOne, this);
    },

    newAttributes: function() {
      return {
	title: this.$input.val().trim(),
	order: app.todos.nextOrder(),
	completed: false
      };
    },

    createOnEnter: function(e) {
      if(e.which === ENTER_KEY && this.$input.val().trim()) {
        app.todos.create(this.newAttributes());
        this.$input.val('');
      }
    },
  });
})(jQuery);
