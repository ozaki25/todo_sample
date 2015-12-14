/// <reference path="../../../typings/tsd.d.ts" />

import Backbone = require('backbone');

export class Todo extends Backbone.Model {
    defaults() {
        return {
            title: '',
            completed: false
        }
    }
}

