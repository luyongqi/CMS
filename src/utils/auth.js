/*
 * @Description: 设置登录token
 * @Date: 2020-09-09 15:53:56
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-09 15:54:25
 */
import Cookies from 'js-cookie'

const TokenKey = 'loginToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}