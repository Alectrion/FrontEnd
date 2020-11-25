<template >
    <div class="myaccount">
      <div class="Menu">
            <Menubar :model="items">
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

            <!-- Modal -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Editar Cuenta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form v-on:submit.prevent="Editar()">  
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
                     </form>
                  </div>
                  <div class="modal-footer">
                    <Button label="Guardar" icon="pi pi-check" @click="Editar" />
                    <Button label="Cancelar" icon="pi pi-times" data-dismiss="modal" class="p-button-secondary" />
                  </div>
                </div>
              </div>
            </div>
      </div>
        <div class="datos">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Mi Cuenta </th>
              <th scope="col">Usuario</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" v-text="account.id"></th>
              <td v-text="account.username"></td>
              <td v-text="account.names"></td>
              <td v-text="account.email"></td>
              <Button label="Editar" class="p-button-rounded p-button-info" icon="pi pi-pencil" data-toggle="modal" data-target="#exampleModalCenter"/>
            </tr>
          </tbody>
        </table>
      </div>
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
                    label: "Home",
                    icon:'pi pi-home',
                    to: "/home"
                },
                {
                    label: "Usuario",
                },
            ],
            items1: [
                {
                    label: 'Salir',
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
          alert("Actualizado")
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