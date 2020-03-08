<template>
  <el-form ref="postForm" :model="postForm">
    <sticky :class-name="'sub-navbar ' + postForm.status">
      <el-button v-if="!isEdit" @click="showGuide">显示帮助</el-button>
      <el-button v-loading="loading" type="success" style="margin-left:10px" @click="submitForm">{{ isEdit ? "编辑电子书":"新增电子书" }}</el-button>
    </sticky>
    <div class="detail-container">
      <el-row>
        <Warning />
        <el-col :span="24">
          <book-upload :file-list="fileList" :disbaled="isEdit" @onSuccess="onUploadSuccess" @onRemove="onUploadRemove" />
        </el-col>
        <el-col :span="24">
          <el-form-item prop="title">
            <MDinput v-model="postForm.title" :maxlength="100" name="name" required>书名</MDinput>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="作者:" :label-width="labelWidth">
                <el-input v-model="postForm.author" placeholder="作者" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出版社:" :label-width="labelWidth">
                <el-input v-model="postForm.publisher" placeholder="出版社" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="语言:" :label-width="labelWidth">
                <el-input v-model="postForm.language" placeholder="语言" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="根文件:" :label-width="labelWidth">
                <el-input v-model="postForm.rootFile" placeholder="根路径" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="文件路径:" :label-width="labelWidth">
                <el-input v-model="postForm.filePath" placeholder="文件路径" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="解压路径:" :label-width="labelWidth">
                <el-input v-model="postForm.unzipPath" placeholder="解压路径" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="封面路径:" :label-width="labelWidth">
                <el-input v-model="postForm.coverPath" placeholder="封面路径" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件名称:" :label-width="labelWidth">
                <el-input v-model="postForm.unzipPath" placeholder="文件名称" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="封面图片:" :label-width="labelWidth">
                <a v-if="postForm.cover" :href="postForm.cover" target="_blank">
                  <img src="postForm.cover" class="preview-img">
                </a>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="目录结构:" :label-width="labelWidth">
                <div v-if="postForm.contents && postForm.contents.length > 0" class="content-wrapper">
                  <el-tree />
                </div>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import Sticky from '../../../components/Sticky/index'
import Warning from './Warning'
import BookUpload from '../../../components/BookUpload/index'
import MDinput from '../../../components/MDinput/index'
export default {
  components: {
    Sticky,
    Warning,
    BookUpload,
    MDinput
  },
  props: {
    isEdit: Boolean
  },
  data() {
    return {
      loading: false,
      labelWidth: '100px',
      postForm: {
        status: 'draft',

        title: '',
        auther: '',
        publisher: '',
        filePath: '',
        language: '',
        rootPath: '',
        unzipPath: '',
        coverPath: '',
        cover: ''
      },
      fileList: []
    }
  },
  methods: {
    submitForm() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    showGuide() {
      console.log('show guide...')
    },
    onUploadSuccess() {
      console.log('success')
    },
    onUploadRemove() {
      console.log('remove')
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-container {
    padding: 20px 30px 80px;
    .preview-img {
      height: 270px;
      width: 200px;
    }
    .content-wrapper {

    }
  }
</style>
