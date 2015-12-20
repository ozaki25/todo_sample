/// <reference path="../../../typings/tsd.d.ts" />

import Backbone = require('backbone');
import app = require('../../app');
import todos = require('../collections/todos');
import todo = require('../models/todo');
import todo_view = require('./todo_view');

const Todos = new todos.Todos();

export class AppView extends Backbone.View<Backbone.Model> {
    $input: any;
    $list: any;

    constructor() {
        super();

        this.setElement($('.todoapp'), true);
        
        Todos.fetch({ reset: true });
    }

    initialize() {
        this.$input = this.$('.new-todo');
        this.$list = this.$('.todo-list');

        this.listenTo(todos.Todos, 'add', this.addOne);
        this.listenTo(todos.Todos, 'reset', this.addAll);
    }

    events(): Backbone.EventsHash {
        return {
            'keypress .new-todo': 'createOnEnter'
        }
    }

    render() {
        Todos.length ? this.$list.show() : this.$list.hide();
        return this;
    }

    addOne(todo) {
        var view = new todo_view.TodoView({ model: todo });
        this.$list.append(view.render().el);
    }

    addAll() {
        this.$list.html('');
        Todos.each(this.addOne, this);
    }

    newAttributes() {
        return {
            title: this.$input.val().trim(),
            order: Todos.nextOrder(),
            completed: false
        };
    }

    createOnEnter(e) {
        if(e.which === todo_view.TodoView.ENTER_KEY && this.$input.val().trim()) {
            Todos.create(this.newAttributes());
            this.$input.val('');
        }
    }
}
