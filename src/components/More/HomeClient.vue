<template>
  <div class="card">
    <h5>Inline</h5>
    <InputText class="p-mr-2 p-d-inline" />
    <InputText class="p-d-inline" />

    <h5>Block</h5>
    <InputText class="p-mb-2 p-d-block" />
    <InputText class="p-d-block" />

    <h5>Visible on a Small Screen</h5>
    <p>Resize to view.</p>
    <Button type="button" icon="pi pi-bars" class="p-button-rounded p-d-md-none" />

    <h5>Hidden on a Small Screen</h5>
    <p>Resize to hide.</p>
    <Button type="button" icon="pi pi-search" class="p-button-rounded p-button-success p-d-none p-d-md-inline-flex" />

    <h5>Visible to Print, Invisible for Screen</h5>
    <p class="p-d-none p-print-block">Only visible when printed.</p>

    <h5>Visible to Screen, Invisible for Print</h5>
    <p class="p-d-block p-print-none">Not available for printing.</p>
</div>
</template>

<script>
import axios from "axios";

const path = "Establecimientos"

export default {
  name: 'HomeUser',
  data(){
    return{
           establecimientos: null,
           products: null,
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                {label: 'Price High to Low', value: '!price'},
                {label: 'Price Low to High', value: 'price'},
            ]
        }
    },
   productService: null,
    created() {
        this.productService;
    },
    mounted() {
        this.productService.getProducts().then(data => this.products = data);
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
    onSortChange(event){
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        }
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
