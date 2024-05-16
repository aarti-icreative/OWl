const {Component, mount, xml, useState} = owl

class Task extends Component {
	static template = xml`
	<li class="d-flex align-items-center justify-content-between border p-3 mb-2 rounded-3"
		t-attf-style="background-color:#{state.color}">
		<div class="d-flex align-items-center me-2 flex-grow-1" t-if="state.isEditing">
			<input type="text" class="form-control me-2" t-model="state.name"/>
			<input type="color" class="form-control-lg form-control-color border-0 bg-white" 
				id="exampleColorInput" style="width:60px;" title="Choose your color" t-model="state.color"/>
		</div>
		<div class="form-check form-switch fs-5" t-if="!state.isEditing">
			<input class="form-check-input" type="checkbox" value="" t-att-checked="state.isCompleted" t-att-id="state.id"
			t-on-click="toggleTask"/>
			<label class="form-check-label" t-att-for="state.id" t-attf-class="#{state.isCompleted ? 'text-decoration-line-through' : ''}">
				<t t-esc="state.name"/>
			</label>
		</div>
		<div>
			<button t-if="!state.isEditing" class="btn btn-primary me-2" t-on-click="editTask"><i class="bi bi-pencil"></i></button>
			<button t-if="state.isEditing" class="btn btn-primary me-2" t-on-click="saveTask"><i class="bi bi-check-lg"></i></button>
			<button class="btn btn-danger" t-on-click="deleteTask"><i class="bi bi-trash"></i></button>
		</div>
	</li>
	`
	static props = ["task", "onDelete", "onEdit"]

	setup(){
		this.state = useState({
			isEditing:false,
			id:this.props.task.id,
			name:this.props.task.name,
			color:this.props.task.color,
			isCompleted:this.props.task.isCompleted,
		})
	}

	toggleTask(){
		this.state.isCompleted = !this.state.isCompleted
	}

	deleteTask(){
		this.props.onDelete(this.props.task)
	}

	editTask(){
		this.state.isEditing = true
	}

	saveTask(){
		this.state.isEditing = false
		this.props.onEdit(this.state)
	}
}

class Root extends Component {
	static template = xml`
	<div>
		<div class="input-group-lg w-100 d-flex border p-2 align-items-center rounded-3">
			<input type="text" class="form-control-lg border-0 flex-fill" 
				placeholder="Add your new task" aria-label="Add your new task" 
				aria-describedby="button-addon2" t-att-value="state.name" t-model="state.name"/>
			<input type="color" class="form-control-lg form-control-color border-0 bg-white" 
				id="exampleColorInput" t-att-value="state.color" 
				title="Choose your color" t-model="state.color"/>
			<button class="btn btn-primary" type="button" id="button-addon2" t-on-click="addTask"><i class="bi bi-plus-lg fs-5"></i></button>
		</div>
	</div>

	<ul class="d-flex flex-column mt-5 p-0 w-100">
		<t t-foreach="tasks" t-as="task" t-key="task.id">
			<Task task="task" onDelete.bind="deleteTask" onEdit.bind="editTask"/>
		</t>
	</ul>
	`

	static components = {Task}
	
	setup(){
		this.state = useState({
			name: "",
			color: "",
			isCompleted: false,
		})

		this.tasks = useState([])
	
	}

	addTask(){
		if(!this.state.name){
			alert("Please provide name of trask")
			return
		}
		const id = Math.random().toString().substring(2,12)

		this.tasks.push({
			id:id,
			name: this.state.name,
			color: this.state.color,
			isCompleted: false,
		})
		
		let state = this.state
		this.state = {...state, name:"", color:"#ffffff"}
	}

	deleteTask(){
		const index = this.tasks.findIndex(t=>t.id == Task.id)
		this.tasks.splice(index,1)
		
	}

	editTask(){
		const index = this.tasks.findIndex(t=>t.id == Task.id)
		this.tasks.splice(index,1, Task)
		
	}
}


mount(Root, document.getElementById("root"))