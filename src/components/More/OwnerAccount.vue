<template>
    <div class="Owner">
        <div class="Menu">
            <Menubar :model="items" style="letter-spacing: 1px; font-family: Orbitron; font-weight: bold;">
                <template #end>
                    <Menubar :model="items1" style="letter-spacing: 1px; font-family: Orbitron; font-weight: bold;"/>
                </template>
            </Menubar>

<!--Dialog Agregar Establecimiento-->
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
                <h5>Ingresar Ubicacion: </h5>
                <span class="p-float-label">
                    <InputText id="cupo" type="text"  v-model="data.latitud" placeholder="Latitud"/>
                    <label for="cupo"></label>
                </span>
                <br />
                <span class="p-float-label">
                    <InputText id="cupo" type="text"  v-model="data.longitud" placeholder="Longitud"/>
                    <label for="cupo"></label>
                </span>
                <br />
                <span class="p-float-label">
                    <Textarea id="description" v-model="data.muro" required="true" rows="3" cols="25" placeholder="Descripción" />
                    <label for="Descripción"></label>
                </span>
                <br />
                <span class="p-float-label">
                    <Dropdown v-model="data.categoria" :options="categorias" placeholder="Seleccionar Categoria" />
                    <label for="categoria"></label>
                </span>
                <template #footer>
                    <Button label="Guardar" icon="pi pi-check" @click="Agregar" />
                    <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
                </template>
            </Dialog>

<!--Dialog Editar Establecimiento-->            
            <div class="Editar">
                <Dialog header="Editar Establecimiento" footer="Footer" :visible.sync="editModal" :modal="true" >
                    <span class="p-float-label">
                        <InputText id="nombre" type="text" v-model="selectedEstablecimiento.estName" placeholder="Escoge uno primero!" disabled/>
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
                    <h5>Ingresar Ubicacion: </h5>
                    <span class="p-float-label">
                        <InputText id="cupo" type="text"  v-model="selectedEstablecimiento.latitud" placeholder="Latitud"/>
                        <label for="cupo"></label>
                    </span>
                    <br />
                    <span class="p-float-label">
                        <InputText id="cupo" type="text"  v-model="selectedEstablecimiento.longitud" placeholder="Longitud"/>
                        <label for="cupo"></label>
                    </span>
                    <br />
                    <span class="p-float-label">
                        <Textarea id="description" v-model="selectedEstablecimiento.muro" required="true" rows="3" cols="25" placeholder="Descripción" />
                        <label for="Descripción"></label>
                    </span>
                    <br />
                    <span class="p-float-label">
                        <Dropdown v-model="selectedEstablecimiento.tipoEstablecimiento" :options="categorias" placeholder="Seleccionar Categoria" />
                        <label for="categoria"></label>
                    </span>
                    <template #footer>
                        <Button label="Guardar" icon="pi pi-check" @click="Editar" />
                        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
                    </template>
                </Dialog>
            </div>
        </div>

<!--Dialog Editar Cuenta-->
        <Dialog header="Editar Cuenta" :visible.sync="displayEdit" :modal="true">
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
                <Button label="Guardar" icon="pi pi-check" @click="EditarCuenta" />
                <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
            </template>
        </Dialog>

<!--Tabla Cuenta-->  
        <div class="datos">
            <table class="table table-hover">
            <thead class="thead-dark"> 
                <tr style="font-family: Orbitron; letter-spacing: 1px;">
                <th scope="col">ID </th>
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
                <Button label="EDITAR" style="font-family: Orbitron; background-color: #883cae; border-color: #3d0c421a;" class="p-button-rounded p-button-info" icon="pi pi-pencil" @click="showEditAccount"/>
                </tr>
            </tbody>
            </table>
        </div>
        <br>
        <Menubar :model="items2" style="letter-spacing: 1px; font-family: Orbitron; font-weight: bold;"></Menubar>
        <br> 
        <h1 style="text-align: center; font-family: Orbitron; font-weight: bold;">MIS ESTABLECIMIENTOS</h1>

<!--Tabla Establecimientos-->           
        <div class="Datos">
            <DataTable :value="establecimientos" style="width: 500px; position: relative; left: 50%; transform: translateX(-50%);" :selection.sync="selectedEstablecimiento" selectionMode="single" dataKey="id" :rows="1">
                <Column headerStyle="color: white; width: 5rem; font-family: Orbitron; background-color: #343a40 " field="id" header="ID"></Column>
                <Column headerStyle="width: 2rem; font-family: Orbitron; background-color: #343a40"></Column>
                <Column headerStyle="color: white; font-family: Orbitron; background-color: #343a40" field="estName" header="NOMBRE"></Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path = "propietario/establecimiento"
const path2 = "usuario/editar/";
const path3 = "persona?access_token=" + getAuthenticationToken() ;
const path4 = "propietario/nuevo_establecimiento?access_token=" + getAuthenticationToken();

export default {
    name: "HomeOwner",

    data() {
		return {
            establecimientos: null,
            establecimiento: {},
            selectedEstablecimiento: {},
            displayEdit: false,
            displayModal: false,
            editModal: false,
            data: {
                id: null,
                nombre: null,
                direccion: null,
                telefono: null,
                cupo: null,
                categoria: null,
                muro:null
            },
            account: null,
            categorias: [
                'Restaurante', 'Gimnasio', 'Supermercado', 'Barberia', 'Motel'
            ],
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
                            label: 'Cerrar Sesión',
                            icon:'pi pi-fw pi-power-off',
                            to: '/login'
                        }
                    ]
                },
            ],
            items2: [
                {
                    label: 'AGREGAR',
                    icon:'pi pi-fw pi-plus',
                    command: () => {
                    this.showSaveModal();
                    }
                },
                {
                    label: 'EDITAR',
                    icon:'pi pi-fw pi-pencil',
                    command: () => {
                    this.showEditModal();
                    }
                },
                {
                    label: 'BORRAR',
                    icon:'pi pi-fw pi-trash',
                    command: () => {
                        this.Borrar();
                    }
                },
            ],
        };
    },
    mounted(){
        this.ShowEstablecimientos();
        this.Prueba();
    },

    methods:{
        Prueba() {
            axios.get(this.$store.state.backURL + path3, {
            })
            .then(response => {
                this.account = response.data;
            })
            .catch(err => {
                alert(err);
            })
        },
        Agregar() {
            axios
            .post(this.$store.state.backURL + path4,  {
                estName: this.data.nombre,
                dir: this.data.direccion,
                tel: this.data.telefono,
                cupoMax: this.data.cupo,
                tipoEstablecimiento: this.data.categoria,
                muro: this.data.muro,
                latitud: this.data.latitud,
                longitud: this.data.longitud
            })
            .then(response => {
                console.log(response.data);
                alert("Registro exitoso");
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
                tipoEstablecimiento: this.selectedEstablecimiento.tipoEstablecimiento,
                muro: this.selectedEstablecimiento.muro,
                latitud: this.selectedEstablecimiento.latitud,
                longitud: this.selectedEstablecimiento.longitud
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
        EditarCuenta() {
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
        showEditAccount() {
        this.data;
        this.displayEdit = true;
        },
        closeModal() {
            this.displayEdit = false;
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
}


</style>