<template>
  <div id="app">
    <h1>ToDo</h1>
    <div class="wrapper">
      <input type="text" v-model="name" placeholder="Task name">
      <input type="text" v-model="description" placeholder="Task description">
      <button v-on:click="addTask">Add</button>
    </div>
    
    <div class="task" v-for="task in tasks" :key="task.id">
      <h4>{{ task.name }}</h4>
      <p>{{ task.description }}</p>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';

export default {
  name: 'app',
  async created(){
    this.getTasks();
    this.suscribe();
  },
  data() {
    return {
      name: '',
      description: '',
      tasks: []
    }
  },
  methods: {
    async addTask() {
      const { name, description } = this;
      if (!name || !description)
        return;
      
      const task = { name, description };
      this.tasks = [...this.tasks, task];
      await API.graphql({
        query: createTodo,
        variables: {input: task},
      });
      this.name = '';
      this.description = '';
    },
    async getTasks() {
      const tasks = await API.graphql({
        query: listTodos
      });
      this.tasks = tasks.data.listTodos.items;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #665959;
  margin-top: 60px;
  max-width: 420px;
  margin: 0 auto;
}

button, input {
  border-radius: 5px;
  padding: 5px 10px;
  border: 1px solid #665959;
  margin: 5px;
  color:#665959;
}

.wrapper {
  display: flex;
}

.wrapper input {
  flex: 1;
}

.task {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #EEE;
  border-radius: 5px;
  margin: 5px 10px;
  padding: 5px 10px;
}
</style>
