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
    <div class="Establecimientos">
      <DataTable ref="dt" :value="establecimientos" :selection.sync="selectedEstablecimiento" dataKey="id" 
        :paginator="true" :rows="4" :filters="filters" 
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Resultados de {first} a {last} de {totalRecords} establecimientos" style="border-radius: 30px;">
        <template #header>
          <div class="table-header" style="position:relative; left:23%; width:30%;">
            <span class="p-input-icon-left">
              <i class="pi pi-search" style="color:#883cae "/>
              <InputText v-model="filters['global']" placeholder="Buscador de Establecimientos" style="width:300%; color:#883cae; border: 2px solid #883cae;"  />
            </span>
          </div>
          <br>
        </template>
        <Column selectionMode="multiple" headerStyle="width: 4rem"></Column>
        <Column headerStyle="width: 5rem">
          <template #body="slotProps">
              <Button icon="pi pi-eye"  @click="showEstDialog(slotProps.data),ActFav(slotProps.data.id)" />
          </template>
        </Column>
        <Column field="estName" header="Establecimiento" :sortable="true" >
          <template #filter>
            <InputText type="text" v-model="filters['estName']" class="p-column-filter" placeholder="Buscar por nombre" />
          </template>
        </Column>
        <Column field="id" header="Direccion" sortable></Column>
        <Column field="tel" header="Telefono" sortable></Column>
        <Column field="tipoEstablecimiento" header="Categoria" :sortable="true" filterMatchMode="equals">
          <template #body="slotProps">
            <span :class="'customer-badge tipoEstablecimiento-' + slotProps.data.tipoEstablecimiento">{{slotProps.data.tipoEstablecimiento}}</span>
          </template>
          <template #filter>
            <Dropdown v-model="filters['tipoEstablecimiento']" :options="tipoEstablecimiento" placeholder="Todas" class="p-column-filter" :showClear="true">
              <template #option="slotProps">
                  <span :class="'customer-badge tipoEstablecimiento-' + slotProps.option">{{slotProps.option}}</span>
              </template>
            </Dropdown>
          </template>
        </Column>
        <Column field="cupoMax" header="Cupo Disponible" sortable>
          <template #body="slotProps">
            <ProgressBar :value="slotProps.data.cupoMax" :showValue="false" style=" height:10px;"/>
          </template>
        </Column>
        <Column>
            <template #body="slotProps">  
              <Button type="button" label="Hacer Reserva" @click="showbookingDialog(slotProps.data)" aria:haspopup="true" aria-controls="overlay_panel"/> 
            </template>   
        </Column>
        <template #empty>
            No se encontraron establecimientos.
        </template>
      </DataTable>
    </div>

    <div class="Informacion">
      <Dialog :visible.sync="estDialog" :style="{width: '500px'}" header="Informacion del Establecimiento" :modal="true" class="p-fluid">
        <div class="p-field" style="text-align: center; font-family: Orbitron; color:#455eff; height: 52px;">
            <h2>{{establecimiento.estName}}</h2>
        </div >
        <div style="position:relative; height: 32px;">
          <h5>Personas actualmente: {{aforo}}</h5>
        </div>
        <div class="Botones">
          <Button label="Mostrar aforo" class="p-button-raised p-button-success" style="position: relative; left:70%; width: 30%; transform: translateY(30%);"/>
          <InputSwitch v-model="favorite" style="position: relative; left:-30%; " @click="AddFav(favorite)" />
          <br>
          <h3 style="position: relative; font-family: Orbitron; font-size: 20px;">Favoritos</h3>
          <br>        
        </div>
        <div style="position: relative; height: 47px;">
          <h5>Categoria:</h5>
          <RadioButton inputId="tipoEstablecimiento" name="city" :value="establecimiento.tipoEstablecimiento" v-model="establecimiento.tipoEstablecimiento" style="position: relative; left:24%; transform: translateY(-215%);"/>
          <label for="tipoEstablecimiento" style="position: relative; font-size: 18px; font-weight: 499; left:25%; transform: translateY(-120%);">{{ establecimiento.tipoEstablecimiento}} </label>
        </div>
        <div class="Detalles" style="position: relative; height: 83px;">
          <h5>Dirección:</h5><p>{{establecimiento.dir}}</p>
          <div class="tel" style="position: relative; left: 65%; width: 20%; transform: translateY(-130%);">
            <h5 id="Telef">Telefono:</h5><p>{{establecimiento.tel}}</p>
          </div>
        </div>
        <div class="p-field">
            <h5>Muro:</h5>
            <Textarea id="description" v-model="establecimiento.muro" required="true" rows="3" cols="20" disabled />
            <br>
        </div>
            <h5>Flujo de Personas:</h5>
            <Chart type="bar" :data="basicData" />
            <br>
        <div class="Mapa">
          <h5>Mapa:</h5>
          <GoogleMap style="position: relative;" :latitude= parseFloat(establecimiento.latitud) :longitude= parseFloat(establecimiento.longitud) />
        </div>
      </Dialog>
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
          <Button label="Reservar" icon="pi pi-check" @click="Reservar()" />
          <Button label="Cancelar" icon="pi pi-times" @click="closebookingDialog()" class="p-button-secondary" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import GoogleMap from "./GoogleMap";
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path = "Establecimientos"
const path2 = "persona?access_token=" + getAuthenticationToken() ;
const path3 = "cliente/establecimientos/reservas?access_token="
const path4 = "cliente/establecimientos/favoritos?access_token="
const path5 = "cliente/establecimientos/misfavoritos/"
const path6 = "cliente/establecimientos/favoritos?access_token=" + getAuthenticationToken() ;
const access = "?access_token="

