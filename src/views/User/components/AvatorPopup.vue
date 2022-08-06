<template>
  <div class="update-avator">
    <img :src="photo" class="img" ref="image" />

    <footer>
      <span @click="$parent.$parent.isShowPhoto = false">取消</span>
      <span @click="uploadPhoto">完成</span>
    </footer>
  </div>
</template>

<script>
// 引入裁剪工具
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { getUserPhoto } from '@/api'

export default {
  props: {
    photo: {
      typr: String,
      required: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 裁剪
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    // 上传头像
    uploadPhoto() {
      // 获取裁剪后的图像的file对象
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '图片正在上传',
          forbidClick: true
        })

        try {
          // 发送请求
          const { data } = await getUserPhoto(blob)
          // 给父组件传图片
          this.$emit('update-avator', data.data.photo)
          // console.log(data)
          // 关闭弹层
          this.$parent.$parent.isShowPhoto = false

          this.$toast.success('图片上传成功')
        } catch (error) {
          this.$toast.fail('图片上传失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avator {
  height: 100%;
  position: relative;

  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 65%;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40px;
  }
}
</style>
