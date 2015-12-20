var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Todos = (function (_super) {
    __extends(Todos, _super);
    function Todos() {
        _super.apply(this, arguments);
        this.localStorage = new Store('todos-backbone');
    }
    Todos.prototype.nextOrder = function () {
        return this.length ? this.last().get('order') + 1 : 1;
    };
    return Todos;
})(Backbone.Collection);
var TodoList = new Todos();
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
        TodoList.fetch({ reset: true });
    }
    AppView.prototype.initialize = function () {
        console.log("initialize()");
        this.$input = $('.new-todo');
        this.$list = $('.todo-list');
        this.listenTo(TodoList, 'add', this.addOne);
        this.listenTo(TodoList, 'reset', this.addAll);
    };
    AppView.prototype.events = function () {
        console.log("event()");
        return {
            'keypress .new-todo': 'createOnEnter'
        };
    };
    AppView.prototype.render = function () {
        console.log("render()");
        TodoList.length ? this.$list.show() : this.$list.hide();
        return this;
    };
    AppView.prototype.addOne = function (todo) {
        console.log("addOne(todo)");
        var view = new TodoView({ model: todo });
        this.$list.append(view.render().el);
    };
    AppView.prototype.addAll = function () {
        console.log("addAll()");
        this.$list.html('');
        TodoList.each(this.addOne, this);
    };
    AppView.prototype.newAttributes = function () {
        console.log("newAttributes()");
        return {
            title: this.$input.val().trim(),
            order: TodoList.nextOrder(),
            completed: false
        };
    };
    AppView.prototype.createOnEnter = function (e) {
        console.log("createOnEnter(e)");
        if (e.which === TodoView.ENTER_KEY && this.$input.val().trim()) {
            TodoList.create(this.newAttributes());
            this.$input.val('');
        }
    };
    return AppView;
})(Backbone.View);
var TodoView = (function (_super) {
    __extends(TodoView, _super);
    function TodoView(options) {
        this.tagName = 'li';
        this.className = 'list-group-item';
        _super.call(this, options);
        this.template = _.template($('#item-template').html());
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    }
    TodoView.prototype.events = function () {
        console.log("events()");
        return {
            'click .todo-title': 'edit',
            'click .destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close'
        };
    };
    TodoView.prototype.render = function () {
        console.log("render()");
        this.$el.html(this.template(this.model.toJSON()));
        this.$input = this.$('.edit');
        return this;
    };
    TodoView.prototype.edit = function () {
        console.log("edit()");
        this.$('.todo').addClass('hidden');
        this.$input.removeClass('hidden');
        this.$input.focus();
    };
    TodoView.prototype.close = function () {
        console.log("close()");
        var trimmedValue = this.$input.val().trim();
        trimmedValue ? this.model.save({ title: trimmedValue }) : this.clear();
        this.$('.todo').removeClass('hidden');
        this.$input.addClass('hidden');
    };
    TodoView.prototype.updateOnEnter = function (e) {
        console.log("updateOnEnter(e)");
        if (e.which === TodoView.ENTER_KEY)
            this.close();
    };
    TodoView.prototype.clear = function () {
        console.log("clear()");
        console.log(this.model);
        this.model.destroy();
    };
    TodoView.ENTER_KEY = 13;
    return TodoView;
})(Backbone.View);
/// <reference path="../typings/tsd.d.ts" />
$(function () {
    new AppView();
});
