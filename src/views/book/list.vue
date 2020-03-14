<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="书名"
        style="width:200px"
        class="filter-item"
        clearable
        @blur="handleFilter"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
      />
      <el-input
        v-model="listQuery.author"
        placeholder="作者"
        style="width:200px"
        class="filter-item"
        clearable
        @blur="handleFilter"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
      />
      <el-select
        v-model="listQuery.category"
        placeholder="分类"
        class="filter-item"
        clearable
        @change="handleFilter"
      >
        <el-option
          v-for="item in categoryList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px"
        @click="handleFilter"
      >
        查询
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left:5px"
        @click="handleCreate"
      >
        新增
      </el-button>
      <el-checkbox
        v-model="showCover"
        class="filter-item"
        style="margin-left:5px"
        @change="changeShowCover"
      >
        显示封面
      </el-checkbox>
    </div>
    <el-table />
    <pagination
      :total="0"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import waves from '@/directive/waves/waves'
import { bookGetCategory, bookGetList } from '@/api/book'
export default {
  components: {
    Pagination
  },
  directives: {
    waves
  },
  data() {
    return {
      listQuery: {},
      showCover: false,
      categoryList: []
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    handleFilter(e) {
      console.log(e)
      this.getBookList()
    },
    // 新增电子书
    handleCreate() {
      this.$router.push('/book/create')
    },
    // 显示封面
    changeShowCover(value) {
      this.showCover = value
    },
    // 获取分类
    getCategoryList() {
      bookGetCategory().then((res) => {
        this.categoryList = res.data
      })
    },
    // 获取电子书列表
    getBookList() {
      bookGetList().then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
