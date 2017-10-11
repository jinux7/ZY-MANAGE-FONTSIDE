<template>
	<div id="xdManage">
		<div class="searchArea">
			<el-input
			  placeholder="请输入要查找的文章标题"
			  icon="search"
			  v-model="articleTitleName"
			  :on-icon-click="searchClick"
			  @keyup.native.13="searchClick">
			</el-input>
		</div>
		<div class="dataArea">
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="date"
			      label="文章发表日期">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="文章标题">
			    </el-table-column>
			    <el-table-column
			      label="操作">
			      <template scope="scope">
			        <el-button @click="editArticle(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
			        <el-button @click="removeArticleInTable(scope.$index,scope.row)" type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		</div>

		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  size="tiny"
		  :before-close="handleClose">
		  <span>真的要删除这篇好文吗?</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="removeArticle()">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>
<script>
	import { getXdArticleByLike,removeArticle } from '../../api/api';
	export default {
		data(){
			return {
				dialogVisible:false,
				articleTitleName:'',
				tableData:[],
				removeArticleCreatTime:'',
				removeIndex:-1
			}
		},
		methods:{
			formatDate(d){
				let date = new Date();
				date.setTime(d);
				return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日';
			},
			searchClick(){
				let _this = this;
				getXdArticleByLike({"titleName":_this.articleTitleName})
				.then(function(res){
					let arr = res.data,dataArr=[];
					for(let i=0;i<arr.length;i++){
						let obj = {
							"date":_this.formatDate(arr[i].creatTime),
							"name":arr[i].title,
							"creatTime":arr[i].creatTime
							};
						dataArr.push(obj);
					}
					_this.tableData = dataArr;
				})
				.catch(function(err){
					console.log(err);
				});
			},
			editArticle(index,row){
				this.removeArticleCreatTime = row.creatTime;
				this.$router.push({path:'/xdEdit',query:{"creatTime":this.removeArticleCreatTime}});
			},
			removeArticleInTable(index,row){
				this.dialogVisible = true;
				this.removeArticleCreatTime = row.creatTime;
				this.removeIndex = index;
			},
			removeArticle(){
				let _this = this;
				this.dialogVisible = false;
				removeArticle({"creatTime":_this.removeArticleCreatTime})
				.then(function(res){
					_this.tableData.splice(_this.removeIndex,1);
					_this.$message({
	                    message: '成功删除了一篇文章',
	                    type: 'success'
	                  });
				})
				.catch(function(err){
					console.log(err);
					_this.$message({
	                    message: '删除文章失败',
	                    type: 'error'
	                  });
				});
			},
			handleClose(){
				this.dialogVisible = false;
			}
		},
		mounted(){
			this.searchClick();
		},
	}
</script>
<style scoped>
	.searchArea {
		margin: 15px 0;
	}
</style>