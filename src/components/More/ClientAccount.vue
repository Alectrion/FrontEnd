<template >
    <div class="myaccount">
      <div class="Menu">
            <Menubar :model="items" style="letter-spacing: 1px; font-family: Orbitron; font-weight: bold;">
                <template #end>
                    <Menubar :model="items1"/>
                </template>
            </Menubar>
            
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

      </div>
        <div class="datos">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr style="font-family: Orbitron; letter-spacing: 1px;">
              <th scope="col">ID</th>
              <th scope="col">USUARIO</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">EMAIL</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" v-text="account.id"></th>
              <td v-text="account.username"></td>
              <td v-text="account.names"></td>
              <td v-text="account.email"></td>
              <Button label="EDITAR" style="font-family: Orbitron; background-color: #883cae; border-color: #3d0c421a;" class="p-button-rounded p-button-info" icon="pi pi-pencil" @click="showEditModal"/>
            </tr>
          </tbody>
        </table>
      </div>
      <h1 style="text-shadow: black 0px 0px 15px; opacity: 0.25; font-size: 120px; position: absolute; left: 50%; transform: translateX(-50%); bottom: 10px; font-family: Orbitron; font-weight: bold;">ALECTRION</h1>
    </div>
</template>


<script>
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path2 = "usuario/editar/";
const path = "persona?access_token=" + getAuthenticationToken() ;

export default {
  name: "ClientAccount",
  data() {
    return {
      account: null,
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
  },
  methods:{
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
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Orbitron');
.myaccount {
  position: absolute;
  background-color: #3d0c421a;
  color: white;
  padding: 0px;
  margin: 0%;
  width: 100%;
  height: 100%;
}
.modal-title {
  font-family: Orbitron;
  position: relative;
  color:black;
  left: 32%; 
}
</style>