/// <reference path="../typings/tsd.d.ts" />

declare var $: any;
declare var _: any;
declare var Store: any;

import Backbone = require('backbone');

class TodoList<Todo> extends Backbone.Collection<Backbone.Model> {
    localStorage = new Store('todos-backbone');

    nextOrder() {
        return this.length ? this.last().get('order') + 1 : 1;
    }
}

var Todos = new Todos();

class Todo extends Backbone.Model {
    defaults() {
        return {
            title: '',
            completed: false
        }
    }
}

class AppView<Todos> extends Backbone.View<Backbone.Model> {
    input: any;

    constructor() {
        super();

        this.setElement($('.todoapp'), true);
        
        Todos.fetch();
    }

    initialize() {
        this.input = this.$('.new-todo');

        this.listenTo(Todos, 'add', this.addOne);
        this.listenTo(Todos, 'reset', this.addAll);
    }

    events(): Backbone.EventsHash {
        return {
            'keypress .new-todo': 'createOnEnter'
        }
    }

    render() {
        Todos.length ? this.$('.todo-list').show() : this.$('.todo-list').hide();
        return this;
    }

    addOne(todo) {
        var view = new TodoView({ model: todo });
        this.$('.todo-list').append(view.render().el);
    }

    addAll() {
        this.$('.todo-list').html('');
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
        if(e.which === TodoView.ENTER_KEY && this.input.val().trim()) {
            Todos.create(this.newAttributes());
            this.input.val('');
        }
    }
}

class TodoView extends Backbone.View<Backbone.Model> {
    template: (data: any) => string;
    input: any;

    static ENTER_KEY:number = 13;

    constructor(options?) {
        this.tagName = 'li';

        super(options);

        this.template = _.template($('#item-template').html());

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    }
        
    events(): Backbone.EventsHash {
        return {
            'click .todo-title': 'edit',
            'click .destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close'
        }
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    }

    edit() {
        this.$('.todo').addClass('hidden');
        this.input.removeClass('hidden');
        this.input.focus();
    }

    close() {
        var trimmedValue = this.input.val().trim();
        trimmedValue ? this.model.save({ title: trimmedValue }) : this.clear();
        this.$('.todo').removeClass('hidden');
        this.input.addClass('hidden');
    }

    updateOnEnter(e) {
        if(e.which === TodoView.ENTER_KEY) this.close();
    }

    clear() {
        this.model.clear();
    }
}
