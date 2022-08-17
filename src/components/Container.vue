<template>
    <div class="wrapper">
        <input type="text" v-model="name" placeholder="Task name">
        <input type="text" v-model="description" placeholder="Task description">
        <button v-on:click="addTask">Add</button>
    </div>
    <div class="task" v-for="task in tasks" :key="task.id">
        <div class="task-info">
            <h4>{{ task.name }}</h4>
            <p>{{ task.description }}</p>
        </div>
        <button class="btn-rm" @click="removeTask(task.id)">
            <font-awesome-icon icon="fa-solid fa-trash" />
        </button>
    </div>
</template>

<script>

import { API } from 'aws-amplify'
import { createTodo, deleteTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries';

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

<style>
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

.task-info {
    display: contents;
    align-content: center;
}

.btn-rm {
    border: none;
}
</style>