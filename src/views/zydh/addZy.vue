<template>
  <div id="addZy">
    <form id="picform" class="form">
      <div>
        <el-input type="text" placeholder="请输入资源标题" name="title" v-model="title"></el-input>
      </div>
      <div>
        <el-input type="text" placeholder="请输入资源描述信息" name="description" v-model="description"></el-input>
      </div>
      <div>
        <el-input type="text" placeholder="请输入资源链接网址" name="siteUrl" v-model="siteUrl"></el-input>
      </div>
      <div>
        <el-select v-model="selectValue" placeholder="请选择资源分类">
          <el-option
            v-for="item in selectOption"
            :key="item.idCode"
            :label="item.name"
            :value="item.idCode">
          </el-option>
        </el-select>
      </div>
      <span class="btn" v-on:click.stop="goback">返回</span>
      <span class="btn" v-on:click.stop="tijiao">提交</span>
    </form>
  </div>
</template>

<script>
import { getDhClasses,updateZy } from '../../api/api';
export default {
  name: 'addZy',
  data () {
    return {
      selectValue:'',
      selectOption:[],
     	title:'',
     	description:'',
      siteUrl:'',
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
  },
  methods : {
  	goback(){
  		this.$router.push({ path: '/' });
  	},
  	tijiao(){   
      let _this = this;
      if( this.title=='' || this.description=='' || this.selectValue=='' || this.siteUrl=='' ){
        this.$message({
                    message: '填写好内容！！！',
                    type: 'error'
                  });
        return ;
      }
      let sendObj = {
        title:this.title,
        description:this.description,
        url:this.siteUrl,
        selectValue:this.selectValue
      };
      updateZy(sendObj)
      .then(function(res){
        if(res.data === 'ok'){
          _this.$router.push({ path: '/' })
        }
      })
      .catch(function(err){
        console.log(err);
      });
      /*this.$http.post(baseUrl+"/articles",fd)
      .then(function(res){
        if(res.body === 'ok'){
          this.$router.push({ path: '/' })
        }
      },function(err){
        console.log(err);
      });*/
  	}
  },
  components:{
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #addArticle {
    margin-top: 60px;
  }
	.form {
		overflow: hidden;
		padding: 10px 20px;
    font-family: "microsoft yahei";
	}
	.form > div {
		padding: 5px 10px;
		text-align: left;
	}
	.form > div > input {
		line-height: 30px;
		color: gray;
	    width: 100%;
	    border-radius: 3px;
	    border: 1px solid gray;
	    padding-left: 5px;
	    box-sizing:border-box;
      font-family: "Microsoft Yahei";
	}
	.form span.btn {
		margin-top: 10px;
		padding: 10px 20px;
		background-color: gray;
		border:none;
		border-radius: 3px;
		color: #ffffff;
		cursor: pointer;
		float: right;
		margin-right: 10px;
	}
  .form span.btn:nth-of-type(2) {
    background-color: #20a0ff;
  }
  textarea {
    width: 99.5%;
    resize: none;
    color: gray;
      width: 100%;
      border-radius: 3px;
      border: 1px solid gray;
      padding-left: 5px;
      box-sizing:border-box;
      height: 150px;
  }
  .el-select {
    width: 100%;
  }
  .el-input__inner {
    font-family: "Microsoft Yahei";
  }
  input[type="button"] {
    font-family: "Microsoft Yahei" !important;
  }
  .toolbar {
    margin: 0 !important;
  }
  #picture {
    display: none;
  }
</style>
