/// <reference path="../../../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app = app || {};
var AppView = (function (_super) {
    __extends(AppView, _super);
    function AppView() {
        _super.call(this);
        this.setElement($('.todoapp'), true);
        app.Todos.fetch({ reset: true });
    }
    AppView.prototype.initialize = function () {
        this.$input = this.$('.new-todo');
        this.$list = this.$('.todo-list');
        this.listenTo(app.Todos, 'add', this.addOne);
        this.listenTo(app.Todos, 'reset', this.addAll);
    };
    AppView.prototype.events = function () {
        return {
            'keypress .new-todo': 'createOnEnter'
        };
    };
    AppView.prototype.render = function () {
        app.length ? this.$list.show() : this.$list.hide();
        return this;
    };
    AppView.prototype.addOne = function (todo) {
        var view = new app.TodoView({ model: todo });
        this.$list.append(view.render().el);
    };
    AppView.prototype.addAll = function () {
        this.$list.html('');
        app.Todos.each(this.addOne, this);
    };
    AppView.prototype.newAttributes = function () {
        return {
            title: this.$input.val().trim(),
            order: app.Todos.nextOrder(),
            completed: false
        };
    };
    AppView.prototype.createOnEnter = function (e) {
        if (e.which === app.TodoView.ENTER_KEY && this.$input.val().trim()) {
            app.Todos.create(this.newAttributes());
            this.$input.val('');
        }
    };
    return AppView;
})(Backbone.View);
exports.AppView = AppView;
