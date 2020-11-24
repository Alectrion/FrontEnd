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
                <Button label="Hacer Reserva" @click="editProduct(slotProps.data)"/>
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
            <h5>Descripcion:</h5>
            <Textarea id="description" v-model="establecimiento.dir" required="true" rows="3" cols="20" disabled />
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
            establecimientos: null,
            favoritos: false,
            aforo: 20,
            estDialog: false,
            establecimiento: {},
            selectedEstablecimiento: null,
            filters: {},
            filters1: {},
            submitted: false,
            city: 'true',
            image: image,
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