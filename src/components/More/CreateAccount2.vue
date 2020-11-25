<template>
  <div class="CreateAccount">
    <div id="Botones">
      <p>Seleccione su rol:</p>
      <button v-on:click="counter = 1">Usuario</button>
      <button v-on:click="counter = 2">Propietario</button>
    </div>
    <div id="container2">
      <div v-if="counter === 1 "><CreateUser></CreateUser></div>
      <div v-if="counter === 2 "><CreateOwner></CreateOwner></div>
    </div> 
  </div>
</template>

<script> 
import CreateUser from './CreateUser.vue'
import CreateOwner from './CreateOwner.vue'

export default {
  name: 'CreateAccount',
  components: { 
    CreateUser,
    CreateOwner
  },
  data() {
    return{
      counter: 0
    }
    
  }
}
</script>

<style>
</style>
