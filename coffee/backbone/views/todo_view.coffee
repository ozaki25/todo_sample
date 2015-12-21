app = app || {};

$ ->
  app.TodoView = Backbone.View.extend
    tagName: 'li'
    className: 'list-group-item'

    template: _.template($('#item-template').html())

    events:
      'click .todo-title': 'edit'
      'click .destroy': 'clear'
      'keypress .edit': 'updateOnEnter'
      'blur .edit': 'close'

    initialize: ->
      @listenTo(@model, 'change', @render)
      @listenTo(@model, 'destroy', @remove)

    render: ->
      @$el.html(@template(@model.toJSON()))
      @$input = @$('.edit')

    edit: ->
      @$('.todo').addClass 'hidden'
      @$input.removeClass 'hidden'
      @$input.focus()

    close: ->
      trimmedValue = @$input.val().trim()
      trimmedValue ? @model.save { title: trimmedValue }) : @clear()
      @$('.todo').removeClass 'hidden'
      @$input.addClass 'hidden'

    updateOnEnter: (e) ->
      @close() if e.which is ENTER_KEY

    clear: ->
      @model.destroy()
