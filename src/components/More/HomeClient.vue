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
      <OrderList v-model="establecimientos" listStyle="height:auto" dataKey="id">
          <template #header>
              List of Products
          </template>
          <template #body="slotProps">
              <div class="product-item">
                  <div class="product-list-detail">
                      <h5 class="p-mb-2">{{slotProps.data.estName}}</h5>
                      <i class="pi pi-tag product-category-icon"></i>
                      <span class="product-category">{{slotProps.data.tipoEstablecimiento}}</span>
                  </div>
                  <div class="product-list-action">
                      <h6 class="p-mb-2">${{slotProps.data.dir}}</h6>
                      <span :class="'product-badge status-'+slotProps.data.dir.toLowerCase()">{{slotProps.data.dir}}</span>
                  </div>
              </div>
          </template>
      </OrderList>
    </div>
      
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
