<template>
    <div class="Owner">
        <div class="Menu">
            <Menubar :model="items">
                <template #end>
                    <Menubar :model="items1"/>
                </template>
            </Menubar>
            <Dialog header="Nuevo Establecimiento" footer="Footer" :visible.sync="displayModal" :modal="true" >
                <span class="p-float-label">
                    <InputText id="nombre" type="text" v-model="data.nombre" placeholder="Nombre Establecimiento" autocomplete="off"/>
                    <label for="nombre"></label>
                </span>
                <br />
                <span class="p-float-label">
                    <InputText id="direccion" type="text"  v-model="data.direccion" placeholder="Direccion"/>
                </span>
                <br />
                <span class="p-float-label">
                    <InputText id="telefono" type="text"  v-model="data.telefono" placeholder="Telefono" />
                    <label for="telefono"></label>
                </span>
                <br />
                <span class="p-float-label">
                    <InputText id="cupo" type="text"  v-model="data.cupo" placeholder="Cupo"/>
                    <label for="cupo"></label>
                </span>
                <br />
                <span class="p-float-label">
                    <InputText id="categoria" type="text" v-model="data.categoria" placeholder="Categoria"  />
                    <label for="categoria"></label>
                </span>
                <template #footer>
                    <Button label="Guardar" icon="pi pi-check" @click="Agregar" />
                    <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
                </template>
            </Dialog>
            <div class="Editar">
                <Dialog header="Editar Establecimiento" footer="Footer" :visible.sync="editModal" :modal="true" >
                    <span class="p-float-label">
                        <InputText id="nombre" type="text" v-model="selectedEstablecimiento.estName" placeholder="Nombre Establecimiento" disabled/>
                        <label for="nombre"></label>
                    </span>
                    <br />
                    <span class="p-float-label">
                        <InputText id="direccion" type="text" required v-model="selectedEstablecimiento.dir" placeholder="Direccion"/>
                    </span>
                    <br />
                    <span class="p-float-label">
                        <InputText id="telefono" type="text" required v-model="selectedEstablecimiento.tel" placeholder="Telefono" />
                        <label for="telefono"></label>
                    </span>
                    <br />
                    <span class="p-float-label">
                        <InputText id="cupo" type="text" required v-model="selectedEstablecimiento.cupoMax" placeholder="Cupo"/>
                        <label for="cupo"></label>
                    </span>
                    <br />
                    <span class="p-float-label">
                        <InputText id="categoria" type="text" required v-model="selectedEstablecimiento.tipoEstablecimiento" placeholder="Categoria"  />
                        <label for="categoria"></label>
                    </span>
                    <template #footer>
                        <Button label="Guardar" icon="pi pi-check" @click="Editar" />
                        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
                    </template>
                </Dialog>
            </div>
        </div>
        <div class="Datos">
            <DataTable :value="establecimientos" :paginator="true" :selection.sync="selectedEstablecimiento" selectionMode="single" dataKey="id" :rows="8">
                <Column headerStyle="width: 5rem" field="id" header="Codigo"></Column>
                <Column headerStyle="width: 5rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye"  @click="showEstDialog(slotProps.data)" />
                    </template>
                </Column>
                <Column field="estName" header="Nombre Establecimiento"></Column>
                <Column field="dir" header="Direccion"></Column>
                <Column field="tel" header="Telefono"></Column>
                <Column field="tipoEstablecimiento" header="Categoria"></Column>
                <Column field="cupoMax" header="Cupo "></Column>
            </DataTable>
        </div>
    </div>
    
</template>

<script>
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path = "propietario/establecimiento"
const path2 = "propietario/nuevo_establecimiento?access_token=" + getAuthenticationToken();




export default {
    name: "HomeOwner",

    data() {
		return {
            establecimientos: null,
            displayModal: false,
            editModal: false,
            selectedEstablecimiento: {},
            data: {
                id: null,
                nombre: null,
                direccion: null,
                telefono: null,
                cupo: null,
                categoria: null
            },
			items: [
                {
                    label: "Home",
                    icon:'pi pi-home',
                    to: "/home"
                },
                {
                    label: 'Agregar',
                    icon:'pi pi-fw pi-plus',
                    command: () => {
                    this.showSaveModal();
                    }
                },
                {
                    label: 'Editar',
                    icon:'pi pi-fw pi-pencil',
                    command: () => {
                    this.showEditModal();
                    }
                },
                {
                    label: 'Borrar',
                    icon:'pi pi-fw pi-trash',
                    command: () => {
                        this.Borrar();
                    }
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
        };
    },
    mounted(){
        this.ShowEstablecimientos();
    },

    methods:{
        Agregar() {
            axios
            .post(this.$store.state.backURL + path2,  {
                estName: this.data.nombre,
                dir: this.data.direccion,
                tel: this.data.telefono,
                cupoMax: this.data.cupo,
                tipoEstablecimiento: this.data.categoria
            })
            .then(response => {
              console.log(response.data);
              alert("Registro exitoso")
            })
            .catch(error => {
              alert(error);
            });
            location.reload();
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
        Editar() {
            axios.put(this.$store.state.backURL + path + "/editar/" + this.selectedEstablecimiento.id + "?access_token=" + getAuthenticationToken(), {
                estName: this.selectedEstablecimiento.estName,
                dir: this.selectedEstablecimiento.dir,
                tel: this.selectedEstablecimiento.tel,
                cupoMax: this.selectedEstablecimiento.cupoMax,
                tipoEstablecimiento: this.selectedEstablecimiento.tipoEstablecimiento
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
        Borrar() {
            axios.delete(this.$store.state.backURL + path + "/" + this.selectedEstablecimiento.id + "?access_token=" + getAuthenticationToken(), {data: {foo: 'bar'}
            })
            .then(response => {
                location.reload();
                console.log(response);
            })   
        },
        showSaveModal() {
            this.displayModal = true;
        },
        showEditModal() {
            this.editModal = true;
        },
        closeModal() {
            this.displayModal = false;
            this.editModal = false;
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Orbitron');
.Owner {
    position: absolute;
    background-color: #3d0c421a;
    padding: 0px;
    margin: 0%;
    width: 100%;
    height: 100%;
    font-family: Orbitron;
}


</style>