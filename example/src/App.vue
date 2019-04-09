<template>
  <div id="app">
    <Vcrop img-src='http://localhost:3000/test.jpg'></Vcrop>
  </div>
</template>
<script>
  import {Vcrop} from './vcrop'
  export default {
    components:{
      'Vcrop': Vcrop
    },
    mounted() {
    }
  }
</script>
<style>
  #app{
    /*background-color: #999;*/
  }
</style>
