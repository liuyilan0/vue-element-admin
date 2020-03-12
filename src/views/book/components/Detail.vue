<template>
  <el-form ref="postForm" :model="postForm" :rules="rules">
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
              <el-form-item label="作者:" :label-width="labelWidth" prop="author">
                <el-input v-model="postForm.author" placeholder="作者" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出版社:" :label-width="labelWidth" prop="publisher">
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
                <el-input v-model="postForm.originalName" placeholder="文件名称" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="封面图片:" :label-width="labelWidth">
                <a v-if="postForm.cover" :href="postForm.cover" target="_blank">
                  <img :src="postForm.cover" class="preview-img">
                </a>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="目录结构:" :label-width="labelWidth">
                <div v-if="postForm.contents && postForm.contents.length > 0" class="content-wrapper">
                  <el-tree :data="postForm.contentsTree" @node-click="onContentClick" />
                </div>
                <span v-else>暂无数据</span>
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

// 规则字段映射
const fields = {
  title: '标题',
  author: '作者',
  publisher: '出版社'
}

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
    const validateRequire = (rule, value, callback) => {
      if (Object.is(value, undefined) || value.length === 0) {
        callback(new Error(fields[rule.field] + '必须填写'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      labelWidth: '100px',
      postForm: {
        // status: 'draft',
        ebook_uri: ''
      },
      fileList: [],
      rules: {
        title: [{ validator: validateRequire }],
        author: [{ validator: validateRequire }],
        publisher: [{ validator: validateRequire }]
      }
    }
  },
  methods: {
    setData(data) {
      const {
        title,
        author,
        publisher,
        filePath,
        language,
        rootFile,
        unzipPath,
        coverPath,
        cover,
        originalName,
        contents,
        contentsTree
      } = data
      this.postForm = {
        ...this.postForm,
        title,
        author,
        publisher,
        filePath,
        language,
        rootFile,
        unzipPath,
        coverPath,
        cover,
        originalName,
        contents,
        contentsTree
      }
    },
    onUploadSuccess(data) {
      // 赋值
      this.setData(data)
    },
    onUploadRemove() {
      // 赋空值
      this.postForm = {}
    },
    // 提交表单，上传电子书
    submitForm() {
      if (!this.loading) {
        this.loading = true
        // 表单数据校验
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            const book = Object.assign({}, this.postForm) // 浅拷贝
            delete book.contents
            delete book.contentsTree
            if (!this.isEdit) {
              this.createBook()
            } else {
              this.updateBook()
            }
          } else {
            const msg = fields[Object.keys(fields)[0]][0].message
            this.$message.error(msg)
            this.loading = false
          }
        })
      }
    },
    // 显示帮助
    showGuide() {
      console.log('show guide...')
    },
    // 点击目录
    onContentClick(data) {
      if (data.text) {
        window.open(data.text)
      }
    },
    // 创建图书
    createBook() {

    },
    // 编辑图书
    updateBook() {
    }
  }
}
</script>

<style lang="scss" scoped>
$color: red;
  .detail-container {
    padding: 20px 30px 80px;
    .preview-img {
      height: 270px;
      width: 200px;
    }
    .content-wrapper {
      color: $color;
    }
  }
</style>
