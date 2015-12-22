var app = app || {};
var ENTER_KEY = 13;

$(function () {
  'use strict';
  new app.AppView();
});
var app = app || {};

(function() {
  'use strict';

  var Todos = Backbone.Collection.extend({
    model: app.Todo,

    localStorage: new Backbone.LocalStorage('todos-backbone'),

    nextOrder: function() {
      return this.length ? this.last().get('order') + 1 : 1;
    },

    comparator: 'order'
  });

  app.todos = new Todos();
})();
var app = app || {};

(function() {
  'use strict';

  app.Todo = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false
    },
  });
})();
var app = app || {};

(function($) {
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '.todoapp',

    events: {
      'keypress .new-todo': 'createOnEnter'
    },

    initialize: function() {
      this.$input = $('.new-todo');
      this.$list = $('.todo-list');

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
      app.todos.each(this.addOne, this);
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

var app = app || {};

(function($) {
  'use strict';

  app.TodoView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item',

    template: _.template($('#item-template').html()),

    events: {
      'click .todo-title': 'edit',
      'click .destroy': 'clear',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$input = this.$('.edit');
      return this;
    },

    edit: function() {
      this.$('.todo').addClass('hidden');
      this.$input.removeClass('hidden');
      this.$input.focus();
    },

    close: function() {
      var trimmedValue = this.$input.val().trim();
      trimmedValue ? this.model.save({ title: trimmedValue }) : this.clear();
      this.$('.todo').removeClass('hidden');
      this.$input.addClass('hidden');
    },

    updateOnEnter: function(e) {
      if(e.which === ENTER_KEY) this.close();
    },

    clear: function () {
      this.model.destroy();
    }
  });
})(jQuery);

//# sourceMappingURL=todo_sample.js.map