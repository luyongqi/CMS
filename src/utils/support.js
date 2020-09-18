/*
 * @Description: 
 * @Date: 2020-09-09 15:25:41
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-09 15:35:33
 */
import Cookies from "js-cookie";
const SupportKey='supportKey';
export function getSupport() {
  return Cookies.get(SupportKey)
}

export function setSupport(isSupport) {
  return Cookies.set(SupportKey, isSupport,{ expires: 3 })
}

export function setCookie(key,value,expires) {
  return Cookies.set(key, value,{ expires: expires})
}

export function getCookie(key) {
  return Cookies.get(key)
}

export function removeToken(key) {
    return Cookies.remove(key)
  }