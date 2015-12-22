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
