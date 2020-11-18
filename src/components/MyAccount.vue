<template>
  <div class="Home">
    <div v-if="role === 1 "><ClientAccount></ClientAccount></div>
    <div v-if="role === 2 "><OwnerAccount></OwnerAccount></div>
  </div>
</template>

<script>
import ClientAccount from './More/ClientAccount.vue';
import OwnerAccount from './More/OwnerAccount.vue';
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path = "rol?access_token=" + getAuthenticationToken() ;


export default {
  name: 'Home',
  components: {
    ClientAccount,
    OwnerAccount
  },
 data() {
    return {
      user_role: null,
      role: null
    };
  },
  mounted(){
    this.Prueba();
  },
  methods: {
    Prueba() {
       axios.get(this.$store.state.backURL + path, {
       })
      .then(response => {
        this.user_role = response.data;
        this.role = this.user_role[0].id;
      })
      .catch(err => {
        this.$router.push("/login");
        console.log(err);
      })
    },
  }
}
</script>

<style>
</style>
