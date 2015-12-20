var app = app || {};

(function($) {
  'use strict';

  app.TodoView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item',

    template: _.template($('#item-template').html()),

    events: {
      'click .todo-title': 'edit',
      'click .destroy': 'clear',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$input = this.$('.edit');
      return this;
    },

    edit: function() {
      this.$('.todo').addClass('hidden');
      this.$input.removeClass('hidden');
      this.$input.focus();
    },

    close: function() {
      var trimmedValue = this.$input.val().trim();
      trimmedValue ? this.model.save({ title: trimmedValue }) : this.clear();
      this.$('.todo').removeClass('hidden');
      this.$input.addClass('hidden');
    },

    updateOnEnter: function(e) {
      if(e.which === ENTER_KEY) this.close();
    },

    clear: function () {
      this.model.destroy();
    }
  });
})(jQuery);
