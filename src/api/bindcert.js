/**
 * Created by Administrator on 2017/9/25.
 */
import fetch from '@/utils/fetch'

export function getList(page,fuzzy,type) {
  return fetch({
    url: '/binding/viewbinding',
    method: 'post',
    data:{
      page,
      row:10,
      fuzzy,
      type
    }
  })
}
export function relieve(bindingid){
  return fetch({
    url: '/binding/remove',
    method: 'post',
    data:{
      bindingid
    }
  })
}



export function bindbyid(id){
  return fetch({
    url: '/binding/findone',
    method: 'post',
    data:{
      id
    }
  })
}
export function userbyid(id){
  return fetch({
    url: '/user/findone',
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


export function bindsuccess(form){
  return fetch({
    url: '/binding/success',
    method: 'post',
    data:form
  })
}
export function bindfail(form){
  return fetch({
    url: '/binding/reject',
    method: 'post',
    data:form
  })
}

export function richText(form){
  return fetch({
    url: '/info/save',
    method: 'post',
    data:form
  })
}
