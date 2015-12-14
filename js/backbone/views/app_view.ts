/// <reference path="../../../typings/tsd.d.ts" />

declare var $: any;

import Backbone = require('backbone');
import Todos = require('../collections/todos');
import TodoView = require('./todo_view');

export class AppView extends Backbone.View<Backbone.Model> {
    input: any;

    constructor() {
        super();

        this.setElement($('.todoapp'), true);
        
        Todos.fetch();
    }

    initialize() {
        this.input = this.$('.new-todo');
        this.list = this.$('.todo-list');

        this.listenTo(Todos, 'add', this.addOne);
        this.listenTo(Todos, 'reset', this.addAll);
    }

    events(): Backbone.EventsHash {
        return {
            'keypress .new-todo': 'createOnEnter'
        }
    }

    render() {
        Todos.length ? this.list.show() : this.list.hide();
    }

    addOne(todo) {
        var view = new TodoView({ model: todo });
        this.list.append(view.render().el);
    }

    addAll() {
        this.list.html('');
        Todos.each(this.addOne);
    }

    newAttributes() {
        return {
            title: this.input.val().trim(),
            order: Todos.nextOrder(),
            completed: false
        };
    }

    createOnEnter(e) {
        if(e.which === TodoView.TodoView.ENTER_KEY && this.input.val().trim()) {
            Todos.create(this.newAttributes());
            this.input.val('');
        }
    }
}
