<template>
  <div class="User">
    <div class="Menu">
            <Menubar :model="items">
                <template #end>
                    <Menubar :model="items1"/>
                </template>
            </Menubar>
    </div>
    <TabView>
      <TabPanel header="Mis Favoritos">
        <div class="Establecimientos">
          <OrderList v-model="establecimientos"  dataKey="id" >
              <template #header>
                  Favoritos
              </template>
              <template #item="slotProps" >
                  <div class="product-item">
                      <div class="product-list-detail" >
                        <h5 class="p-mb-2 ">{{slotProps.item.estName}}</h5>
                        <h6 class="p-mb-2">{{slotProps.item.tipoEstablecimiento}}</h6>
                        <span class="product-category">{{slotProps.item.dir}}</span>
                      </div>
                      <div class="product-list-action">
                          <span :class="'product-badge status-'+slotProps.item.tipoEstablecimiento.toLowerCase()">{{slotProps.item.tel}}</span>
                      </div>
                  </div>
              </template>
          </OrderList>
        </div> 
      </TabPanel>
      <TabPanel header="Mis reservas">
        <div class="Datos">
            <DataTable :value="establecimientos" :expandedRows.sync="expandedRows" dataKey="id" :paginator="true" :rows="1"
                @row-expand="onRowExpand" @row-collapse="onRowCollapse">
                <Column :expander="true" headerStyle="width: 3rem" />
                <Column field="estName" header="Nombre Establecimiento" sortable></Column>
                <Column field="dir" header="Direccion" sortable></Column>
                <Column field="tel" header="Telefono" sortable></Column>
                <Column field="tipoEstablecimiento" header="Categoria" sortable></Column>
                <Column field="cupoMax" header="Cupo Maximo" sortable></Column>
                <template #expansion="slotProps">
                    <div class="orders-subtable">
                        <div class="p-field" style="text-align: center; font-family: Orbitron; color:#455eff; height: 52px;">
                            <h2>{{slotProps.data.estName}}</h2>
                        </div >
                        <div style="position:relative; height: 32px;">
                            <h5>Personas actualmente: 20</h5>
                        </div>
                        <div class="Botones">
                            <Button label="Mostrar aforo" class="p-button-raised p-button-success" style="position: relative; left:70%; width: 30%; transform: translateY(30%);"/>
                            <br>     
                        </div>
                        <div style="position: relative; height: 47px;">
                            <h5>Categoria:</h5>
                            <RadioButton inputId="tipoEstablecimiento" name="categoria" :value="slotProps.data.tipoEstablecimiento" v-model="slotProps.data.tipoEstablecimiento" style="position: relative; left:8%; transform: translateY(-215%);"/>
                            <label for="tipoEstablecimiento" style="position: relative; font-size: 18px; font-weight: 499; left:8%; transform: translateY(-120%);">{{ slotProps.data.tipoEstablecimiento}} </label>
                        </div>
                        <div class="Detalles" style="position: relative; height: 83px;">
                            <h5>Dirección:</h5><p>{{slotProps.data.dir}}</p>
                            <div class="tel" style="position: relative; left: 65%; width: 20%; transform: translateY(-130%);">
                                <h5 id="Telef">Telefono:</h5><p>{{slotProps.data.tel}}</p>
                            </div>
                        </div>
                        <div class="p-field">
                            <h5>Muro:</h5>
                            <Textarea v-model="slotProps.data.muro" :autoResize="true" rows="5" cols="30" />
                            <br>
                        </div>
                            <h5>Flujo de Personas:</h5>
                            <Chart type="bar" :data="basicData" />
                            <br>
                        <div class="Mapa">
                            <h5>Mapa:</h5>
                            <GoogleMap style="position: relative;" :latitude= 4.636236781881298 :longitude= -74.07929296709305 />
                        </div>
                    </div>
                </template>
            </DataTable>
        </div>
      </TabPanel>
    </TabView>
     
  </div>
</template>

<script>
import axios from "axios";
import image from "../img/restaurante.jpg"

const path = "Establecimientos"

export default {
  name: 'HomeUser',
  data(){
    return{
            establecimientos: null,
            aforo: 20,
            estDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            establecimiento: {},
            selectedEstablecimiento: {},
            filters: {},
            filters1: {},
            submitted: false,
            image: image,
            expandedRows: [],
            tipoEstablecimiento: [
                'Restaurante', 'Gimnasio', 'Supermercado', 'Barberia', 'Motel'
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
            items: [
                {
                    label: "Home",
                    icon:'pi pi-home',
                    to: "/home"
                },
                {
                    label: "Buscador de Establecimientos",
                    icon: "pi pi-search",
                    to: '/search'
                },
                {
                    label: "Mis reservas",
                    icon: "pi pi-calendar",
                    to: '/myaccount'
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
    showEstDialog() {
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
