<template>
  <div class="Login">
    <div class="container">
      <h1>AGREGAR ESTABLECIMIENTO</h1>
      <form v-on:submit.prevent="Agregar()">
        <label for="nombreEst"><b>Nombre Establecimiento</b></label><br>
        <input type="text" name="nombreEst" required v-model="data.nombreEst" autocomplete="off"><br>
        <label for="direccion"><b>Dirección</b></label><br>
        <input type="text" name="direccion" required v-model="data.direccion" autocomplete="off"><br>
        <label for="telefono"><b>Teléfono</b></label><br>
        <input type="text" name="telefono" required v-model="data.telefono" autocomplete="off"><br>
        <label for="categoria"><b>Categoría</b></label><br>
        <input type="text" name="categoria" required v-model="data.categoria" autocomplete="off"><br>
        <label for="cupo"><b>Cupo Máximo</b></label><br>
        <input type="text" name="cupo" required v-model="data.cupo" autocomplete="off"><br>
        <button id="boton" type="submit">GUARDAR</button><br>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path = "propietario/nuevo_establecimiento?access_token=";

export default {
  name: "addEstablishment",
  data() {
    return {
      data: {
        nombreEst: "",
        direccion: "",
        telefono: "",
        categoria: "",
        cupo: ""
      },
    };
  },
  methods: {
    Agregar() {
      axios
        .post(this.$store.state.backURL + path + getAuthenticationToken(),  {
          nombreEstablecimiento: this.data.nombreEst,
          dir: this.data.direccion,
          tel: this.data.telefono,
          tipoEstablecimiento: this.data.categoria,
          cupoMax: this.data.cupo
        })
        .then(response => {
          alert("Registro exitoso");
          console.log(response);
        })
        .catch(error => {
          alert(error);
        });
        this.$router.push("/home");      
    },
  },
} 
</script>

<style scoped>
.Login {
  position: absolute;
  background-image: url("../img/Login.jpg");
  width: 100%;
  height: 100%;
}
.container {
  position: absolute;
  border: 1px solid #a945c7;
  width: 450px;
  height: 550px;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  box-shadow: 0 0 10px #470e44, 0 0 40px #470e44, 0 0 80px #470e44;
}
h1 {
  color: white;
  text-shadow: #a945c7 0px 0px 10px;
  position: relative;
  top: 20px;
  font-family: Orbitron;
  font-size: 22px;
}
label {
  position: relative;
  top: 45px;
  color: white;
  text-shadow: #a945c7 0px 0px 5px;
  font-family: Consolas;
  font-size: 17px;
}
input {
  position: relative;
  top: 50px;
  width: 80%;
  padding: 5px 5px;
  border: 1px solid #a945c7;
  border-radius: 5px;
  background-color: #320a30;
  color: white;
}
#boton {
  position: relative;
  top: 70px;
  background-color: #320a30;
  color: white;
  border: 1px solid #a945c7;
  font-family: Orbitron;
  font-size: 15px;
  padding: 5px 10px;
  transition-duration: 0.2s;
  text-shadow: #a945c7 0px 0px 5px;
}
#boton:hover {
  box-shadow: 0 0 10px #a945c7, 0 0 40px #a945c7, 0 0 80px #a945c7;
}
.select {
  position: relative;
  display: block;
  width: 80%;
  height: 35px;
  top: 50px;
  margin: 0 auto;
  border: 1px solid #a945c7;
  border-radius: 5px;
  background-color: #320a30;
  z-index: 10;
}
.select select {
  border: none;
  outline: none;
  background: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  display: block;
  width: 100%;
  padding: 5px 10px;
  font-family: Consolas;
  font-size: 17px;
  color:#a945c7;
}
.select:after {
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 100%;
  line-height: 35px;
  content: "V";
  text-align: center;
  color: #a945c7;
  font-size: 20px;
  border-left: 1px solid #a945c7;
  z-index: -1;
}

</style>

