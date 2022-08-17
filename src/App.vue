<template>
  <div id="app" class="container mx-auto">
    <h1>To Do</h1>
    <Container />
  </div>
</template>

<script>
/* 
 * Use Container component
 */
import Container from './components/Container'

export default {
  name: 'App',
  components: {
    Container,
  },
}
</script>

<style scoped>
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
</style>