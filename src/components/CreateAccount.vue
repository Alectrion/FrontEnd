<template>
  <div class="Login">
    <div class="container">
      <h1>CREAR CUENTA</h1>
      <div id="Botones">
        <button id="boton1" v-on:click="(rolmsg = 'USUARIO'), (data.rol = 1)">
          Cliente
        </button>
        <button
          id="boton1"
          v-on:click="(rolmsg = 'PROPIETARIO'), (data.rol = 2)"
        >
          Propietario
        </button>
      </div>
      <form v-on:submit.prevent="Guardar()">
        <label for="names"><b>Nombre</b></label
        ><br />
        <input
          type="text"
          name="names"
          required
          v-model="data.name"
          autocomplete="off"
        /><br />
        <br />
        <label for="email"><b>Correo</b></label
        ><br />
        <input type="text" name="email" required v-model="data.email" /><br />
        <br />
        <label for="username"><b>Nombre de usuario</b></label
        ><br />
        <input
          type="text"
          name="username"
          required
          v-model="data.user"
          autocomplete="off"
        /><br />
        <br />
        <label for="password"><b>Contraseña</b></label
        ><br />
        <input
          type="password"
          name="password"
          required
          v-model="data.password"
        /><br />
        <br />
        <p>{{ rolmsg }}</p>
        <button id="boton2" type="submit">GUARDAR</button><br />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const url = "/registro/nuevo-usuario/rol/2";
export default {
  name: "CreateAccount",
  data() {
    return {
      rolmsg: "-SELECCIONE SU ROL-",
      data: {
        names: "",
        email: "",
        username: "",
        password: "",
        rol: "",
      },
    };
  },
  beforeCreate( ){
      console.log("Holi")
    },
  methods: {
    Guardar(event) {
      alert("Datos recopilados");
      console.log(url);
      axios
        .post("localhost:8080/" + url, 
        {
              names: this.names( ),
              email: this.email( ),
              username: this.username( ),
              password: this.password
            })
        .then((response) => {
          if (response.status == 200) {
            document.form.reset();
          } else {
            alert("Ya se logio :)");
            localStorage.setItem("token", response.data.access_token);
            this.$router.push("/welcome");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("Credenciales incorrectas");
          } else {
            alert("¡Parece que hubo un error de comunicación con el servidor!");
          }
        });
        event.preventDefault( );
        return true;
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
  top: 30px;
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
label {
  position: relative;
  top: 47px;
  color: white;
  text-shadow: #a945c7 0px 0px 5px;
  font-family: Consolas;
  font-size: 17px;
}
input {
  position: relative;
  top: 50px;
  width: 75%;
  padding: 5px 5px;
  border: 1px solid #a945c7;
  border-radius: 5px;
  background-color: #320a30;
  color: white;
}
p {
  position: relative;
  top: 30px;
  color: white;
  font-family: Orbitron;
  font-size: 14px;
  text-shadow: #a945c7 0px 0px 5px;
  letter-spacing: 2px;
}
#boton2 {
  position: relative;
  top: 40px;
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
