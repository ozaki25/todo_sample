/// <reference path="../../../typings/tsd.d.ts" />

declare var Store: any;

import Backbone = require('backbone');
import Todo = require('../models/todo');

export class TodoList<Todo> extends Backbone.Collection<Backbone.Model> {
    localStorage = new Store('todos-backbone');

    nextOrder() {
        return this.length ? this.last().get('order') + 1 : 1;
    }
}

var Todos = new Todos();
