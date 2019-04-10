<template>
  <div class="vcrop">
    <canvas ref="canvas" width="800" height="600" @mousedown="startMoveImage"></canvas>
    <div class="crop-box"
         :style="{
         'width':`${cropWidth}px`,
         'height':`${cropHeight}px`,
         'transform':`translateX(${cropOriginX}px) translateY(${cropOriginY}px)`
         }"
         @mousedown="startMoveCropBox">
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
        isChangingCropBox:false,
        isMovingCropBox:false,
        isMovingImage:false,
        cropDragDirection:null,
        cropWidth:100,
        cropHeight:100,
        cropOldWidth:0,
        cropOldHeight:0,
        cropOriginX:100,
        cropOriginY:100,
        cropOldOriginX:100,
        cropOldOriginY:100,
        cropStartPointX:0,
        cropStartPointY:0,
        cropEndPointX:4,
        cropEndPointY:4,
        imageOldOriginX:0,
        imageOldOriginY:0,
        imageOriginX:0,
        imageOriginY:0,
        canvasWidth:800,
        canvasHeight:600
      }
    },
    props: ['imgSrc'],
    mounted() {
      this.init();
      this.img = new Image();
      let self = this;
      self.img.crossOrigin = "Anonymous";
      self.img.src = this.imgSrc;
      self.img.onload = function () {
        self.ctx.drawImage(self.img, 0, 0, 570, 310)
      };
      document.onmousemove = function (event) {
        self.cropEndPointX = event.clientX;
        self.cropEndPointY = event.clientY;
        if (self.isChangingCropBox){
          let moveOffsetX = self.cropEndPointX - self.cropStartPointX;
          let moveOffsetY = self.cropEndPointY - self.cropStartPointY;

          switch(self.cropDragDirection)
          {
            case 'ne':
              self.cropHeight = self.cropOldHeight - moveOffsetY;
              self.cropOriginY =self.cropOldOriginY+moveOffsetY;

              self.cropWidth = self.cropOldWidth + moveOffsetX;
              break;
            case 'nw':
              self.cropHeight = self.cropOldHeight - moveOffsetY;
              self.cropOriginY =self.cropOldOriginY+moveOffsetY;

              self.cropWidth = self.cropOldWidth - moveOffsetX;
              self.cropOriginX =self.cropOldOriginX+moveOffsetX;
              break;
            case 'sw':
              self.cropHeight = self.cropOldHeight + moveOffsetY;

              self.cropWidth = self.cropOldWidth - moveOffsetX;
              self.cropOriginX =self.cropOldOriginX+moveOffsetX;
              break;
            case 'se':
              self.cropWidth = self.cropOldWidth + moveOffsetX;
              self.cropHeight = self.cropOldHeight + moveOffsetY;
              break;
            case 'e':
              self.cropWidth = self.cropOldWidth + moveOffsetX;
              break;
            case 'n':
              self.cropHeight = self.cropOldHeight - moveOffsetY;
              self.cropOriginY =self.cropOldOriginY+moveOffsetY;
              break;
            case 'w':
              self.cropWidth = self.cropOldWidth - moveOffsetX;
              self.cropOriginX =self.cropOldOriginX+moveOffsetX;
              break;
            case 's':
              self.cropHeight = self.cropOldHeight + moveOffsetY;
              break;
            default:
          }
        }
        if (!self.isChangingCropBox&&self.isMovingCropBox){
          let moveOffsetX = self.cropEndPointX - self.cropStartPointX;
          let moveOffsetY = self.cropEndPointY - self.cropStartPointY;

          self.cropOriginX = self.cropOldOriginX+moveOffsetX;
          self.cropOriginY = self.cropOldOriginY+moveOffsetY;
        }
        if (self.isMovingImage){
          let moveOffsetX = self.cropEndPointX - self.cropStartPointX;
          let moveOffsetY = self.cropEndPointY - self.cropStartPointY;

          self.imageOriginX = self.imageOldOriginX + moveOffsetX;
          self.imageOriginY = self.imageOldOriginY + moveOffsetY;
          // console.log()
          self.ctx.clearRect(0, 0, 800, 600);
          self.ctx.drawImage(
              self.img,
              self.imageOriginX, self.imageOriginY,
              570,310
          );
        }
      };

      document.onmouseup = function (e) {
        self.isChangingCropBox = false;
        self.isMovingCropBox = false;
        self.isMovingImage = false;
        self.cropDragDirection = null;
      }
    },
    methods: {
      init() {
        if (this.$refs.canvas.getContext) {
          this.ctx = this.$refs.canvas.getContext("2d");
        }
      },
      startChangeCropBox(cropDragDirection){
        // 获取拖拽方向
        this.cropDragDirection = cropDragDirection;
        // 改变裁剪框状态
        this.isChangingCropBox = true;
        // 记录之前裁剪框宽高
        this.cropOldWidth = this.cropWidth;
        this.cropOldHeight = this.cropHeight;
        // 记录之前裁剪框原点坐标
        this.cropOldOriginX = this.cropOriginX;
        this.cropOldOriginY = this.cropOriginY;
        // 记录拖拽起始点坐标
        this.cropStartPointX = event.clientX;
        this.cropStartPointY = event.clientY;
      },
      startMoveCropBox(){
        // 改变裁剪框状态
        this.isMovingCropBox = true;
        // 记录之前裁剪框原点坐标
        this.cropOldOriginX = this.cropOriginX;
        this.cropOldOriginY = this.cropOriginY;
        // 记录拖拽起始点坐标
        this.cropStartPointX = event.clientX;
        this.cropStartPointY = event.clientY;
      },
      startMoveImage(){
        this.isMovingImage = true;
        this.imageOldOriginX = this.imageOriginX;
        this.imageOldOriginY = this.imageOriginY;
        // 记录拖拽起始点坐标
        this.cropStartPointX = event.clientX;
        this.cropStartPointY = event.clientY;
      },
      getCropData(){
        let self = this
        let imgData = this.ctx.getImageData(
            self.cropOriginX,self.cropOriginY,
            self.cropWidth,self.cropHeight);
        return imgData
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
    overflow: hidden;
  }

  .vcrop > canvas {
    position: absolute;
  }

  .vcrop > .crop-box {
    position: absolute;
    cursor: move;
    box-shadow: rgba(0,0,0,.5) 0 0 0 2005px;
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
