import fetch from '@/utils/fetch'

export function getList(page,fuzzy) {
  return fetch({
    url: '/user/fuzzy',
    method: 'post',
    data:{
      page,
      row:10,
      fuzzy
    }
  })
}
export  function removeUser(id){
  return fetch({
    url:'/user/delete',
    method:'post',
    data:{
      id
    }
  })
}
