<template>
  <div class="Owner">
    <Toast position="top-left"/>
    <div class="Menu">
        <br>
        <nav class="navbar navbar-expand-lg navbar-dark ">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                <h4 class="nav-link"><router-link to='/home' style="color: white; text-decoration: none" title='Home'> Home</router-link></h4>
                </li>
                <li class="nav-item">
                <h4 class="nav-link" @click="showSaveModal"><router-link to='' style="color: white; text-decoration: none;" title='Registar'> Registra tu establecimiento</router-link></h4>
                </li>
            </ul>
            <ul class="navbar-nav ml-md-auto">
                <li class="nav-item">
                <h4 class="nav-link"><router-link to='/welcome' style="color: white; text-decoration: none; border: 2px solid white; moz-border-radius: 10px; webkit-border-radius: 10px; padding: 5px;"  title='Home'> Cerrar Sesion</router-link></h4>
                </li>
            </ul>
            </div>
        </nav>
        <br>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
            <h5 class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Mis Establecimientos</h5>
            </li>
            <li class="nav-item">
            <h5 class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Mi Cuenta</h5>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">

        <!--Tabla Establecimientos-->
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">           
                <div class="Datos Establecimientos" style="">
                    <Carousel :value="establecimientos" :numVisible="1" :numScroll="1" :selection.sync="selectedEstablecimiento" dataKey="id"  
                    :responsiveOptions="responsiveOptions" :circular="true" class="custom-carousel" 
                    style="max-width: 495px; position:relative; left:32%;">

                        <template #item="slotProps">
                        <div class="product-item">
                            <div class="product-item-content">
                            <div>
                                <h1 class="p-mb-1" style="color:#455eff;"><b>{{slotProps.data.estName}}</b></h1><br>
                                <h5 class="p-mt-0 p-mb-3" style="color:#7f8182;"><b>Código: </b>{{slotProps.data.id}}</h5>
                                <h5 class="p-mt-0 p-mb-3">{{slotProps.data.dir}}</h5>
                                <h5 class="p-mt-0 p-mb-3">Tel: {{slotProps.data.tel}}</h5>
                                <span class="badge badge-pill badge-primary" style="font-size: 20px">{{slotProps.data.tipoEstablecimiento}}</span>
                                <br><br>
                                <Textarea id="description" v-model="slotProps.data.muro" required="true" rows="3" cols="25" placeholder="Muro"  style="background: #eae4eb; position: relative; left:3%" />
                                <Button icon="pi pi-check" class="p-button-rounded p-button-text"  @click="Editar(slotProps.data.muro)" style="position: relative;  width: 5%; left:-5%"/>
                                <div class="car-buttons p-mt-5">  
                                    <Button class="p-button-raised p-button-help" icon="pi pi-check-square" label="Editar" @click="showEditModal(slotProps.data)" style="background-color: #883cae;" />
                                    <Button class="p-button-raised p-button-danger" icon="pi pi-trash" label="Eliminar" @click="openConfirmationEstablecimiento(slotProps.data)"/>
                                </div> 
                            </div>
                            </div>
                        </div>
                        </template>
                    </Carousel>
                </div>
            </div>

        <!--Mi Cuenta-->  
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="datos" style="position: relative; max-width:35%; left: 32%;">
                    <div class="card text-center" style="position:relative; ">
                        <div class="card-header" style="color: #455eff; font-size: 22px; "><b>Mi Cuenta</b></div>    
                        <div class="card-body" style="color: black;" >
                            <img src="../img/user.jpg" class="responsive" alt="..." style="max-width: 153px;">
                            <br>
                            <h4 class="card-title" style="position:relative; text-align: center;">{{account.names}}</h4>
                            <br>
                            <br>
                            <h5 class="card-subtitle mb-2 text-muted"><b>Codigo: </b>{{account.id}}</h5>
                            <br>
                            <h5 class="card-text"><b>Usuario: </b>{{account.username}}</h5>
                            <br>
                            <h6 class="card-text"><b>Email: </b>{{account.email}}</h6>
                        </div>
                        <div class="card-footer">
                            <Button class="p-button-raised p-button-help" icon="pi pi-replay" label="Actualizar datos" @click="showEditAccount" style="background-color: #883cae;" />
                            <Button class="p-button-raised p-button-danger" icon="pi pi-trash" label="Dar de Baja" @click="openConfirmation"/>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <!--Dialog Agregar Establecimiento-->
        <Dialog header="Agregar Establecimiento" footer="Footer"   position="left" :visible.sync="displayModal" :modal="true" >
            <span class="p-float-label">
                <InputText id="nombre" type="text" v-model="data.nombre" placeholder="Nombre del Establecimiento" autocomplete="off"/>
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
                <InputText id="cupo" type="text"  v-model="data.cupo" placeholder="Cupo Máximo"/>
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
            <span class="p-float-label">
                <h5>Imagen Ocupación: </h5>
                <FileUpload name="demo[]" url="./upload.php" @upload="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000">
                    <template #empty>
                        <p>Arrastre y suelte archivos hasta aquí para cargarlos.</p>
                    </template>
                </FileUpload>            
            </span>
        <template #footer>
            <Button label="Guardar" icon="pi pi-check" @click="Agregar" />
            <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
        </template>
        </Dialog>

    <!--Dialog Editar Establecimiento-->            
        <div class="Editar">
            <Dialog header="Editar Establecimiento" footer="Footer" position="left" :visible.sync="editModal" :modal="true" >
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
                <br>
                <span class="p-float-label">
                    <h5>Imagen Ocupación: </h5>
                    <FileUpload name="demo[]" url="./upload.php" @upload="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000">
                        <template #empty>
                            <p>Arrastre y suelte archivos hasta aquí para cargarlos.</p>
                        </template>
                    </FileUpload>            
                </span>
                <template #footer>
                    <Button label="Guardar" icon="pi pi-check" @click="Editar" />
                    <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
                </template>
            </Dialog>
        </div>

    <!--Dialog Editar Cuenta-->
        <Dialog header="Editar Cuenta" :visible.sync="displayEdit" :style="{width: '21vw'}" position="top" :modal="true">
            <span class="p-float-label">
                <InputText type="text" v-model="account.username" disabled style="width: 100%" />
                <label for="name"></label>
            </span>
            <br />
            <span class="p-float-label">
                <InputText id="name" type="text" required v-model="account.names" autocomplete="off" placeholder="Nombre" style="width: 100%" />
                <label for="name"></label>
            </span>
            <br />
            <span class="p-float-label">
                <InputText id="Email" type="text" required v-model="account.email" autocomplete="off" placeholder="Email" style="width: 100%" />
                <label for="email"></label>
            </span>
        
            <template #footer>
                <Button label="Guardar" icon="pi pi-check" @click="EditarCuenta" />
                <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
            </template>
        </Dialog>
        
         <!--Dialog Borrar Establecimiento-->
            <Dialog header="Eliminar Establecimiento" :visible.sync="displayConfirmationEstablecimiento" :style="{width: '350px'}" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                    <span>¿Estas seguro de eliminar <b>{{this.selectedEstablecimiento.estName}}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Si" icon="pi pi-check" @click="Borrar" class="p-button-text" autofocus />
                    <Button label="No" icon="pi pi-times" @click="closeConfirmationEstablecimiento" class="p-button-text"/>
                </template>
            </Dialog>

    <!--Dialog Borrar Cuenta-->
        <Dialog header="Dar de baja a mi cuenta" :visible.sync="displayConfirmation" :style="{width: '350px'}" :modal="true">
              <div class="confirmation-content">
                  <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                  <span>¿Estas seguro de eliminar tu cuenta?</span>
              </div>
              <template #footer>
                <Button label="Si, adios." icon="pi pi-check" @click="BorrarCuenta" class="p-button-text" autofocus />
                <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
              </template>
        </Dialog>
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
const path5 = "usuario/delete/"
export default {
    name: "HomeOwner",
    data() {
		return {
            account: null,
            establecimientos: null,
            establecimiento: {},
            selectedEstablecimiento: {},
            displayEdit: false,
            displayModal: false,
            editModal: false,
            displayConfirmation: false,
            displayConfirmationEstablecimiento: false,
            data: {
                id: null,
                nombre: null,
                direccion: null,
                telefono: null,
                cupo: null,
                categoria: null,
                muro:null,
                latitud:null,
                longitud:null
            },
            categorias: [
                'Restaurante', 'Gimnasio', 'Supermercado', 'Barberia', 'Motel'
            ],
            responsiveOptions: [
              {
                breakpoint: '1024px',
                numVisible: 1,
                numScroll: 1
              },
              {
                breakpoint: '500px',
                numVisible: 1,
                numScroll: 1
              },
              {
                breakpoint: '380px',
                numVisible: 1,
                numScroll: 1
              }
            ]
        };
    },
    mounted(){
        this.ShowEstablecimientos();
        this.Prueba();
    },
    methods:{
        onUpload() {
			this.$toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
		},
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
                this.$toast.add({severity:'success', summary: 'Registro Exitoso', detail:'Se ha agregado correctamente tu establecimiento.', life: 5000});
                alert("Registro exitoso");
                location.reload();
            })
            .catch(error => {
              alert(error);
            });
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
                console.log(response.data);
                this.$toast.add({severity:'success', summary: 'Actualizado', detail: this.selectedEstablecimiento.estName + ' Se ha actualizado correctamente.', life: 5000});
                location.reload();
            })
            .catch(err => {
                alert(err);
            })
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
            this.$toast.add({severity:'success', summary: 'Actualizado', detail:'Se ha actualizado correctamente tus datos.', life: 5000});
            this.closeModal();
            })
            .catch(error => {
            alert(this.account.id);
            alert(error);
            });
        },
        BorrarCuenta(){
        axios.delete(this.$store.state.backURL + path5 + this.account.id + "?access_token=" + getAuthenticationToken(), {data: {foo: 'bar'}
                })
                .then(response => {
                    location.reload();
                    console.log(response);
                    alert("Usuario borrado");
                    this.$router.push("/welcome");
                })  
        },
        Borrar() {
            axios.delete(this.$store.state.backURL + path + "/" + this.selectedEstablecimiento.id + "?access_token=" + getAuthenticationToken(), {data: {foo: 'bar'}
            })
            .then(response => {
                console.log(response);
                this.$toast.add({severity:'success', summary: 'Establecimiento Eliminado',  detail:'Se ha eliminado correctamente tu establecimiento.', life: 5000});
                location.reload();
            })   
        },
        showSaveModal() {
            this.displayModal = true;
        },
        showEditModal(selectedEstablecimiento) {
            this.selectedEstablecimiento = {...selectedEstablecimiento};
            this.editModal = true;
        },
        showEditAccount() {
        this.displayEdit = true;
        },
        closeModal() {
            this.displayEdit = false;
            this.displayModal = false;
            this.editModal = false;
        },
        openConfirmation() {
            this.displayConfirmation = true;
        },
        closeConfirmation() {
            this.displayConfirmation = false;
        },
        openConfirmationEstablecimiento(selectedEstablecimiento) {
            this.selectedEstablecimiento = {...selectedEstablecimiento};
            this.displayConfirmationEstablecimiento = true;
        },
        closeConfirmationEstablecimiento() {
            this.displayConfirmationEstablecimiento = false;
        }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Orbitron');
.Owner {
  position: relative;
  background: url("../img/fondo.jpeg") no-repeat;
  background-size: cover;
  background-position: center center;
  color: white;
  padding: 0px;
  margin: 0%;
  width: 100%;
  height: 100%; 
}
h4{
  display: inline-block;
  margin: 0 20px;
}
.product-item .product-item-content {
  position: relative;
  border: 1px solid var(--surface-d);
  box-shadow: 0 0 5px#883cae, 0 0 5px white, 0 0 5px #883cae;
  border-radius: 15px;
  margin: .3rem;
  text-align: center;
  padding: 2rem 0;
  background: white;
  color: black;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}
.product-image {
    width: 50%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}

</style>