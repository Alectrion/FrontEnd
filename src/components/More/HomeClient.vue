<template>
  <div class="User">
    <div class="Buscador">
      <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText type="text" v-model="buscador" placeholder="Buscador" />
      </span>
    </div> 
    <section class= "Boton">
          <router-link to='/myaccount' style="text-decoration:none" title='Mi Cuenta'><Button icon="pi pi-user" class="p-button-rounded" /></router-link>
    </section>
    <section>
      <div class="Favoritos">
        <div id="Header"><a>Favoritos</a></div>
      </div>
      <div class="Container">
        
      </div>
    </section>
    <section class="Botones">
      <button class="button1"><router-link to='/search' style="color:#25a9ca; text-decoration:none" title='Categoria'>SUPERMERCADO</router-link></button>
      <button class="button1"><router-link to='/search' style="color:#25a9ca; text-decoration:none" title='Categoria'>GIMNASIO</router-link></button>
      <button class="button1"><router-link to='/search' style="color:#25a9ca; text-decoration:none" title='Categoria'>BARBERÍA</router-link></button>
      <button class="button1"><router-link to='/search' style="color:#25a9ca; text-decoration:none" title='Categoria'>RESTAURANTE</router-link></button>
    </section>

  </div>
</template>

<script>

export default {
  name: 'HomeUser',
  data(){
    return{
      buscador:"",
      username: null
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("doLogout");
      this.$router.push("Welcome");
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Orbitron');
.User {
  background-image: url("../img/Home.png");
  position: absolute;
  width: 100%;
  height: 100%; 
}

.Favoritos {
  position: absolute;
  background:#917b90;
  border: 1px solid #d8c7d7;
  width: 60%;
  height: 55px;
  top: 18%;
  transform: translateX(35%);
  border-radius: 5px;
}
#Header {
  font-family: Orbitron; 
  font-size: 20px;
  padding-top: 1%;
  transform: translateX(1%);
  color: #34383a;
}
.Container{
  position: absolute;
  background:#e0d5e0;
  width: 60%;
  height: 40%;
  top: 26%;
  transform: translateX(35%);
  border-radius: 5px;
}
.button1 {
  text-decoration: none;
  position: relative;
  top: 700px;
  left: 450px;
  font-family: Orbitron;
  font-size: 22.5px;
  letter-spacing: 1px;
  background-color:  transparent; 
  padding: 10px 30px;
  transition-duration: 0.2s;
  border: 2px solid #25a9ca;
  display: inline-block;
}

.button1:hover {
  background: #f2f2f2;
  box-shadow: 0 0 10px #25a9ca, 0 0 40px #25a9ca, 0 0 80px #25a9ca;
}


</style>
