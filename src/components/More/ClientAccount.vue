<template >
  <div class="myaccount">
    <div class="Menu">
    <Toast position="top-left"/>
      <br>
        <nav class="navbar navbar-expand-lg navbar-dark ">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <h4 class="nav-link"><router-link to='/home' style="color: white; text-decoration: none" title='Home'> Home</router-link></h4>
            </li>
            <li class="nav-item">
              <h4 class="nav-link"><router-link to='/search' style="color: white; text-decoration: none" title='Search'> Buscador de Establecimientos</router-link></h4>
            </li>
          </ul>
          <ul class="navbar-nav ml-md-auto">
            <li class="nav-item">
              <h4 class="nav-link"><router-link to='/welcome' style="color: white; text-decoration: none" title='Home'> Cerrar Sesion</router-link></h4>
            </li>
          </ul>
        </div>
      </nav>
    </div>
        <Dialog header="Editar Cuenta"  position="top" :visible.sync="displayModal" :modal="true">
            <span class="p-float-label">
                <InputText type="text" v-model="account.username" disabled />
                <label for="name"></label>
            </span>
            <br />
            <span class="p-float-label">
                <InputText id="name" type="text" required v-model="account.names" autocomplete="off" placeholder="Nombre" />
                <label for="name"></label>
            </span>
            <br />
            <span class="p-float-label">
                <InputText id="Email" type="text" required v-model="account.email" autocomplete="off" placeholder="Email"/>
                <label for="email"></label>
            </span>
        
            <template #footer>
                <Button label="Guardar" icon="pi pi-check" @click="Editar" />
                <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
            </template>
        </Dialog>

  <!--Dialog Borrar Cuenta-->
        <Dialog header="Dar de baja a mi cuenta" :visible.sync="displayConfirmation" :style="{width: '350px'}" :modal="true">
          <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle" style="position:relative; font-size: 2rem; color: #ab2626; left: 45%;" />
              <h6 style="text-align: center;">¿Estás seguro de eliminar tu cuenta?</h6>
          </div>
          <template #footer>
            <Button label="Sí, adiós." icon="pi pi-check" @click="Borrar" class="p-button-outlined p-button-danger" autofocus style="color: #ab2626;"/>
            <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-outlined p-button-secondary"/>
          </template>
      </Dialog>
      

    <div class="datos" style="position: relative; max-width:35%; left: 32%;">
      <div class="card text-center" style="position:relative; ">
        <div class="card-header" style="color: #455eff; font-size: 28px; "><b>Mi Cuenta</b></div>    
        <div class="card-body" style="color: black;" >
          <img src="../img/user.jpg" class="responsive" alt="..." style="max-width: 197px;">
          <br>
          <h3 class="card-title" style="position:relative; text-align: center;">{{account.names}}</h3>
          <br>
          <h5 class="card-subtitle mb-2 text-muted"><b>Codigo: </b>{{account.id}}</h5>
          <br>
          <h5 class="card-text"><b>Usuario: </b>{{account.username}}</h5>
          <br>
          <h5 class="card-text"><b>Email: </b>{{account.email}}</h5>
        </div>
        <div class="card-footer">
          <Button class="p-button-raised p-button-help" icon="pi pi-replay" label="Actualizar" style="background-color: #883cae;" @click="showEditModal"/>
          <Button class="p-button-raised p-button-danger" icon="pi pi-trash" label="Dar de Baja" @click="openConfirmation"/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path = "persona?access_token=" + getAuthenticationToken() ;
const path2 = "usuario/editar/";
const path3 = "usuario/delete/";
const path4 = "Establecimientos";

export default {
  name: "ClientAccount",
  data() {
    return {
      account: null,
      establecimientos: null,
      displayConfirmation: false,
      displayModal: false,
      data: {
        id: null,
        name: null,
        email: null,
        username: null,
      },
    };
  },
  mounted(){
    this.Prueba();
    this.ShowEstablecimientos();
  },
  methods:{
    ShowEstablecimientos() {
      axios.get(this.$store.state.backURL + path4, {
      })
      .then(response => {
          this.establecimientos = response.data;
          this.establecimientos.cupoMax = this.establecimientos.cupoMax - this.disponible;
      })
      .catch(err => {
          alert(err);
      })
    },
    Prueba() {
       axios.get(this.$store.state.backURL + path, {
       })
      .then(response => {
        this.account = response.data;
      })
      .catch(err => {
        alert(err);
      })
    },
    Editar() {
      axios
        .put(this.$store.state.backURL + path2 + this.account.id + "?access_token=" + getAuthenticationToken(), {
          names: this.account.names,
          username: this.account.username,
          email: this.account.email
        })
        .then(response => {
          console.log(response.data);
          this.$toast.add({severity:'success', summary: 'Actualizado', detail:'Se ha actualizado correctamente tus datos.', life: 3000});  
          this.closeModal();
        })
        .catch(error => {
          alert(this.account.id);
          alert(error);
        });
    },
    Borrar(){
      axios.delete(this.$store.state.backURL + path3 + this.account.id + "?access_token=" + getAuthenticationToken(), {data: {foo: 'bar'}
            })
            .then(response => {
              this.$toast.add({severity:'error', summary: '¿Por qué te fuiste ?', detail:'Se ha eliminado tu cuenta.', life: 3000});
              console.log(response);
              alert("Usuario borrado");
              this.$router.push("/welcome");
            })  
    },
    showSaveModal() {
      this.displayModal = true;
    },
    showEditModal() {
      this.data;
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false;
    },
    openConfirmation() {
        this.displayConfirmation = true;
    },
    closeConfirmation() {
        this.displayConfirmation = false;
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Orbitron');
.myaccount {
  position: relative;
  background: url("../img/fondo.jpeg") no-repeat;
  background-size: cover;
  background-position: center center;
  color: white;
  padding: 0px;
  margin: 0%;
  width: 100%;
  height: 100vh; 
}

.modal-title {
  font-family: Orbitron;
  position: relative;
  color:black;
  left: 32%; 
}
.product-item .product-item-content {
  position: relative;
  border: 1px solid var(--surface-d);
  box-shadow: 0 0 5px#1eb1eb, 0 0 5px white, 0 0 5px #1eb1eb;
  border-radius: 30px;
  margin: .3rem;
  text-align: center;
  padding: 2rem 0;
}

.product-image {
    width: 50%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}

.Menu {
  position: relative;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
h4{
  display: inline-block;
  margin: 0 20px;
}

</style>