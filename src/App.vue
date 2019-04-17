<template>
  <div id="app">
    <Vcrop></Vcrop>
  </div>
</template>
<script>
  import {Vcrop} from './../components'
  export default {
    components:{
      Vcrop
    },
    mounted() {
      console.log(Vcrop)
    }
  }
</script>
