<template>
<div class="update-photo">
  <img class="img" :src="img" ref="img">

  <div class="toolbar">
    <div class="cancel" @click="$emit('close')">取消</div>
    <div class="confirm" @click="onConfirm">完成</div>
  </div>
</div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'

export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    onConfirm() {
      // console.log(this.cropper.getData())
      // 基于客户端裁切
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updatePhoto(blob)
      })
    },
    async updatePhoto(blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      // 错误用法
      // 如果Content-Type是application/json
      // 则传递普通js对象
      // updateUserPhoto({
      //   photo: blob
      // })

      // 如果接口要求 Content-Type 是 multipart/form-data
      // 则必须传递 FormData 对象
      try {
        const formData = new FormData()
        formData.append('photo', blob)
  
        const { data } = await updateUserPhoto(formData)
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('update-photo', data.data.photo)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel, .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
  }
}
.img {
  max-width: 100%;
}
</style>