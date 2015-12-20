/// <reference path="../../../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'backbone', '../collections/todos', './todo_view'], function (require, exports, Backbone, todos, todo_view) {
    var Todos = new todos.Todos();
    var AppView = (function (_super) {
        __extends(AppView, _super);
        function AppView() {
            _super.call(this);
            this.setElement($('.todoapp'), true);
            Todos.fetch({ reset: true });
        }
        AppView.prototype.initialize = function () {
            this.$input = this.$('.new-todo');
            this.$list = this.$('.todo-list');
            this.listenTo(todos.Todos, 'add', this.addOne);
            this.listenTo(todos.Todos, 'reset', this.addAll);
        };
        AppView.prototype.events = function () {
            return {
                'keypress .new-todo': 'createOnEnter'
            };
        };
        AppView.prototype.render = function () {
            Todos.length ? this.$list.show() : this.$list.hide();
            return this;
        };
        AppView.prototype.addOne = function (todo) {
            var view = new todo_view.TodoView({ model: todo });
            this.$list.append(view.render().el);
        };
        AppView.prototype.addAll = function () {
            this.$list.html('');
            Todos.each(this.addOne, this);
        };
        AppView.prototype.newAttributes = function () {
            return {
                title: this.$input.val().trim(),
                order: Todos.nextOrder(),
                completed: false
            };
        };
        AppView.prototype.createOnEnter = function (e) {
            if (e.which === todo_view.TodoView.ENTER_KEY && this.$input.val().trim()) {
                Todos.create(this.newAttributes());
                this.$input.val('');
            }
        };
        return AppView;
    })(Backbone.View);
    exports.AppView = AppView;
});
