/**
 * Created by Administrator on 2017/9/25.
 */
import fetch from '@/utils/fetch'

export function getList(page,fuzzy) {
  return fetch({
    url: '/certificate/blur',
    method: 'post',
    data:{
      page,
      row:10,
      fuzzy
    }
  })
}

export function upload(form){
  return fetch({
    url: '/certificate/uploadexl',
    method: 'post',
    data:form,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function licensing(form){
  return fetch({
    url: '/certificate/pickup',
    method: 'post',
    data:form
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
export function modify(form){
  return fetch({
    url: '/certificate/upcertificate',
    method: 'post',
    data: form

  })
}