export default {
  name: 'search',
  components: {
    GoogleMap
  },
  data(){
    return{
            account: null,
            establecimientos: null,
            establecimiento: {},
            favoriteslist: null,
            favorite: false,
            aforo: 20,
            estDialog: false,
            bookingDialog: false,
            selectedhour: null,
            selectedEstablecimiento: null,
            filters: {},
            filters1: {},
            submitted: false,
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
            tipoEstablecimiento: [
                'Restaurante', 'Gimnasio', 'Supermercado', 'Barberia', 'Motel'
            ],
            basicData: {
              labels: ['7-9', '9-11', '11-1', '1-3', '3-5', '5-7', '7-9','9-11'],
              datasets: [
                {
                  label: 'Personas',
                  backgroundColor: '#458fff',
                  data: [59, 63, 69, 75, 80, 100, 99, 70]
                },
              ]
            },
            items: [
                {
                    label: "Home",
                    icon:'pi pi-home',
                    to: "/home"
                }
            ],
            items1: [
                {
                    label: 'Cliente',
                    icon:'pi pi-fw pi-user',
                    items:[
                        {
                          label: 'Mi Cuenta ',
                          icon:'pi pi-fw pi-user',
                          to: '/myaccount'
                        },
                        {
                          label: 'Cerrar Sesion',
                          icon:'pi pi-fw pi-power-off',
                          to: '/login'
                        }
                    ]
                },
            ],
        }
  },
   mounted(){
    this.ShowEstablecimientos();
    this.Persona();
  },
  methods: {
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
    Persona() {
       axios.get(this.$store.state.backURL + path2, {
       })
      .then(response => {
        this.account = response.data;
        this.Favorites();
      })
      .catch(err => {
        alert(err);
      })
    },
    Reservar() {
      axios.post(this.$store.state.backURL + path3 + getAuthenticationToken(), {
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
    Favorites() {
       axios.get(this.$store.state.backURL + path5 + this.account.id + access + getAuthenticationToken(), {
       })
      .then(response => {
        this.favoriteslist = response.data;
      })
      .catch(err => {
        alert(err);
      })
    },
    IsFavorite(idEst){
      var isfavorite = false;
      for (var i = 0; i < this.favoriteslist.length; i++){
        if (this.favoriteslist[i].id==idEst){
          isfavorite = true;
        }
      }
      return isfavorite;
    },
    ActFav(idEst){
      this.favorite = this.IsFavorite(idEst)
    },
    AddFav(fav) {
      if(fav==false){
          axios.post(this.$store.state.backURL + path4 + getAuthenticationToken(), {
          userID: this.account.id,
          estID: this.establecimiento.id
        })
        .then(response => {
            console.log(response.data);
            alert("Agregado");
            location.reload();
        })
        .catch(err => {
            alert(err);
        })
      }else{
        axios.delete(this.$store.state.backURL + path6, { data: {
          userID: this.account.id,
          estID: this.establecimiento.id}, 
        })
        .then(response => {
            console.log(response.data);
            this.$toast.add({severity:'success', summary: 'Borrado de favoritos', detail:'',  life: 2000});
            location.reload();
        })
        .catch(err => {
            alert(err);
            

        })
      }
    },
    showEstDialog(establecimiento) {
      this.establecimiento = {...establecimiento};
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
@import url('https://fonts.googleapis.com/css?family=Orbitron');
.User {
  position: relative;
  background: url("../img/fondo.jpeg") no-repeat;
  background-size: cover;
  background-position: center center;
  background-color: #3d0c421a;
  color: white;
  width: 100%;
  height: 100%; 
    
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