<template>
  <div class="vcrop">
    <canvas ref="canvas" width="800" height="600"></canvas>
    <div class="crop-box"
         :style="{
         'width':`${w}px`,
         'height':`${h}px`,
         'background-color':'#999',
         'transform':`translateX(${'100px'}) translateY(64.3008px)`
         }">
      <span class="cropper-point point-e"
            @mousedown="startChangeCropBox('e')"></span>
      <span class="cropper-point point-n"
            @mousedown="startChangeCropBox('n')"></span>
      <span class="cropper-point point-w"
            @mousedown="startChangeCropBox('w')"></span>
      <span class="cropper-point point-s"
            @mousedown="startChangeCropBox('s')"></span>

      <span class="cropper-point point-ne"
            @mousedown="startChangeCropBox('ne')"></span>
      <span class="cropper-point point-nw"
            @mousedown="startChangeCropBox('nw')"></span>
      <span class="cropper-point point-sw"
            @mousedown="startChangeCropBox('sw')"></span>
      <span class="cropper-point point-se"
            @mousedown="startChangeCropBox('se')"></span>

      <span class="cropper-line line-e"
            @mousedown="startChangeCropBox('e')"></span>
      <span class="cropper-line line-n"
            @mousedown="startChangeCropBox('n')"></span>
      <span class="cropper-line line-w"
            @mousedown="startChangeCropBox('w')"></span>
      <span class="cropper-line line-s"
            @mousedown="startChangeCropBox('s')"></span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ctx: null,
        clientXY:[0,0],
        isDown:false,
        w:100,
        h:100
      }
    },
    props: ['imgSrc'],
    mounted() {
      this.init();
      let img = new Image();
      let self = this;
      img.src = this.imgSrc;
      img.onload = function () {
        self.ctx.drawImage(img, 0, 0, 570, 310)
      };

      document.onmousemove = function (e) {
        this.clientXY = [e.clientX,e.clientY];
        if (self.isDown){
          self.w = e.clientX-self.clientXY[0]
          self.h = e.clientY-self.clientXY[1]
        }
      };

      document.onmouseup = function (e) {
        self.isDown = false
      }
    },
    methods: {
      init() {
        if (this.$refs.canvas.getContext) {
          this.ctx = this.$refs.canvas.getContext("2d");
        }
      },
      startChangeCropBox(){
        this.isDown = true
        console.log(event)
        this.clientXY = [event.clientX,event.clientY]
      }
    }
  }
</script>
<style>
  .vcrop {
    background-color: #999;
    width: 800px;
    height: 600px;
    position: relative;
  }

  .vcrop > canvas {
    position: absolute;
  }

  .vcrop > .crop-box {
    position: absolute;
  }

  /*以下是裁剪框的css*/

  .cropper-point{
    width: 5px;
    height: 5px;
    background-color: #39f;
    display: block;
    position: absolute;
  }

  .cropper-line{
    display: block;
    position: absolute;
    background-color: #39f;
  }

  .point-e{right: 0;top: 50%;transform: translate(50%,-50%);cursor: ew-resize;}
  .point-n{right: 50%;top: 0;transform: translate(50%,-50%);cursor: ns-resize;}
  .point-w{left: 0;top: 50%;transform: translate(-50%,-50%);cursor: ew-resize;}
  .point-s{right: 50%;bottom: 0;transform: translate(50%,50%);cursor: ns-resize;}

  .point-ne{top: 0;right: 0;transform:translate(50%,-50%);cursor: nesw-resize;}
  .point-nw{top: 0;left: 0;transform:translate(-50%,-50%);cursor: nwse-resize;}
  .point-sw{bottom: 0;left: 0;transform:translate(-50%,50%);cursor:nesw-resize;}
  .point-se{bottom: 0;right: 0;transform: translate(50%,50%);;cursor: nwse-resize;}

  .line-e{width: 1px;height: 100%;right: 0;top: 0;cursor: ew-resize;}
  .line-n{width: 100%;height: 1px;top: 0;left:0;cursor: ns-resize;}
  .line-w{width: 1px;height: 100%;top:0;left:0;cursor: ew-resize;}
  .line-s{width:100%;height: 1px;bottom: 0;left: 0;cursor: ns-resize;}
</style>
