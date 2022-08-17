<template>
    <div class="wrapper">
        <input type="text" v-model="name" placeholder="Task name">
        <input type="text" v-model="description" placeholder="Task description">
        <button v-on:click="addTask">Add</button>
    </div>
    <div class="task " v-for="task in tasks" :key="task.id">
        <p> <strong>{{ task.name }}:</strong> {{ task.description }}</p>

        <button class="btn-rm" @click="removeTask(task.id)">
            <font-awesome-icon icon="fa-solid fa-trash" />
        </button>
    </div>
</template>

<script>

import { API } from 'aws-amplify'
import { createTodo, deleteTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries';

/*
 *
 * addTask(): adds task using graphql query "createTodo", updates tasks list in frontend
 * removeTask(): confirms if user wants to remove task, removes task using graphql query 
 *               "deleteTodo", updates tasks list in frontend
 * getTasks(): fetchs tasks using graphql query "listTodos", updates tasks list in frontend 
 */
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Container',
    data() {
        return {
            name: '',
            description: '',
            tasks: [],
        }
    },
    async created() {
        this.getTasks();
    },
    methods: {
        async addTask() {
            const { name, description } = this;
            if (!name || !description)
                return;

            const task = { name, description };

            await API.graphql({
                query: createTodo,
                variables: { input: task },
            });

            this.tasks = [...this.tasks, task];

            this.name = '';
            this.description = '';
        },
        async removeTask(id) {
            try {
                const input = {
                    id: id
                }
                if(!confirm('Estás seguro que deseas eliminar esta tarea?'))
                    return;
                await API.graphql({ query: deleteTodo, variables: { input } });
                this.tasks = this.tasks.filter(e => e.id != id);
            } catch (e) {
                console.log("error", e)
            }
        },
        async getTasks() {
            const taskList = await API.graphql({
                query: listTodos
            });
            this.tasks = taskList.data.listTodos.items;
        }
    }
}
</script>

<style scoped>
button,
input {
    border-radius: 5px;
    padding: 5px 10px;
    border: 1px solid #665959;
    margin: 5px;
    color: #665959;
}

.wrapper {
    display: flex;
}

.wrapper input {
    flex: 1;
}

.task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #EEE;
    border-radius: 5px;
    margin: 5px 10px;
    padding: 5px 10px;
}

.btn-rm {
    border: none;
}
</style>