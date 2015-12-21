app = app || {};

$ ->
  Todos = Backbone.Collection.extend
    model: app.Todo

    localStorage: new Backbone.LocalStorage('todos-backbone')

    nextOrder: ->
      this.length ? this.last().get('order') + 1 : 1

    comparator: 'order'

  app.todos = new Todos()
