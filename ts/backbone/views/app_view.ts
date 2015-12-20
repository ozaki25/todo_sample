class AppView extends Backbone.View<Backbone.Model> {
    $input: any;
    $list: any;

    constructor() {
        super();

        this.setElement($('.todoapp'), true);
        
        TodoList.fetch({ reset: true });
    }

    initialize() {
        console.log("initialize()");
        this.$input = $('.new-todo');
        this.$list = $('.todo-list');

        this.listenTo(TodoList, 'add', this.addOne);
        this.listenTo(TodoList, 'reset', this.addAll);
    }

    events(): Backbone.EventsHash {
        console.log("event()");
        return {
            'keypress .new-todo': 'createOnEnter'
        }
    }

    render() {
        console.log("render()");
        TodoList.length ? this.$list.show() : this.$list.hide();
        return this;
    }

    addOne(todo) {
        console.log("addOne(todo)");
        var view = new TodoView({ model: todo });
        this.$list.append(view.render().el);
    }

    addAll() {
        console.log("addAll()");
        this.$list.html('');
        TodoList.each(this.addOne, this);
    }

    newAttributes() {
        console.log("newAttributes()");
        return {
            title: this.$input.val().trim(),
            order: TodoList.nextOrder(),
            completed: false
        };
    }

    createOnEnter(e) {
        console.log("createOnEnter(e)");
        if(e.which === TodoView.ENTER_KEY && this.$input.val().trim()) {
            TodoList.create(this.newAttributes());
            this.$input.val('');
        }
    }
}
