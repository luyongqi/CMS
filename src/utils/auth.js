/*
 * @Description: 设置登录token
 * @Date: 2020-09-09 15:53:56
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-19 17:27:02
 */
import Cookies from 'js-cookie'

const TokenKey = 'loginToken'                 //token
const userKey = 'userId'                      //用户id

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(userKey)
}

export function setUserId(token) {
  return Cookies.set(userKey, token)
}

export function removesetUserId() {
  return Cookies.remove(userKey)
}