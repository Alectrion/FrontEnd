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
                    <InputText id="nombre" type="text" v-model="data.nombre" placeholder="Nombre Establecimiento"/>
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
        </div>
        <div class="Datos">
            <DataTable :value="establecimientos" :paginator="true" :selection.sync="selectedEstablecimiento" selectionMode="single" dataKey="id" :rows="8">
                <Column field="id" header="Id"></Column>
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

const path = "propietario/nuevo_establecimiento?access_token=" + getAuthenticationToken();
const path2 = "Establecimientos"
export default {
    name: "HomeOwner",

    data() {
		return {
            establecimientos: null,
            displayModal: false,
            establishment: {},
            selectedEstablecimiento: {
                id: null,
                nombre: null,
                direccion: null,
                telefono: null,
                cupo: null,
                categoria: null
            },
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
        this.Prueba();
    },

    methods:{
        Agregar() {
            axios
            .post(this.$store.state.backURL + path,  {
                nombreEstablecimiento: this.data.nombre,
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
        Prueba() {
            axios.get(this.$store.state.backURL + path2, {
            })
            .then(response => {
                this.establecimientos = response.data;
            })
            .catch(err => {
                alert(err);
            })
        },
        showSaveModal() {
            this.displayModal = true;
        },
        showEditModal(selectedEstablecimiento) {
            this.data = {...selectedEstablecimiento};
            this.displayModal = true;
        },
        closeModal() {
            this.displayModal = false;
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