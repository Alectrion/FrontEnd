<template>
  <div class="Login">
    <form v-on:submit.prevent="Login()">
      <div class="container">
        <h1>INICIAR SESIÓN</h1>
        <label for="username"><b>Usuario</b></label><br>
        <input type="text" name="username" required v-model="data.username" autocomplete="off">
        <br>
        <br>
        <label for="password"><b>Contraseña</b></label><br>
        <input type="password" name="password" required v-model="data.password">
        <br>
        <button type="submit">INGRESAR</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import {setAuthenticationToken} from '@/dataStorage';

const path = "oauth/token";

export default {
  name: "Login",
  data() {
    return {
      data: {
        username: "",
        password: ""
      },
    };
  },
  methods: {
    Login(event){
      axios
      .post(this.$store.state.backURL + path, { }, 
        {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
              username: this.data.username,
              password: this.data.password,
              grant_type: 'password'
          },
          auth: {
              username: "soft-eng-ii",
              password: "secret",
          }
        }
      ).then(response => {
        setAuthenticationToken( response.data.access_token );
        this.$router.push("/home");
        location.reload();
      })
      .catch(error => {
        if( error.response.status === 400 ){
          alert( "Credenciales incorrectas" );
        }else{
          alert( "Error de comunicación con el servidor!" );
        }
      });
      event.preventDefault();
    }
  }
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
  width: 300px;
  height: 400px;
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
label {
  position: relative;
  top: 82px;
  color: white;
  text-shadow: #a945c7 0px 0px 5px;
  font-family: Consolas;
  font-size: 17px;
}
input {
  position: relative;
  top: 85px;
  width: 75%;
  padding: 5px 5px;
  border: 1px solid #a945c7;
  border-radius: 5px;
  background-color: #320a30;
  color: white;
}
button {
  position: relative;
  top: 155px;
  background-color: #320a30;
  color: white;
  border: 1px solid #a945c7;
  font-family: Orbitron;
  font-size: 15px;
  padding: 5px 10px;
  transition-duration: 0.2s;
  text-shadow: #a945c7 0px 0px 5px;
}
button:hover {
  box-shadow: 0 0 10px #a945c7, 0 0 40px #a945c7, 0 0 80px #a945c7;
}
</style>
