/// <reference path="../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Backbone = require('backbone');
var TodoList = (function (_super) {
    __extends(TodoList, _super);
    function TodoList() {
        _super.apply(this, arguments);
        this.localStorage = new Store('todos-backbone');
    }
    TodoList.prototype.nextOrder = function () {
        return this.length ? this.last().get('order') + 1 : 1;
    };
    return TodoList;
})(Backbone.Collection);
var Todos = new Todos();
var Todo = (function (_super) {
    __extends(Todo, _super);
    function Todo() {
        _super.apply(this, arguments);
    }
    Todo.prototype.defaults = function () {
        return {
            title: '',
            completed: false
        };
    };
    return Todo;
})(Backbone.Model);
var AppView = (function (_super) {
    __extends(AppView, _super);
    function AppView() {
        _super.call(this);
        this.setElement($('.todoapp'), true);
        Todos.fetch();
    }
    AppView.prototype.initialize = function () {
        this.input = this.$('.new-todo');
        this.listenTo(Todos, 'add', this.addOne);
        this.listenTo(Todos, 'reset', this.addAll);
    };
    AppView.prototype.events = function () {
        return {
            'keypress .new-todo': 'createOnEnter'
        };
    };
    AppView.prototype.render = function () {
        Todos.length ? this.$('.todo-list').show() : this.$('.todo-list').hide();
        return this;
    };
    AppView.prototype.addOne = function (todo) {
        var view = new TodoView({ model: todo });
        this.$('.todo-list').append(view.render().el);
    };
    AppView.prototype.addAll = function () {
        this.$('.todo-list').html('');
        Todos.each(this.addOne);
    };
    AppView.prototype.newAttributes = function () {
        return {
            title: this.input.val().trim(),
            order: Todos.nextOrder(),
            completed: false
        };
    };
    AppView.prototype.createOnEnter = function (e) {
        if (e.which === TodoView.ENTER_KEY && this.input.val().trim()) {
            Todos.create(this.newAttributes());
            this.input.val('');
        }
    };
    return AppView;
})(Backbone.View);
var TodoView = (function (_super) {
    __extends(TodoView, _super);
    function TodoView(options) {
        this.tagName = 'li';
        _super.call(this, options);
        this.template = _.template($('#item-template').html());
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    }
    TodoView.prototype.events = function () {
        return {
            'click .todo-title': 'edit',
            'click .destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close'
        };
    };
    TodoView.prototype.render = function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    };
    TodoView.prototype.edit = function () {
        this.$('.todo').addClass('hidden');
        this.input.removeClass('hidden');
        this.input.focus();
    };
    TodoView.prototype.close = function () {
        var trimmedValue = this.input.val().trim();
        trimmedValue ? this.model.save({ title: trimmedValue }) : this.clear();
        this.$('.todo').removeClass('hidden');
        this.input.addClass('hidden');
    };
    TodoView.prototype.updateOnEnter = function (e) {
        if (e.which === TodoView.ENTER_KEY)
            this.close();
    };
    TodoView.prototype.clear = function () {
        this.model.clear();
    };
    TodoView.ENTER_KEY = 13;
    return TodoView;
})(Backbone.View);
