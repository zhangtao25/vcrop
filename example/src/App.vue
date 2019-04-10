<template>
  <div id="app">
    <Vcrop ref="test" img-src='http://localhost:3000/test.jpg'></Vcrop>
    <ul>
      <li v-for="(val,key) of cData" class="lie">
        <span>{{key}}</span>
        <span>{{val}}</span>
      </li>
    </ul>
    <div style="width: 100px;height: 100px">
      <canvas ref="parentCanvas" width="100" height="100"></canvas>
    </div>
    <button @click="fn"></button>
  </div>
</template>
<script>
  import {Vcrop} from './vcrop'
  export default {
    components:{
      'Vcrop': Vcrop
    },
    data(){
      return{
        cData:{}
      }
    },
    mounted() {
      this.cData = this.$refs.test.$data
    },
    methods:{
      fn(){
        let ctx = this.$refs.parentCanvas.getContext("2d");
        ctx.putImageData(this.$refs.test.getCropData(),0,0)
      }
    }
  }
</script>
<style>
  #app{
    display: flex;
  }
  .lie span:nth-child(1){
    display: inline-block;
    width: 200px;
  }
  .lie span:nth-child(2){
    display: inline-block;
    width: 400px;
  }
</style>
