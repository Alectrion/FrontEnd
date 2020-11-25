<template>
  <div class="CreateOwner">
    <b>Nombre</b>
    <br>
    <input type="text" name="name">
    <br>
    <b>Correo</b>
    <br>
    <input type="text" name="email">
    <br>
    <b>Usuario</b>
    <br>
    <input type="text" name="user">
    <br>
    <b>Contraseña</b>
    <br>
    <input type="text" name="password">
    <!--<div>
      <br>
      <p> AÑADIR ESTABLECIMIENTO </p>
      <AddEstablishment></AddEstablishment>
    </div>-->
    <br>
    <button type="submit">Guardar</button><br>
    <p>ROL: PROPIETARIO</p>
  </div>
</template>

<script>
//import AddEstablishment from './AddEstablishment.vue'

export default {
  name: 'CreateOwner',
  components: { 
    //AddEstablishment
  }
}
</script>

<style>
</style>
