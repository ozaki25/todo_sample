/// <reference path="../../../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Backbone = require('backbone');
var Todos = require('../collections/todos');
var TodoView = require('./todo_view');
var AppView = (function (_super) {
    __extends(AppView, _super);
    function AppView() {
        _super.call(this);
        this.setElement($('.todoapp'), true);
        Todos.fetch();
    }
    AppView.prototype.initialize = function () {
        this.input = this.$('.new-todo');
        this.list = this.$('.todo-list');
        this.listenTo(Todos, 'add', this.addOne);
        this.listenTo(Todos, 'reset', this.addAll);
    };
    AppView.prototype.events = function () {
        return {
            'keypress .new-todo': 'createOnEnter'
        };
    };
    AppView.prototype.render = function () {
        Todos.length ? this.list.show() : this.list.hide();
    };
    AppView.prototype.addOne = function (todo) {
        var view = new TodoView({ model: todo });
        this.list.append(view.render().el);
    };
    AppView.prototype.addAll = function () {
        this.list.html('');
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
        if (e.which === TodoView.TodoView.ENTER_KEY && this.input.val().trim()) {
            Todos.create(this.newAttributes());
            this.input.val('');
        }
    };
    return AppView;
})(Backbone.View);
exports.AppView = AppView;
