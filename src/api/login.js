import fetch from '@/utils/fetch'

export function login(account, password) {
  return fetch({
    url: '/admin/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return fetch({
    url: '/admin/logout',
    method: 'post'
  })
}
