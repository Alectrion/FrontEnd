<template>
    <div class="Owner">
        <section class= "Boton">
          <p><router-link to='/myaccount' style="text-decoration:none" title='Mi Cuenta'>Mi Cuenta</router-link></p> 
          <router-link to='/myaccount' style="text-decoration:none" title='Mi Cuenta'><Button icon="pi pi-user" class="p-button-rounded p-button-info p-button-outlined" /></router-link>
        </section>

        <h5>Modal</h5>
        <Button label="Show" icon="pi pi-external-link" @click="openModal" />
          <Dialog header="Header" :visible.sync="displayModal" :style="{width: '50vw'}" :modal="true">
              <p class="p-m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <template #footer>
                  <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                  <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus />
              </template>
          </Dialog>
    </div>
    
</template>

<script>
export default {
    name: "HomeOwner",
    data() {
        return {
            displayModal: false,
        };
    },
    methods: {
        openModal() {
            this.displayModal = true;
        },
        closeModal() {
            this.displayModal = false;
        }
    },
}
    
</script>

<style scoped>
.Owner {
    position: absolute;
    background-color: #3d0c421a;
    color: black;
    padding: 0px;
    margin: 0%;
    width: 100%;
    height: 100%;
}
.Boton {
  position: absolute;
  width: 3%;
  transform: translateX(3030%);
  top:7%;
}
p {
  font-family: Orbitron;
  font-size: 18px;
  margin: -31px;
  color: white;
  text-shadow: #a945c7 2px 2px 18px;
}
.p-button {
  transform: translateX(200%);
}
.p-button.p-button-info.p-button-outlined, .p-buttonset.p-button-info > .p-button.p-button-outlined, .p-splitbutton.p-button-info > .p-button.p-button-outlined {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid;
  text-decoration: none;
}
.p-button.p-button-info, .p-buttonset.p-button-info > .p-button, .p-splitbutton.p-button-info > .p-button {
  background: #a945c7;
  border: 1px solid #a945c7;
}

</style>