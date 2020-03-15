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
          :label="item.label + '(' + item.num + ')'"
          :value="item.label"
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
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="bookList"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :default-sort="defaultSort"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      />
      <el-table-column
        label="书名"
        width="150"
        align="center"
      >
        <template slot-scope="{ row: { titleWrapper }}">
          <span v-html="titleWrapper" />
        </template>
      </el-table-column>
      <el-table-column
        label="作者"
        width="150"
        align="center"
      >
        <template slot-scope="{ row: { authorWrapper }}">
          <span v-html="authorWrapper" />
        </template>
      </el-table-column>
      <el-table-column
        label="出版社"
        prop="publisher"
        width="150"
        align="center"
      />
      <el-table-column
        label="分类"
        width="100"
        prop="categoryText"
        align="center"
      />
      <el-table-column
        label="语言"
        prop="language"
        align="center"
        width="100"
      />
      <el-table-column
        v-if="showCover"
        label="封面"
        width="150"
        align="center"
      >
        <template slot-scope="{ row: { cover }}">
          <a :href="cover" target="_blank">
            <img :src="cover" style="width:120px; height:180px">
          </a>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createDt"
        align="center"
        width="120"
      >
        <template slot-scope="{ row: { createDt } }">
          <span>{{ createDt | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建人"
        width="100"
        align="center"
      >
        <template slot-scope="{ row: { createUser } }">
          <span>{{ createUser | valueFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文件名"
        prop="fileName"
        width="100"
        align="center"
      />
      <el-table-column
        label="文件路径"
        width="100"
        align="center"
      >
        <template slot-scope="{ row: { filePath } }">
          <span>{{ filePath | valueFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
        align="center"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)" />
          <el-button type="text" icon="el-icon-delete" style="color:red" @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="refresh"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import waves from '@/directive/waves/waves'
import { bookGetCategory, bookGetList, bookDelete } from '@/api/book'
import { parseTime } from '@/utils/index'
export default {
  components: {
    Pagination
  },
  directives: {
    waves
  },
  filters: {
    valueFilter(value) {
      return value || '无'
    },
    timeFilter(time) {
      return time ? parseTime(time, '{y}-{m}-{d} {h}:{i}') : '无'
    }
  },
  data() {
    return {
      tableKey: 0, // el-table的标识
      listQuery: {}, // 查询条件
      listLoading: false, // 列表loading
      showCover: false, // 是否显示封面
      categoryList: [], // 分类列表
      bookList: [], // 图书列表
      total: 0, // 总条数
      defaultSort: {} // 排序
    }
  },
  mounted() {
    this.getCategoryList()
    this.getBookList()
  },
  created() {
    this.parseQuery() // 初始化请求参数
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === from.path) {
      const newQuery = Object.assign({}, to.query)
      const oldQuery = Object.assign({}, from.query)
      if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
        this.getBookList()
      }
    }
    next()
  },
  methods: {
    // 解析请求参数
    parseQuery() {
      const query = Object.assign({}, this.$route.query)
      let sort = '+id'
      const listQuery = {
        page: 1,
        pageSize: 20,
        sort
      }
      if (query) {
        query.page && (query.page = +query.page)
        query.pageSize && (query.pageSize = +query.pageSize)
        query.sort && (sort = query.sort)
      }
      const sortSymbol = sort[0]
      const sortColumn = sort.slice(1, sort.length)
      this.defaultSort = {
        prop: sortColumn,
        order: sortSymbol === '+' ? 'ascending' : 'descending'
      }
      this.listQuery = { ...listQuery, ...query } // 合并对象 query覆盖listQuery
    },
    refresh() {
      this.$router.push({
        path: '/book/list',
        query: this.listQuery
      })
    },
    // 处理路由参数修改
    handleFilter(e) {
      this.listQuery.page = 1 // 重置页码
      this.refresh()
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
    // 列表排序方式
    sortChange(data) {
      const { prop, order } = data
      this.sortBy(prop, order)
    },
    sortBy(prop, order) {
      if (order === 'ascending') {
        this.listQuery.sort = `+${prop}` // 升序
      } else {
        this.listQuery.sort = `-${prop}` // 降序
      }
      this.handleFilter()
    },
    // 获取电子书列表
    getBookList() {
      this.listLoading = true
      bookGetList(this.listQuery).then((res) => {
        const { bookList, count } = res.data
        this.bookList = bookList
        this.total = count
        this.listLoading = false
        // 新增高亮提示的文本
        this.bookList.forEach(book => {
          book.titleWrapper = this.wrapperKeywork('title', book.title)
          book.authorWrapper = this.wrapperKeywork('author', book.author)
        })
      })
    },
    // 关键字高亮展示
    wrapperKeywork(key, value) {
      function highlight(value) {
        return `<span style="color: red">${value}</span>`
      }
      if (!this.listQuery[key]) {
        return value
      } else {
        return value.replace(new RegExp(this.listQuery[key], `ig`), value => highlight(value)) // 不区分大小写 全局查询
      }
    },
    // 跳转到编辑
    handleUpdate(row) {
      this.$router.push(`/book/edit/${row.fileName}`)
    },
    // 删除某行
    handleDelete(row) {
      this.$confirm('此操作将永久删除该电子书，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bookDelete(row.fileName).then((res) => {
          this.$notify({
            title: '提示',
            message: res.msg || '删除成功',
            type: 'success',
            duration: 2000
          })
          this.handleFilter()
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
