<template>
  <div id="addArticle">
    <form id="picform" class="form">
      <div>
        <el-input type="text" placeholder="请输入文章标题" name="title" v-model="title"></el-input>
      </div>
      <div>
        <el-input type="text" placeholder="请输入文章描述信息" name="description" v-model="description"></el-input>
      </div>
      <div>
        <input type="file" name="picture" @change="fileChange" id="picture" />
        <el-button type="primary" @click="uploadPic">上传图片</el-button>
        <span>{{fileName}}</span>
      </div>
      <div>
        <el-select v-model="selectValue" placeholder="请选择">
          <el-option
            v-for="item in selectOption"
            :key="item.code"
            :label="item.title"
            :value="item.code">
          </el-option>
        </el-select>
      </div>
      <div>
        <editor :content="content" @change="updateData"></editor>
      </div>
      <span class="btn" v-on:click.stop="goback">返回</span>
      <span class="btn" v-on:click.stop="tijiao">提交</span>
    </form>
  </div>
</template>

<script>
import { getXdClasses,submitArticle,getDetailArticle,updateArticle } from '../../api/api';
import 'font-awesome/css/font-awesome.min.css';
import VueHtml5Editor from 'vue-html5-editor';
var editor = new VueHtml5Editor({
    // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效 
    // global component name
    name: "vue-html5-editor",
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
    // if set true,will append module name to toolbar after icon
    showModuleName: false,
    // 自定义各个图标的class，默认使用的是font-awesome提供的图标
    // custom icon class of built-in modules,default using font-awesome
    icons: {
        text: "fa fa-pencil",
        color: "fa fa-paint-brush",
        font: "fa fa-font",
        align: "fa fa-align-justify",
        list: "fa fa-list",
        link: "fa fa-chain",
        unlink: "fa fa-chain-broken",
        tabulation: "fa fa-table",
        image: "fa fa-file-image-o",
        hr: "fa fa-minus",
        eraser: "fa fa-eraser",
        undo: "fa-undo fa",
        "full-screen": "fa fa-arrows-alt",
        info: "fa fa-info",
    },
    // 配置图片模块
    // config image module
    image: {
        // 文件最大体积，单位字节  max file size
        sizeLimit: 512 * 1024,
        // 上传参数,默认把图片转为base64而不上传
        // upload config,default null and convert image to base64
        upload: {
            url: 'http://127.0.0.1:3030/uploadPicEdit',
            headers: {},
            params: {},
            fieldName: "pic"
        },
        // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
        // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
        // set null to disable compression
        compress: {
            width: 1600,
            height: 1600,
            quality: 80
        },
        // 响应数据处理,最终返回图片链接
        // handle response data，return image url
        uploadHandler(responseText){
            //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
            console.log(responseText);
            var json = JSON.parse(responseText)
            if (!json.ok) {
                alert(json.msg)
            } else {

                return 'http://127.0.0.1:3030/' + json.data
            }
        }
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn）
    //default en-us, en-us and zh-cn are built-in
    language: "zh-cn",
    // 自定义语言
    i18n: {
        //specify your language here
        "zh-cn": {
            "align": "对齐方式",
            "image": "图片",
            "list": "列表",
            "link": "链接",
            "unlink": "去除链接",
            "table": "表格",
            "font": "文字",
            "full screen": "全屏",
            "text": "排版",
            "eraser": "格式清除",
            "info": "关于",
            "color": "颜色",
            "please enter a url": "请输入地址",
            "create link": "创建链接",
            "bold": "加粗",
            "italic": "倾斜",
            "underline": "下划线",
            "strike through": "删除线",
            "subscript": "上标",
            "superscript": "下标",
            "heading": "标题",
            "font name": "字体",
            "font size": "文字大小",
            "left justify": "左对齐",
            "center justify": "居中",
            "right justify": "右对齐",
            "ordered list": "有序列表",
            "unordered list": "无序列表",
            "fore color": "前景色",
            "background color": "背景色",
            "row count": "行数",
            "column count": "列数",
            "save": "确定",
            "upload": "上传",
            "progress": "进度",
            "unknown": "未知",
            "please wait": "请稍等",
            "error": "错误",
            "abort": "中断",
            "reset": "重置"
        }
    },
    // 隐藏不想要显示出来的模块
    // the modules you don't want
    hiddenModules: ["list","link","unlink","hr","full-screen","info"],
    // 自定义要显示的模块，并控制顺序
    // keep only the modules you want and customize the order.
    // can be used with hiddenModules together
    visibleModules: [
        "text",
        "color",
        "font",
        "align",
        "list",
        "link",
        "unlink",
        "tabulation",
        "image",
        "hr",
        "eraser",
        "undo",
        "full-screen",
        "info",
    ],
    // 扩展模块，具体可以参考examples或查看源码
    // extended modules
    modules: {
        //omit,reference to source code of build-in modules
    }
});

export default {
  name: 'addArticle',
  data () {
    return {
      selectValue:'',
      selectOption:[],
     	title:'',
     	description:'',
      articleBody:'',
      content:'请输入文章的内容...',
      fileName:'',
      creatTime:''
    }
  },
  mounted(){
        let creatTime = this.$route.query.creatTime;
        //请求该文章的信息内容
        let _this = this;
        getDetailArticle(creatTime)
        .then(function(res){
          let d = res.data[0];
          _this.title = d.title;
          _this.description = d.description;
          _this.selectValue = d.selectValue;
          _this.content =  _this.articleBody = d.articleBody;
          _this.creatTime = d.creatTime;

        })
        .catch(function(err){
          console.log(err);
        });
        //请求下拉菜单data
        getXdClasses()
        .then(function(res){
          _this.selectOption = res.data.slice(1);
        })
        .catch(function(err){
          console.log(err);
        });
  },
  methods : {
    updateData(data){
      this.articleBody = data;
    },
  	goback(){
  		this.$router.go(-1);
  	},
    uploadPic(){
      let inuptNode = document.getElementById('picture');
      return inuptNode.click();
    },
    fileChange(){
      let file = document.getElementById('picture').files[0];
      let name = file.name;
      name = name.slice(0,name.length-4);
      this.fileName = "　您上传的文件名为："+name+",　大小是："+(file.size/1024).toFixed(2)+"Kb";
    },
  	tijiao(){   
      var picture = document.getElementById('picture');
      var fd = new FormData();
      if(this.title=='' || this.description=='' || this.selectValue=='' ){
        this.$message({
                    message: '选择图，填写好内容！！！',
                    type: 'error'
                  });
        return ;
      }
      //判断文件后缀名和大小
      if(document.getElementById('picture').files[0]){
          if(picture.files[0]){
           var houz = /\.[^\.]+$/.exec(picture.files[0].name);
           var size = picture.files[0].size; 
        }
        if(houz!='.jpg' && houz!='.png' && houz!='.gif' ){
          this.$message({
                      message: '请上传图片格式的文件',
                      type: 'error'
                    });
          return ;
        }
        if(size > 4194304){
          this.$message({
                      message: '嘿，您上传的图片太大了，小于4M的哦！！！',
                      type: 'error'
                    });
          return ;
        }
      }


      fd.append('title',this.title);
      fd.append('description',this.description);
      fd.append('selectValue',this.selectValue);  
      fd.append('picture',picture.files[0]); 
      fd.append('creatTime',this.creatTime);  
      fd.append('articleBody',this.articleBody);
      let _this = this;
      updateArticle(fd)
      .then(function(res){
        if(res.data === 'ok'){
          _this.$router.push({ path: '/' })
        }
      })
      .catch(function(err){
        console.log(err);
      });
     
  	}
  },
  components:{
      editor
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
