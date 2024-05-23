/** @odoo-module **/

const { Component, useState, onWillStart } = owl;
import { registry } from '@web/core/registry';
import { useService } from "@web/core/utils/hooks";


export class OwlTodoList extends Component {
    setup() {
        this.state = useState({
            task: { name: "", color: "#FF0000", completed: false },
            taskList: [],
            isEdit: false,
            activeId: false,
        })
        this.orm = useService("orm");
        this.model = 'todo.list'

        onWillStart(async () => {
            await this.getAllTasks()
        })
    }

    async getAllTasks() {
        this.state.taskList = await this.orm.searchRead(this.model, [], ["name", "color", "completed"])
    }

    addTask() {

    }

    editTask() {

    }

    async saveTask() {
        await this.orm.create(this.model,
            [{
                name: this.state.task.name,
                color: name: this.state.task.color,
                completed: name: this.state.task.completed
            }]
        )
        await this.getAllTasks()
    }
}

OwlTodoList.template = 'owl.TodoList'
registry.category('actions').add('owl_to_do_list.action_todo_list_owl', OwlTodoList)