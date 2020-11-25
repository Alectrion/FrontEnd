<template>
    <div class="Owner">
        <div class="Menu">
            <Menubar :model="items">
                <template #end>
                    <Menubar :model="items1"/>
                </template>
            </Menubar>
        </div>
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
                    <Textarea id="description" v-model="data.muro" required="true" rows="3" cols="25" placeholder="Descripción" />
                    <label for="Descripción"></label>
                </span>
                <br />
                <span class="p-float-label">
                    <Dropdown v-model="data.categoria" :options="categorias" optionLabel="name" placeholder="Seleccionar Categoria" />
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
    </div>
    
</template>

<script>
import GoogleMap from "./GoogleMap";
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path = "propietario/establecimiento"
const path2 = "propietario/nuevo_establecimiento?access_token=" + getAuthenticationToken();




export default {
    name: "HomeOwner",
    components: {
        GoogleMap
    },
    data() {
		return {
            establecimientos: null,
            establecimiento: {},
            selectedEstablecimiento: {},
            displayModal: false,
            editModal: false,
            favoritos: false,
            expandedRows: [],
            data: {
                id: null,
                nombre: null,
                direccion: null,
                telefono: null,
                cupo: null,
                categoria: null,
                muro:null
            },
            categorias: [
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
                },
                {
                    label: "Mis establecimientos",
                    icon:'pi pi-table',
                    to: '/tabmenu/mis-establecimientos'
                },
            ],
            items1: [
                {
                    label: 'Propietario',
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
                tipoEstablecimiento: this.data.categoria,
                muro: this.data.muro
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
                tipoEstablecimiento: this.selectedEstablecimiento.tipoEstablecimiento,
                muro: this.selectedEstablecimiento.muro
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
        },
        onRowExpand(establecimiento,event) {
            this.establecimiento = {...establecimiento};
            this.$toast.add({severity: 'info', summary: 'Product Expanded', detail: event.data.estName, life: 3000});
        },
        onRowCollapse(establecimiento,event) {
            this.establecimiento = {...establecimiento};
            this.$toast.add({severity: 'success', summary: 'Product Collapsed', detail: event.data.estName, life: 3000});
        },
        expandAll(establecimiento) {
            this.establecimiento = {...establecimiento};
            this.expandedRows = this.establecimientos.filter(p => p.id);
            this.$toast.add({severity: 'success', summary: 'All Rows Expanded', life: 3000});
        },
        collapseAll() {
            this.expandedRows = null;
            this.$toast.add({severity: 'success', summary: 'All Rows Collapsed', life: 3000});
        },
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