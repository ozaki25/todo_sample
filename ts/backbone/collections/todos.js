/// <reference path="../../../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Backbone = require('backbone');
var app = app || {};
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
