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
