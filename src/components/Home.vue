<template>
  <div class="Home">
    <div v-if="role === 1 "><HomeClient></HomeClient></div>
    <div v-if="role === 2 "><HomeOwner></HomeOwner></div>
  </div>
</template>

<script>
import HomeClient from './More/HomeClient.vue';
import HomeOwner from './More/HomeOwner.vue';
import axios from "axios";
import {getAuthenticationToken} from '@/dataStorage';

const path = "rol?access_token=" + getAuthenticationToken() ;

export default {
  name: 'Home',
  components: {
    HomeClient,
    HomeOwner
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
    onLogout() {
      this.$store.dispatch("doLogout");
      this.$router.push("/welcome");
    }
  }
}
</script>

<style>
</style>
