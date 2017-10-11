<template>
	<div id="zyManage">
		<div class="searchArea">
	        <el-select v-model="selectValue" @change="selectChange">
	          <el-option
	            v-for="item in selectOption"
	            :key="item.idCode"
	            :label="item.name"
	            :value="item.idCode">
	          </el-option>
	        </el-select>
		</div>
		<div class="dataArea">
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="title"
			      label="分享资源标题">
			    </el-table-column>
			    <el-table-column
			      prop="description"
			      label="分享资源描述">
			    </el-table-column>
			    <el-table-column
			      label="操作">
			      <template scope="scope">
			        <el-button @click="editZy(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
			        <el-button @click="removeZyInTable(scope.$index,scope.row)" type="text" size="small">删除</el-button>
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
		    <el-button type="primary" @click="removeZy()">确 定</el-button>
		  </span>
		</el-dialog>

		<el-dialog title="修改资源导航内容" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item>
		      <el-input v-model="form.title" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item>
		      <el-input v-model="form.description" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item>
		      <el-input v-model="form.url" auto-complete="off"></el-input>
		    </el-form-item>
		    
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="editZyConfirm">确 定</el-button>
		  </div>
		</el-dialog>

	</div>
</template>
<script>
	import { getZyByClass,getDhClasses,removeZyByUrl,editZyConfirm } from '../../api/api';
	export default {
		name:"zyManage",
		data(){
			return {
				dialogVisible:false,
				dialogFormVisible:false,
				dhTitleName:'',
				tableData:[],
				removeZyClass:'',
				removeUrl:'',
				removeIndex:-1,
				selectValue:'qdkf',
				selectOption:'',
				form:{
					title:'',
					description:'',
					url:""
				}
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
				getZyByClass({"classCode":_this.selectValue})
				.then(function(res){
					let arr = res.data[0].arrData,dataArr=[];
					console.log(res);
					for(let i=0;i<arr.length;i++){
						let obj = {
							"title":arr[i].title,
							"description":arr[i].description,
							"url":arr[i].url
							};
						dataArr.push(obj);
					}
					_this.tableData = dataArr;
				})
				.catch(function(err){
					console.log(err);
				});
			},
			editZy(index,row){
				let beforeUrl = row.url;
				this.dialogFormVisible = true;
				this.form = row;
				this.form.idCode = this.selectValue;
				this.form.beforeUrl = beforeUrl;

			},
			editZyConfirm(){
				let _this = this;
				this.dialogFormVisible = false;
				editZyConfirm(this.form)
				.then(function(res){
					console.log(res);
					_this.$message({
	                    message: '修改资源导航内容成功',
	                    type: 'success'
	                  });

				})
				.catch(function(err){
					console.log(err);
				});
			},
			removeZyInTable(index,row){
				this.dialogVisible = true;
				this.url = row.url;
				this.removeIndex = index;
			},
			removeZy(){
				let _this = this;
				this.dialogVisible = false;
				removeZyByUrl({"idCode":_this.selectValue,"url":_this.url})
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
			},
			selectChange(){
				this.searchClick();
			}
		},
		mounted(){
			//请求下拉菜单data
	        let _this = this;
	        getDhClasses()
	        .then(function(res){
	          _this.selectOption = res.data[0].data;
	          console.log(_this.selectOption);
	        })
	        .catch(function(err){
	          console.log(err);
	        });
			this.searchClick();
		},
	}
</script>
<style scoped>
	.searchArea {
		margin: 15px 0;
	}
	.searchArea .el-select {
		width: 100%;
	}
</style>