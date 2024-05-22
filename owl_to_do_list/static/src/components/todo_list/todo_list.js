/** @odoo-module **/

const { Component, useState } = owl;
import { registry } from '@web/core/registry';

export class OwlTodoList extends Component {
    setup() {
        this.state = useState({ value: 1 })
    }
}

OwlTodoList.template = 'owl.TodoList'
registry.category('actions').add('owl_to_do_list.action_todo_list_owl', OwlTodoList)