<template>
  <gmap-map
    :center="center"
    :zoom="16"
    style=" position: relative; width: 60%; height: 150px"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :title="m.title"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
</template>
<script>
  export default {
    data () {
      return {
        
        center: {lat: this.latitude, lng: this.longitude},
        markers: [{
          position: {lat: this.latitude, lng: this.longitude},
          title: this.title
        }]
      }
    },

    props: {
        latitude: Number,
        longitude: Number,
        title: String
    }
  }
</script>