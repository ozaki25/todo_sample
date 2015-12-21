app = app || {}

$ ->
  app.AppView = Backbone.View.extend
    el: '.todoapp'

    events:
      'keypress .new-todo': 'createOnEnter'

    initialize: ->
      @$input = $('.new-todo')
      @$list = $('.todo-list')

      @listenTo(app.todos, 'add', @addOne)
      @listenTo(app.todos, 'reset', @addAll)

      app.todos.fetch({ reset: true })

    render: ->
      app.todos.length ? @$list.show() : @$list.hide()

    addOne: (todo) ->
      view = new app.TodoView({ model: todo })
      @$list.append view.render().el

    addAll: ->
      @$list.html ''
      app.todos.each(@addOne, this)

    newAttributes: ->
      {
	       title: @$input.val().trim()
	       order: app.todos.nextOrder()
	       completed: false
      }

    createOnEnter: (e) ->
      if e.which is ENTER_KEY && @$input.val().trim()
        app.todos.create @newAttributes()
        @$input.val ''
