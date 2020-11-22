<template>
  <div class="Login">
    <div class="container">
      <h1>CREAR CUENTA</h1>
      <div id="Botones">
        <button id="boton1" v-on:click="(rolmsg = 'CLIENTE'), (data.rol = 1)">Cliente</button>
        <button id="boton1" v-on:click="(rolmsg = 'PROPIETARIO'), (data.rol = 2)">Propietario</button>
      </div>
      <p>{{ rolmsg }}</p>
      <form v-on:submit.prevent="Guardar()">
        <label for="name"><b>Nombre</b></label><br>
        <input type="text" name="name" required v-model="data.name" autocomplete="off"><br>
        <br>
        <label for="email"><b>Correo</b></label><br>
        <input type="text" name="email" required v-model="data.email" autocomplete="off"><br>
        <br>
        <label for="username"><b>Usuario</b></label><br>
        <input type="text" name="username" required v-model="data.username" autocomplete="off"><br>
        <br>
        <label for="password"><b>Contraseña</b></label><br>
        <input type="password" name="password" required v-model="data.password" ><br>
        <br>
        <button id="boton2" type="submit">GUARDAR</button><br>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const path = "registro/nuevo-usuario/rol/";

export default {
  name: "CreateAccount",
  data() {
    return {
      rolmsg: "-SELECCIONE SU ROL-",
      data: {
        name: "",
        email: "",
        username: "",
        password: "",
        rol: ""
      },
    };
  },
  methods: {
    Guardar() {
      axios
        .post(this.$store.state.backURL + path + this.data.rol, {
          names: this.data.name,
          password: this.data.password,
          username: this.data.username,
          email: this.data.email
        })
        .then(response => {
          console.log(response.data);
          alert("Registro exitoso")
          this.$router.push("/login");
        })
        .catch(error => {
          alert(error);
        });
    },
  },
};
</script>

<style scoped>
.Login {
  position: absolute;
  background-image: url("img/Login.jpg");
  width: 100%;
  height: 100%;
}
.container {
  position: absolute;
  border: 1px solid #a945c7;
  width: 350px;
  height: 500px;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  box-shadow: 0 0 10px #470e44, 0 0 40px #470e44, 0 0 80px #470e44;
}
h1 {
  color: white;
  text-shadow: #a945c7 0px 0px 10px;
  position: relative;
  top: 15px;
  font-family: Orbitron;
  font-size: 22px;
}
#boton1 {
  position: relative;
  top: 25px;
  background-color: #320a30;
  color: #a945c7;
  border: 1px solid #a945c7;
  font-family: Orbitron;
  font-size: 15px;
  padding: 5px 10px;
  transition-duration: 0.2s;
}
#boton1:hover {
  background: #f7f7f7;
  box-shadow: 0 0 10px #a945c7, 0 0 40px #a945c7, 0 0 80px #a945c7;
}
p {
  position: relative;
  top: 20px;
  color: white;
  font-family: Orbitron;
  font-size: 14px;
  text-shadow: #a945c7 0px 0px 5px;
  letter-spacing: 2px;
}
label {
  position: relative;
  top: 25px;
  color: white;
  text-shadow: #a945c7 0px 0px 5px;
  font-family: Consolas;
  font-size: 17px;
}
input {
  position: relative;
  top: 30px;
  width: 75%;
  padding: 5px 5px;
  border: 1px solid #a945c7;
  border-radius: 5px;
  background-color: #320a30;
  color: white;
}

#boton2 {
  position: relative;
  top: 45px;
  background-color: #320a30;
  color: white;
  border: 1px solid #a945c7;
  font-family: Orbitron;
  font-size: 15px;
  padding: 5px 10px;
  transition-duration: 0.2s;
  text-shadow: #a945c7 0px 0px 5px;
}
#boton2:hover {
  box-shadow: 0 0 10px #a945c7, 0 0 40px #a945c7, 0 0 80px #a945c7;
}
</style>
