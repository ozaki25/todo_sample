declare var Store: any;

class Todos<Todo> extends Backbone.Collection<Backbone.Model> {
    localStorage = new Store('todos-backbone');

    nextOrder() {
        return this.length ? this.last().get('order') + 1 : 1;
    }
}

const TodoList = new Todos();
