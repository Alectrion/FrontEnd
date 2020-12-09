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
              <h4 class="nav-link"><router-link to='/home' style="position: relative; color: white; text-decoration: none; left:5%;" title='Search'> Bienvenido {{account.names}} </router-link></h4>
            </li>
          </ul>
          <ul class="navbar-nav ml-md-auto">
            <li class="nav-item dropdown" >
              <h4 class="nav-link dropdown-toggle dropdown-toggle-split" id="navbarDropdown" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:white">
                 <router-link to='' style="color: white; text-decoration: none" title='usuario'> Propietario </router-link>
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
        <li class="nav-item">
          <h5 class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Mis Establecimientos</h5>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <div class="Datos Establecimientos">
            <Carousel :value="establecimientos" :numVisible="1" :numScroll="1" :selection.sync="selectedEstablecimiento" dataKey="id"  
              :responsiveOptions="responsiveOptions" class="custom-carousel" :circular="true"  
              style="max-width: 695px; position:relative; left:24%">
                <template #item="slotProps">
                  <div class="product-item">
                    <div class="product-item-content">
                      <div class="p-mb-3">
                        
                      </div>
                      <div>
                        <br>
                        <h1 class="p-mb-1" style="color:#455eff;"><b>{{slotProps.data.estName}}</b></h1><br>
                        <h5 class="p-mt-0 p-mb-3" style="color:#7f8182;"><b>Código: </b>{{slotProps.data.id}}</h5>
                        <h5 class="p-mt-0 p-mb-3"><b>Dirección: </b>{{slotProps.data.dir}}</h5>
                        <h5 class="p-mt-0 p-mb-3"><b>Teléfono: </b>{{slotProps.data.tel}}</h5>
                        <span class="badge badge-pill badge-primary" style="font-size: 20px">{{slotProps.data.tipoEstablecimiento}}</span>
                        <div class="car-buttons p-mt-5">  
                          <Button class="p-button-raised p-button-help" icon="pi pi-calendar" @click="showocupDialog(slotProps.data)" label="Reservas de mi establecimiento"  style="background-color: #883cae; font-weight: 700;" />
                        </div>
                        <br>
                        <h5 class="p-mt-0 p-mb-3"><b>Muro: </b></h5>
                        <Textarea id="description" v-model="slotProps.data.muro" required="true" rows="5" cols="65" placeholder="Muro"  style="background: #eae4eb; position: relative; left:3%" />
                        <Button icon="pi pi-check" class="p-button-rounded p-button-text"  @click="Editar(slotProps.data.muro)" style="position: relative;  width: 5%; left:-5%"/>
                        <br><br>
                        <h5>Mapa:</h5>
                        <GoogleMap style="position: relative; " :latitude= parseFloat(slotProps.data.latitud) :longitude= parseFloat(slotProps.data.longitud) />
                      </div>
                    </div>
                  </div>
                </template>
              </Carousel>
          </div>
        </div>
    </div>
    <div class="Reserva" >
      <Dialog :style="{width: '40vw'}" position="right" :visible.sync="ocupDialog" :modal="true">
        <template #header>
          <br>
          <h2 style="color: #883cae; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">{{selectedEstablecimiento.estName}}</h2>
        </template>
          <DataTable :value="ocupaciones" selectionMode="single" :paginator="true" dataKey="name" :rows="4">
            <h3 style="color: #883cae; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Reservas del Establecimiento</h3>
            <Column field="hora" header="Hora" sortable></Column>
          </DataTable>
      </Dialog>
    </div>   
  </div>
</template>

<script>
import GoogleMap from "./GoogleMap";
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path = "propietario/establecimiento"
const path3 = "persona?access_token=" + getAuthenticationToken() ;
//const path2 = "propietario/establecimientos/misreservas/";
//const access = "?access_token="
const path4 = "ocupaciones"

export default {
    name: "HomeOwner",
    components: {
      GoogleMap 
    },
    data() {
    return {
            account: null,
            establecimientos: null,
            establecimiento: {},
            selectedEstablecimiento: {},
            ocupaciones: null,
            displayModal: false,
            ocupDialog: false,
            editModal: false,
            EstInfo: false,
            favoritos: false,
            expandedRows: [],
            data: {
                id: null,
                nombre: null,
                direccion: null,
                telefono: null,
                cupo: null,
                categoria: null,
                muro:null
            },
            categorias: [
                'Restaurante', 'Gimnasio', 'Supermercado', 'Barberia', 'Motel'
            ],
            basicData: {
              labels: ['7am - 8am', '8am - 9am', '9am - 10am', '10am - 11am', '11am - 12pm', '12pm - 1pm', '1pm - 2pm','2pm - 3pm'],
              datasets: [
                {
                  label: 'Personas',
                  backgroundColor: '#458fff',
                  data: [59, 63, 69, 75, 80, 100, 99, 70]
                },
              ]
            },
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
        };
    },
    mounted(){
        this.ShowEstablecimientos();
        this.Prueba();
        this.EstablecimientosOcup();
    },

    methods:{
        Prueba() {
            axios.get(this.$store.state.backURL + path3, {
            })
            .then(response => {
                this.account = response.data;
            })
            .catch(err => {
                alert(err);
            })
        },
        ShowEstablecimientos() {
            axios.get(this.$store.state.backURL + path + "?access_token=" + getAuthenticationToken(), {
            })
            .then(response => {
                this.establecimientos = response.data;
            })
            .catch(err => {
                alert(err);
            })
        },
        EstablecimientosOcup(){
          axios.get(this.$store.state.backURL + path4, {
          })
          .then(response => {
            this.ocupaciones = response.data;
          })
          .catch(err => {
            alert(err);
          })
        },
        Editar() {
            axios.put(this.$store.state.backURL + path + "/editar/" + this.selectedEstablecimiento.id + "?access_token=" + getAuthenticationToken(), {
                estName: this.selectedEstablecimiento.estName,
                dir: this.selectedEstablecimiento.dir,
                tel: this.selectedEstablecimiento.tel,
                cupoMax: this.selectedEstablecimiento.cupoMax,
                tipoEstablecimiento: this.selectedEstablecimiento.tipoEstablecimiento,
                muro: this.selectedEstablecimiento.muro
            })
            .then(response => {
                this.establecimientos = response.data;
                alert("Actualizado")
            })
            .catch(err => {
                alert(err);
            })
            location.reload();
        },
        showSaveModal() {
            this.displayModal = true;
        },
        showEditModal() {
            this.editModal = true;
        },
        showocupDialog(selectedEstablecimiento){
            this.selectedEstablecimiento = {...selectedEstablecimiento};
            this.ocupDialog = true;
        },
        closeModal() {
            this.displayModal = false;
            this.editModal = false;
            this.ocupDialog = false;
        },
    }
};
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
  height: 100%; 
    
}

.product-item .product-item-content {
  position: relative;
  border: 1px solid var(--surface-d);
  box-shadow: 0 0 5px#883cae, 0 0 5px white, 0 0 5px #883cae;
  border-radius: 10px;
  margin: .3rem;
  text-align: center;
  background: rgb(255, 255, 255, 0.3);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
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