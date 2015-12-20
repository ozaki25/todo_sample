/// <reference path="../../../typings/tsd.d.ts" />

import Backbone = require('backbone');

declare var Store: any;

export class Todos<Todo> extends Backbone.Collection<Backbone.Model> {
    localStorage = new Store('todos-backbone');

    nextOrder() {
        return this.length ? this.last().get('order') + 1 : 1;
    }
}

