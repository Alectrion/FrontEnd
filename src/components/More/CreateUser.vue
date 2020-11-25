<template>
  <form v-on:submit.prevent="Guardar()">
    <div class="CreateUser" >
      <label for="name"><b>Nombre</b></label><br>
      <input type="text" name="name" required v-model="data.name" autocomplete="off">
      <br>
      <label for="email"><b>Correo</b></label><br>
      <input type="text" name="email" required v-model="data.email">
      <br>
      <label for="user"><b>Usuario</b></label><br>
      <input type="text" name="user" required v-model="data.user" autocomplete="off">
      <br>
      <label for="password"><b>Contraseña</b></label><br>
      <input type="password" name="password" required v-model="data.password">
      <br>
      <button type="submit">Guardar</button><br>
      <p>ROL: USUARIO</p>
    </div>
  </form> 
</template>

<script>
export default {
  name: 'CreateUser',
  data(){
    return {
      data: {
        name: '',
        email:'',
        user:'',
        password: ''
      }
    }
  },
  methods:{
    Guardar(){
      alert("Datos recopilados")
      alert(this.data)
    }
  }
}
</script>

<style>
</style>
