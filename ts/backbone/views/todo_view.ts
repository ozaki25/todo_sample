/// <reference path="../../../typings/tsd.d.ts" />

import Backbone = require('backbone');
import app = require('../../app');

export class TodoView extends Backbone.View<Backbone.Model> {
    template: (data: any) => string;
    $input: any;

    static ENTER_KEY:number = 13;

    constructor(options?) {
        this.tagName = 'li';
        this.className = 'list-group-item'

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
        this.$input = this.$('.edit');
        return this;
    }

    edit() {
        this.$('.todo').addClass('hidden');
        this.$input.removeClass('hidden');
        this.$input.focus();
    }

    close() {
        var trimmedValue = this.$input.val().trim();
        trimmedValue ? this.model.save({ title: trimmedValue }) : this.clear();
        this.$('.todo').removeClass('hidden');
        this.$input.addClass('hidden');
    }

    updateOnEnter(e) {
        if(e.which === TodoView.ENTER_KEY) this.close();
    }

    clear() {
        this.model.clear();
    }
}
