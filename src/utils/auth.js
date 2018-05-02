import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const page='gld-page';
export function getPage(){
  return sessionStorage.getItem(page);
}
export function setPage(currentpage) {
  return sessionStorage.setItem(page,currentpage);
}
export function removePage() {
  return sessionStorage.removeItem(page);
}

const fuzzy='gld-fuzzy';
export function getFuzzy(){
  return sessionStorage.getItem(fuzzy);
}
export function setFuzzy(currentpage) {
  return sessionStorage.setItem(fuzzy,currentpage);
}
export function removeFuzzy() {
  return sessionStorage.removeItem(fuzzy);
}

const radio='gld-radio';
export function getRadio(){
  return sessionStorage.getItem(radio);
}
export function setRadio(currentpage) {
  return sessionStorage.setItem(radio,currentpage);
}
export function removeRadio() {
  return sessionStorage.removeItem(radio);
}
