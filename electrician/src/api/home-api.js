import {fetch, baseUrl} from 'config/index'
console.log(baseUrl)
export function loginUserNo (params) {
  return fetch(`${baseUrl}/root/login/checkMemberLogin`, params)
}
