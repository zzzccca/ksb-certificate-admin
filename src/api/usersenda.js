/**
 * Created by Administrator on 2017/9/26.
 */
import fetch from '@/utils/fetch'
import axios from 'axios'



export function changeState(id) {
  return fetch({
    url: '/cert/scenetocert',
    method: 'post',
    params:{
     id
    }
  })
}


export function saveState(id,names,idcards) {
  return fetch({
    url: '/cert/scenetocert',
    method: 'post',
    params:{
      id,
      idcards,
      names
    }
  })
}




export function getList(page,fuzzy,type) {
  return fetch({
    url: '/expressage/pageall',
    method: 'post',
    data:{
      page,
      row:10,
      fuzzy,
      type
    }
  })
}
export function upload(form){
  return fetch({
    url: '/expressage/uploadexl',
    method: 'post',
    data:form,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export function showmailpeople(data){
  return axios({
    url:'http://kd.wzks.cn/cert/cert/findbymailstatus',
    method:'post',
    params:data,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}
export function upload2(data){
  return axios({
    url:'http://kd.wzks.cn/cert/cert/uploadexl',
    method:'post',
    data:data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export function reject(form){
  return fetch({
    url: '/expressage/reject',
    method: 'post',
    data:form,
  })
}


export function expressagebyid(id){
  return fetch({
    url: '/expressage/findone',
    method: 'post',
    data:{
      id
    }
  })
}
export function findbyid(id){
  return fetch({
    url: '/certificate/findbyid',
    method: 'post',
    data:{
      id
    }
  })
}
export function expressagesuccess(expressageid){
  return fetch({
    url: '/expressage/success',
    method: 'post',
    data:{
      expressageid
    }
  })
}


export function  chaxun(qq) {
  return fetch({
    url:'/cert/findbyidcard',
    method:'post',
    params: qq

  })
}


export function  delsj(id) {
  return fetch({
    url:'/cert/delete',
    method:'post',
    params:id

  })
}
