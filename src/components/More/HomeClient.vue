<template>
  <div class="User">
    <Toast position="top-left"/>
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
    <br>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <br>
      <br>
        <li class="nav-item">
          <h5 class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Mis Favoritos</h5>
        </li>
        <li class="nav-item">
          <h5 class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Mis Reservas</h5>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
           <div class="Misfav" style="position:relative; ">
              <Carousel :value="establecimientos" :numVisible="3" :numScroll="1" :selection.sync="selectedEstablecimiento" dataKey="id"  :responsiveOptions="responsiveOptions" class="custom-carousel" :circular="true" :autoplayInterval="3000">
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
                            <Button icon="pi pi-star" class="p-button-success p-button-rounded p-mr-2"  />
                            <Button icon="pi pi-calendar" class="p-button-info p-button-rounded" @click="showbookingDialog(slotProps.data)" />
                        </div> 
                      </div>
                    </div>
                  </div>
                </template>
              </Carousel>
            </div> 
        </div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          Hola2
        </div>
      </div>
    <div class="Favoritos">
    </div>
    <div class="Reserva" >
      <Dialog  footer="Footer" :style="{width: '40vw'}" position="right" :visible.sync="bookingDialog" :modal="true">
        <template #header>
          <br>
          <h2 style="color: #883cae; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">{{establecimiento.estName}}</h2>
        </template>
          <DataTable :value="hours" :selection.sync="selectedhour" selectionMode="single" :paginator="true" dataKey="name" :rows="4">
            <h3 style="color: #883cae; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Reserva</h3>
            <Column field="name" header="Hora" sortable></Column>
          </DataTable>
        <template #footer>
          <Button label="Reservar" icon="pi pi-check" @click="Reservar" />
          <Button label="Cancelar" icon="pi pi-times" @click="closebookingDialog" class="p-button-secondary" />
        </template>
      </Dialog>
    </div> 
  </div>
</template>

<script>

import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path = "Establecimientos"
const path2 = "cliente/establecimientos/"
const path3 = "persona?access_token=" + getAuthenticationToken() ;

export default {
  name: 'HomeUser',
  components: {
  
  },
  data(){
    return{
            account: null,
            establecimientos: null,
            establecimiento: {},
            estDialog: false,
            bookingDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            selectedhour: null,
            selectedEstablecimiento: null,
            filters: {},
            filters1: {},
            submitted: false,
            expandedRows: [],
            tipoEstablecimiento: [
                'Restaurante', 'Gimnasio', 'Supermercado', 'Barberia', 'Motel'
            ],
            hours: [
                {name: '7am - 8am'},
                {name: '8am - 9am'},
                {name: '9am - 10am'},
                {name: '10am - 11am'},
                {name: '11am - 12pm'},
                {name: '12pm - 1pm'},
                {name: '1pm - 2pm'},
                {name: '2pm - 3pm'},
                {name: '3pm - 4pm'},
                {name: '4pm - 5pm'},
                {name: '5pm - 6pm'},
                {name: '6pm - 7pm'},
                {name: '7pm - 8pm'},
                {name: '8pm - 9pm'},
                {name: '9pm - 10pm' }
            ],
            basicData: {
              labels: ['7-9', '9-11', '11-1', '1-3', '3-5', '5-7', '7-9','9-11'],
              datasets: [
                {
                  label: 'Personas',
                  backgroundColor: '#7E57C2',
                  data: [59, 68, 80, 91, 100, 75, 60, 30]
                },
              ]
            },
            responsiveOptions: [
              {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
              },
              {
                breakpoint: '600px',
                numVisible: 2,
                numScroll: 2
              },
              {
                breakpoint: '480px',
                numVisible: 1,
                numScroll: 1
              }
            ],
        }
  },
   mounted(){
        this.ShowEstablecimientos();
        this.Persona();
    },
  
  methods: {
    Persona() {
       axios.get(this.$store.state.backURL + path3, {
       })
      .then(response => {
        this.account = response.data;
        this.cuenta = this.account.id;

      })
      .catch(err => {
        alert(err);
      })
    },
    ShowEstablecimientos() {
      axios.get(this.$store.state.backURL + path, {
      })
      .then(response => {
          this.establecimientos = response.data;
          this.establecimientos.cupoMax = this.establecimientos.cupoMax - this.disponible;
      })
      .catch(err => {
          alert(err);
      })
    },
    ShowFavs() {
      axios.get(this.$store.state.backURL + path2 + this.account.id + "?access_token=" + getAuthenticationToken(), {
      })
      .then(response => {
          this.establecimientos1 = response.data;
      })
      .catch(err => {
          alert(err);
      })
    },
    AddFav() {
      axios.post(this.$store.state.backURL + path2 + "favoritos" + getAuthenticationToken(), {
        userID: this.account.id,
        estID: this.establecimiento.id
      })
      .then(response => {
          console.log(response.data);
          alert("Success");
      })
      .catch(err => {
          alert(err);
      })
    },
    Reservar() {
      axios.post(this.$store.state.backURL + path2 + "reservas?access_token=" + getAuthenticationToken(), {
        userID: this.account.id,
        estID: this.establecimiento.id,
        horario: this.selectedhour.name
      })
      .then(response => {
          console.log(response.data);
          this.$toast.add({severity:'success', summary: 'Reserva Exitosa!', detail:'Se agrego correctamente la reserva de ' 
          + this.establecimiento.estName  + '\n' + ' A las: ' + this.selectedhour.name ,  life: 4000});
      })
      .catch(err => {
          alert(err);
      })
    },
    showEstDialog() {
      this.estDialog= true;
    },
    closeEstDialog() {
      this.estDialog = false;
    },
    showbookingDialog(establecimiento) {
      this.establecimiento = {...establecimiento};
      this.bookingDialog= true;
    },
    closebookingDialog() {
      this.bookingDialog = false;
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open Sans');
.User {
   
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
  color:white;
}

h4{
  display: inline-block;
  margin: 0 20px;
}
</style>