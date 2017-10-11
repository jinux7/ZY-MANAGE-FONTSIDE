import axios from 'axios';
import {baseUrl} from '../config/config';

let base = baseUrl;

export const requestLogin = params => { return axios.post(`${base}/login`, params); };

/*export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };*/

/*my add code ****************************************************/
/*心得文章********/
//添加心得文章页面的获取文章分类接口
export const getXdClasses = params => { return axios.get(`${base}/articleClasses`);}
//添加心得文章页面的提交接口
export const submitArticle = params => { return axios.post(`${base}/articles`,params,{headers: { 'Content-Type': 'multipart/form-data' }});}
//心得文章管理模糊查询根据文章标题获取文章接口
export const getXdArticleByLike = params => { return axios.post(`${base}/findarticlebylike`,params);}
//心得文章管理删除指定的文章接口
export const removeArticle = params => { return axios.post(`${base}/removeArticle`,params);}
//心得文章管理编辑文章获取文章信息接口
export const getDetailArticle = params => { return axios.get(`${base}/detailArticle?creatTime=`+params);}
//心得文章管理编辑文章提交接口
export const updateArticle = params => { return axios.post(`${base}/updateArticle`,params);}
/*end 心得文章********/
/*资源导航********/
//获取资源导航的分类项
export const getDhClasses = params => {return axios.get(`${base}/dhnav`);}
//上传资源导航数据
export const updateZy = params => {return axios.post(`${base}/addZy`,params);}
//资源管理页面模糊查询接口
export const getZyByLike = params => {return axios.post(`${base}/getZyByLike`,params);}
//按照分类获取资源导航的内容
export const getZyByClass = params => {return axios.post(`${base}/getZyByClass`,params);}
//删除指定的url所对应的资源
export const removeZyByUrl = params => {return axios.post(`${base}/removeZyByUrl`,params);}
//更新指定url所对应的资源
export const editZyConfirm = params => {return axios.post(`${base}/editZyConfirm`,params);}
/*end 资源导航********/
