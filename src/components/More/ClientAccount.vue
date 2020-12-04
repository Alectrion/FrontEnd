<template >
    <div class="myaccount">
      <div class="Menu">
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
              <li class="nav-item dropdown" >
                <h4 class="nav-link dropdown-toggle dropdown-toggle-split" id="navbarDropdown" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:white">
                <router-link to='' style="color: white; text-decoration: none" title='usuario'>  Usuario </router-link>
                </h4>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <h5 class="dropdown-item"><router-link to='/myaccount' style="color: black; text-decoration: none" title='myaccount'>Mi Cuenta</router-link></h5>
                  <div class="dropdown-divider"></div>
                  <h5 class="dropdown-item"><router-link to='/welcome' style="color: black; text-decoration: none" title='Logout'>Cerrar Sesion</router-link></h5>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
            <Dialog header="Editar Cuenta" :visible.sync="displayModal" :modal="true">
                <span class="p-float-label">
                   <InputText type="text" v-model="account.username" disabled />
                    <label for="name"></label>
                </span>
                <br />
                <span class="p-float-label">
                    <InputText id="name" type="text" required v-model="account.names" autocomplete="off" placeholder="Nombre"/>
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

            <Dialog header="Dar de baja a mi cuenta" :visible.sync="displayConfirmation" :style="{width: '350px'}" :modal="true">
              <div class="confirmation-content">
                  <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                  <span>¿Estas seguro de eliminar tu cuenta?</span>
              </div>
              <template #footer>
                <Button label="Si, adios." icon="pi pi-check" @click="Borrar" class="p-button-text" autofocus />
                <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
              </template>
          </Dialog>
        <div class="datos">
          <Accordion>
            <AccordionTab header="Mi Cuenta" :active="false" style="color: white; background: white;">
              <div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="../img/user.jpg" class="card-img" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body" style="color: black;">
                      <h5 class="card-title">{{account.names}}</h5>
                      <p class="card-text">Usuario: {{account.username}}</p>
                      <p class="card-text">Email: {{account.email}}</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                    <div class="card-footer">
                      <Button label="Editar" style="background-color: #883cae; border-color: #3d0c421a;" class="p-button-rounded p-button-info" icon="pi pi-pencil" @click="showEditModal"/>
                      <Button class="p-button-rounded p-button-danger" icon="pi pi-trash" @click="openConfirmation"/>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionTab>
          </Accordion>
      </div>
      <div class="Misfav" style="position: relative;">
        <br>
        <Carousel :value="establecimientos" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" class="custom-carousel" :circular="true" :autoplayInterval="3000">
          <template #item="slotProps">
            <div class="product-item">
              <div class="product-item-content">
                <div class="p-mb-3">
                  
                </div>
                <div>
                  <h2 class="p-mb-1">{{slotProps.data.estName}}</h2>
                  <h6 class="p-mt-0 p-mb-3">{{slotProps.data.dir}}</h6>
                  <div class="car-buttons p-mt-5">
                    <Button icon="pi pi-eye" class="p-button p-button-rounded p-mr-2" />
                    <Button icon="pi pi-star" class="p-button-success p-button-rounded p-mr-2" />
                    <Button icon="pi pi-cog" class="p-button-help p-button-rounded" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Carousel>
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
      data: {
        id: null,
        name: null,
        email: null,
        username: null,
      },
      items: [
                {
                    label: "HOME",
                    icon:'pi pi-home',
                    to: "/home"
                },
            ],
            items1: [
                {
                    label: "Mi Cuenta",
                    icon:'pi pi-fw pi-user',
                    items:[
                        {
                            label: 'Cerrar Sesion',
                            icon:'pi pi-fw pi-power-off',
                            to: '/login'
                        }
                    ]
                },
            ],
            displayModal: false
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
          alert("Actualizado");
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
                location.reload();
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
  background-color: #3d0c421a;
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