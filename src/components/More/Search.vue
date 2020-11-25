<template>
  <div class="User">
    <div class="Menu">
            <Menubar :model="items">
                <template #end>
                    <Menubar :model="items1"/>
                </template>
            </Menubar>
    </div>
    <div class="Establecimientos">
      <DataTable ref="dt" :value="establecimientos" :selection.sync="selectedEstablecimiento" dataKey="id"
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Resultados de {first} a {last} de {totalRecords} establecimientos">
        <template #header>
          <div class="table-header" style="position:relative; left:23%; width:30%;">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global']" placeholder="Buscador de Establecimientos" style="width:300%; border: 2px solid purple;"  />
            </span>
          </div>
          <br>
        </template>
        <Column selectionMode="multiple" headerStyle="width: 4rem"></Column>
        <Column headerStyle="width: 5rem">
          <template #body="slotProps">
              <Button icon="pi pi-eye"  @click="showEstDialog(slotProps.data)" />
          </template>
        </Column>
        <Column field="estName" header="Establecimiento" :sortable="true" >
          <template #filter>
            <InputText type="text" v-model="filters['estName']" class="p-column-filter" placeholder="Buscar por nombre" />
          </template>
        </Column>
        <Column field="dir" header="Direccion" sortable></Column>
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
              <Button type="button" label="Hacer Reserva" @click="toggle(slotProps.data)" aria:haspopup="true" aria-controls="overlay_panel"/> 
              <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 450px">
                <DataTable :value="hours" :selection.sync="selectedhour" selectionMode="single" :paginator="true" :rows="5" @row-select="onProductSelect">
                  <h3 style=" font-family: Orbitron;">{{establecimiento.estName}}</h3>
                    <Column field="name" header="Hora" sortable></Column>
                </DataTable>
            </OverlayPanel>
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
          <InputSwitch v-model="favoritos" style="position: relative; left:-30%; "/>
          <br>
          <h4 style="position: relative; font-family: Orbitron; font-size: 20px;">Favoritos</h4>
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
          <GoogleMap style="position: relative;" :latitude= 4.636236781881298 :longitude= -74.07929296709305 />
        </div>
      </Dialog>
    </div>
    <div class="Reserva" style="position: relative; width: 20%; height: 100%" >
      <Dialog :visible.sync="bookingDialog" :style="{width: '50vw'}" :header = "establecimiento.estName" :modal="true" class="p-fluid">
        <h4>Reserva</h4>
        <Dropdown v-model="selectedhour" :options="hours" optionLabel="name" placeholder="Seleccione un horario" :editable="true" />
        <img :src="image" class="product-image" style="position:relative; width: 200px; left: 25%;"/>
        <template #footer>
          <Button label="Guardar" icon="pi pi-check" />
          <Button label="Cancelar" icon="pi pi-times" @click="closebookingDialog()" class="p-button-secondary" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import GoogleMap from "./GoogleMap";
import axios from "axios";
import image from "../img/restaurante.jpg"
const path = "Establecimientos"

export default {
  name: 'search',
  components: {
    GoogleMap
  },
  data(){
    return{
            selectedhour: null,
            establecimientos: null,
            favoritos: false,
            aforo: 20,
            estDialog: false,
            bookingDialog: false,
            establecimiento: {},
            selectedEstablecimiento: null,
            filters: {},
            filters1: {},
            submitted: false,
            image: image,
            hours: [
                {name: '7am - 8am', code: '7'},
                {name: '8am - 9am', code: '8'},
                {name: '9am - 10am', code: '9'},
                {name: '10am - 11am', code: '10'},
                {name: '11am - 12pm', code: '11'},
                {name: '12pm - 1pm', code: '12'},
                {name: '1pm - 2pm', code: '13'},
                {name: '2pm - 3pm', code: '14'},
                {name: '3pm - 4pm', code: '15'},
                {name: '4pm - 5pm', code: '16'},
                {name: '5pm - 6pm', code: '17'},
                {name: '6pm - 7pm', code: '18'},
                {name: '7pm - 8pm', code: '19'},
                {name: '8pm - 9pm', code: '20'},
                {name: '9pm - 10pm', code: '21'}
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
    },
  methods: {
    onLogout() {
      this.$store.dispatch("doLogout");
      this.$router.push("Welcome");
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
    toggle(establecimiento, event ) {
      this.establecimiento = {...establecimiento};
      this.$refs.op.toggle(event);
    },
    onProductSelect(event) {
        this.$refs.op.hide();
        this.$toast.add({severity:'info', summary: 'Hora Seleccionada', detail: event.data.estName, life: 3000});
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Orbitron');
.User {
    position: absolute;
    background-color: #3d0c421a;
    padding: 0px;
    margin: 0%;
    width: 100%;
    height: 100%;
    font-family: Orbitron;
    
}

</style>