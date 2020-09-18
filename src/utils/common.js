
//递归单位树状结构
export function treeCompany(arr,parentOrgId="0",treeNumber=-1) {
  var tree = [];
  var temp;
  treeNumber++; //表示层级 0 1 2
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].parentOrgId==parentOrgId) {
        var obj = arr[i]
        obj.treeNumber = treeNumber;
        temp =treeCompany(arr, arr[i].orgId,treeNumber);
        if (temp.length > 0) {
          obj.children = temp
        }
        tree.push(obj)
     }
  }
  return tree
}
//递归部门树状结构
export function treeListClass(arr, toMenuId="",treeNumber=-1) {
  var tree = [];
  var temp;
  treeNumber++; //表示层级 0 1 2
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].toClassId== toMenuId) {
        var obj = arr[i]
        obj.treeNumber = treeNumber;
        temp =treeListClass(arr, arr[i].classId,treeNumber);
        if (temp.length > 0) {
          obj.children = temp
        }
        tree.push(obj)
     }
  }
  return tree
}
//递归出树状结构(菜单)
 export function treeList(arr, toMenuId="0",treeNumber=-1) {
      var tree = [];
      var temp;
      treeNumber++; //表示层级 0 1 2
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].toMenuId == toMenuId) {
            var obj = arr[i]
            obj.treeNumber = treeNumber;
            temp = treeList(arr, arr[i].menuId,treeNumber);
            if (temp.length > 0) {
              obj.children = temp
            }
            tree.push(obj)
         }
      }
    return treeListSort(tree);
}
// 递归返回 navbar 列表
// export function getNavBarList(arr,menuId=''){
//     let that = this;
//     var tree = [];
//     var temp;
  
//     arr.forEach(item=>{if(item.menuId ==  menuId)temp={...item}})
//     tree.push(temp);
//     if(temp.toMenuId !== ""){
//       tree=tree.concat(getNavBarList(arr,temp.toMenuId));
//     }
//     return tree;
// }
export function getNavBarList(arr,menuId='0') {
  var tree = new Array();
  var temp;
  do{
    // 从arr中根据menuId获取节点
    temp = getCurrentDom(arr, menuId);
    tree.push(temp);
    menuId = temp.toMenuId;
  }while(menuId != '0');
  return tree.reverse()          //数组反转
}
//根据menuId 获取当前节点
function getCurrentDom(arr,menuId){
  for(let i=0;i<arr.length;i++){
    if(arr[i].menuId == menuId){
      return arr[i]
    }
  }
}
//递归树状结构顺序
function treeListSort(arr) {
    arr=arr.sort((a,b)=>a.menuSort-b.menuSort); //一级
    arr.forEach(item=>{
      if(item.children){
        treeListSort(item.children)
      }
    })
    return arr;
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 * 非立即执行的意思是触发事件后函数不会立即执行，而是在n秒后执行，如果在n秒内又触发了事件，则会重新计算汉书执行时间
 * 立即执行的意思是触发事件函数会立即执行，然后n秒内不触发时间才能继续执行函数的效果
 */
export function debounce(func,wait,immediate) {
  let timeout;

  return function () {
      let context = this;
      let args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
          var callNow = !timeout;
          timeout = setTimeout(() => {
              timeout = null;
          }, wait)
          if (callNow) func.apply(context, args)
      }
      else {
          timeout = setTimeout(function(){
              func.apply(context, args)
          }, wait);
      }
  }
}
/**
* @desc 函数节流
* @param func 函数  节流，就是指连续触发事件但是在n秒中只执行一次函数
* @param wait 延迟执行毫秒数
* @param type 1 表时间戳版，2 表定时器版
*/
export function throttle(func, wait, type) {
  if(type===1){
      var previous = 0;
  }else if(type===2){
      let timeout;
  }
  return function() {
      let context = this;
      let args = arguments;
      if(type===1){
          let now = Date.now();
          if (now - previous > wait) {
              func.apply(context, args);
              previous = now;
          }
      }else if(type===2){
          if (!timeout) {
              timeout = setTimeout(() => {
                  timeout = null;
                  func.apply(context, args)
              }, wait)
          }
      }
  }
}

//将多维数组转为一维数组
export function flat(arr){
  return [].concat(...arr.map(item=>Array.isArray(item)?flat(item):item))
}
