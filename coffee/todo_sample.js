(function() {
  var AppView, ENTER_KEY, Todo, TodoView, Todos, todos,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  TodoView = (function(superClass) {
    extend(TodoView, superClass);

    function TodoView() {
      return TodoView.__super__.constructor.apply(this, arguments);
    }

    TodoView.prototype.tagName = 'li';

    TodoView.prototype.className = 'list-group-item';

    TodoView.prototype.template = _.template($('#item-template').html());

    TodoView.prototype.events = {
      'click .todo-title': 'edit',
      'click .destroy': 'clear',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close'
    };

    TodoView.prototype.initialize = function() {
      console.log('TodoView.initialize');
      this.listenTo(this.model, 'change', this.render);
      return this.listenTo(this.model, 'destroy', this.remove);
    };

    TodoView.prototype.render = function() {
      console.log('TodoView.render');
      this.$el.html(this.template(this.model.toJSON()));
      this.$input = this.$('.edit');
      return this;
    };

    TodoView.prototype.edit = function() {
      console.log('TodoView.edit');
      this.$('.todo').addClass('hidden');
      this.$input.removeClass('hidden');
      return this.$input.focus();
    };

    TodoView.prototype.close = function() {
      var trimmedValue;
      console.log('TodoView.close');
      trimmedValue = this.$input.val().trim();
      if (trimmedValue) {
        this.model.save({
          title: trimmedValue
        });
      } else {
        this.clear();
      }
      this.$('.todo').removeClass('hidden');
      return this.$input.addClass('hidden');
    };

    TodoView.prototype.updateOnEnter = function(e) {
      console.log('TodoView.updateOnEnter');
      if (e.which === ENTER_KEY) {
        return this.close();
      }
    };

    TodoView.prototype.clear = function() {
      console.log('TodoView.clear');
      return this.model.destroy();
    };

    return TodoView;

  })(Backbone.View);

  AppView = (function(superClass) {
    extend(AppView, superClass);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.el = '.todoapp';

    AppView.prototype.events = {
      'keypress .new-todo': 'createOnEnter'
    };

    AppView.prototype.initialize = function() {
      console.log('AppView.initialize');
      this.$input = $('.new-todo');
      this.$list = $('.todo-list');
      this.listenTo(todos, 'add', this.addOne);
      this.listenTo(todos, 'reset', this.addAll);
      return todos.fetch({
        reset: true
      });
    };

    AppView.prototype.render = function() {
      console.log('AppView.render');
      if (todos.length) {
        return this.$list.show();
      } else {
        return this.$list.hide();
      }
    };

    AppView.prototype.addOne = function(todo) {
      var view;
      console.log('AppView.addOne');
      view = new TodoView({
        model: todo
      });
      return this.$list.append(view.render().el);
    };

    AppView.prototype.addAll = function() {
      console.log('AppView.addAll');
      this.$list.html('');
      return todos.each(this.addOne, this);
    };

    AppView.prototype.newAttributes = function() {
      console.log('AppView.newAttribute');
      return {
        title: this.$input.val().trim(),
        order: todos.nextOrder(),
        completed: false
      };
    };

    AppView.prototype.createOnEnter = function(e) {
      console.log('AppView.createOnEnter');
      if (e.which === ENTER_KEY && this.$input.val().trim()) {
        todos.create(this.newAttributes());
        return this.$input.val('');
      }
    };

    return AppView;

  })(Backbone.View);

  Todo = (function(superClass) {
    extend(Todo, superClass);

    function Todo() {
      return Todo.__super__.constructor.apply(this, arguments);
    }

    Todo.prototype.defaults = {
      title: '',
      completed: false
    };

    return Todo;

  })(Backbone.Model);

  Todos = (function(superClass) {
    extend(Todos, superClass);

    function Todos() {
      return Todos.__super__.constructor.apply(this, arguments);
    }

    Todos.prototype.model = Todo;

    Todos.prototype.localStorage = new Backbone.LocalStorage('todos-backbone');

    Todos.prototype.nextOrder = function() {
      console.log('Todos.nextOrder');
      if (this.length) {
        return this.last().get('order' + 1);
      } else {
        return 1;
      }
    };

    Todos.prototype.comparator = 'order';

    return Todos;

  })(Backbone.Collection);

  todos = new Todos();

  ENTER_KEY = 13;

  new AppView();

}).call(this);

//# sourceMappingURL=todo_sample.js.map
