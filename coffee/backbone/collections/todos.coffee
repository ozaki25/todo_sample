class Todos extends Backbone.Collection 
  model: Todo

  localStorage: new Backbone.LocalStorage 'todos-backbone'

  nextOrder: ->
    console.log 'Todos.nextOrder'
    if this.length then this.last().get 'order' + 1 else 1

  comparator: 'order'

todos = new Todos()
