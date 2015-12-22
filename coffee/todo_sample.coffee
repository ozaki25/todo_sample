class TodoView extends Backbone.View
  tagName: 'li'
  className: 'list-group-item'

  template: _.template $('#item-template').html()

  events:
    'click .todo-title': 'edit'
    'click .destroy': 'clear'
    'keypress .edit': 'updateOnEnter'
    'blur .edit': 'close'

  initialize: ->
    console.log 'TodoView.initialize'
    @listenTo(@model, 'change', @render)
    @listenTo(@model, 'destroy', @remove)

  render: ->
    console.log 'TodoView.render'
    @$el.html @template(@model.toJSON())
    @$input = @$('.edit')
    return this

  edit: ->
    console.log 'TodoView.edit'
    @$('.todo').addClass 'hidden'
    @$input.removeClass 'hidden'
    @$input.focus()

  close: ->
    console.log 'TodoView.close'
    trimmedValue = @$input.val().trim()
    if trimmedValue then @model.save { title: trimmedValue } else @clear()
    @$('.todo').removeClass 'hidden'
    @$input.addClass 'hidden'

  updateOnEnter: (e) ->
    console.log 'TodoView.updateOnEnter'
    @close() if e.which is ENTER_KEY

  clear: ->
    console.log 'TodoView.clear'
    @model.destroy()

class AppView extends Backbone.View
  el: '.todoapp'

  events:
    'keypress .new-todo': 'createOnEnter'

  initialize: ->
    console.log 'AppView.initialize'
    @$input = $('.new-todo')
    @$list = $('.todo-list')

    @listenTo(todos, 'add', @addOne)
    @listenTo(todos, 'reset', @addAll)

    todos.fetch { reset: true }

  render: ->
    console.log 'AppView.render'
    if todos.length then @$list.show() else @$list.hide()

  addOne: (todo) ->
    console.log 'AppView.addOne'
    view = new TodoView { model: todo }
    @$list.append view.render().el

  addAll: ->
    console.log 'AppView.addAll'
    @$list.html ''
    todos.each(@addOne, this)

  newAttributes: ->
    console.log 'AppView.newAttribute'
    {
       title: @$input.val().trim()
       order: todos.nextOrder()
       completed: false
    }

  createOnEnter: (e) ->
    console.log 'AppView.createOnEnter'
    if e.which is ENTER_KEY && @$input.val().trim()
      todos.create @newAttributes()
      @$input.val ''

class Todo extends Backbone.Model
  defaults:
    title: ''
    completed: false

class Todos extends Backbone.Collection 
  model: Todo

  localStorage: new Backbone.LocalStorage 'todos-backbone'

  nextOrder: ->
    console.log 'Todos.nextOrder'
    if this.length then this.last().get 'order' + 1 else 1

  comparator: 'order'

todos = new Todos()

ENTER_KEY = 13

new AppView()


