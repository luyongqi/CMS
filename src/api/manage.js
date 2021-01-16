/*
 * @Author: 卢勇其
 * @Date: 2020-07-07 16:13:30
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-16 09:56:49
 */ 
import instance  from './index.js'
var prefix = '/000'                       //url 前缀
// var prefix = ''                                 //url 前缀

/**
 * @description: 修改所有url前缀（除登录页查询单位列表接口时固定的，只有当登录时选择的单位有变化时才做修改 
 *            修改时从localStorage 中取值(目的是防止在其他页面刷新时，又恢复到默认值)
 *      调用该方法是在vue实例创建时的mounted中和选择的单位发生改变时
 */
export function setPrefix(){                
    prefix = localStorage.getItem('preFix') || '/000'
}

// 登录页获取所有单位 
export const checkIsOrg = (data) => instance.post('/000/v1/device/org/isOrgByCode', data)               //校验编码是否存在对应的单位

// 登录管理
export const login = (data) => instance.post(`${prefix}/v1/device/sso/login`, data)                     //用户登录
export const register = (data) => instance.post(`${prefix}/v1/device/user/register`, data)              //用户注册
export const logout = (data) => instance.post(`${prefix}/v1/device/sso/logout`, data)                   //用户注销
export const updatedPwd = (data) => instance.post(`${prefix}/v1/device/sso/pwdUpdate`, data)            //重置密码
export const changePwd = (data) => instance.post(`${prefix}/v1/device/sso/pwdModify`, data)            //修改密码

//用户管理
export const addUser = (data) => instance.post(`${prefix}/v1/device/user/userAdd`, data)                 //新建用户
export const getUserList = (data) => instance.post(`${prefix}/v1/device/sso/getUserList`, data)         //用户列表
export const getUserInfo = (data) => instance.post(`${prefix}/v1/device/user/userInfoByUserId`, data)    //用户信息详情
export const delUser = (data) => instance.post(`${prefix}/v1/device/user/userDel`, data)                 //删除用户
export const allocUserRole = (data) => instance.post(`${prefix}/v1/device/userRole/save`, data)          //授权用户角色

// 菜单管理
export const addMenu = (data) => instance.post(`${prefix}/v1/device/menu/save`, data)                    //菜单新增、修改
export const getAllMenuList = (data) => instance.post(`${prefix}/v1/device/menu/all`, data)              //所有菜单列表
export const getMenuByUser = (data) => instance.post(`${prefix}/v1/device/menu/allByAuth`, data)         //菜单-查询用户-根据角色权限
export const setMenuByRoleId = (data) => instance.post(`${prefix}/v1/device/roleMenu/batchSave`, data)   //菜单授权-角色授权-批量(菜单)修改
export const getMenuRoleId = (data) => instance.post(`${prefix}/v1/device/roleMenu/findMenuIdsByRoleId`, data)   //菜单授权-角色授权-批量(菜单)修改

// 角色管理
export const getRoleList = (data) => instance.post(`${prefix}/v1/device/role/all`, data)                         //通过token获取角色(不分页)
export const getAllRoleList = (data) => instance.post(`${prefix}/v1/device/role/pageAll`, data)                  //分页获取角色列表
export const getRoleListByAuth = (data) => instance.post(`${prefix}/v1/device/role/pageAllByAuth`, data)         //角色-分页获取全部可见角色-根据用户角色
export const addRole = (data) => instance.post(`${prefix}/v1/device/role/save`, data)                            //新建角色
export const getAllRoleListByAuth = (data) => instance.post(`${prefix}/v1/device/role/allByAuth`, data)          //角色-获取全部-根据用户角色

// 单位管理
export const addCompany = (data) => instance.post(`${prefix}/v1/device/org/orgAdd`, data)                //新建单位
export const getCompanyList = (data) => instance.post(`${prefix}/v1/device/org/getOrgList`, data)        //单位列表
export const getCompanyDetail = (data) => instance.post(`${prefix}/v1/device/org/orgInfo`, data)         //单位详情
export const delCompanyInfo = (data) => instance.post(`${prefix}/v1/device/org/orgDel`, data)            //单位信息删除
export const isForbidCompany = (data) => instance.post(`${prefix}/v1/device/org/updateStatus`, data)       //是否禁用单位 0-停用 1-正常

//部门管理
export const addDepartment = (data) => instance.post(`${prefix}/v1/device/dept/deptAdd`, data)           //新建部门
export const getDeptList = (data) => instance.post(`${prefix}/v1/device/dept/getDeptList`, data)         //部门列表
export const getDeptInfo = (data) => instance.post(`${prefix}/v1/device/dept/deptInfo`, data)            //部门信息详情
export const delDept = (data) => instance.post(`${prefix}/v1/device/dept/deptDel`, data)                 //删除部门
export const isForbidDept = (data) => instance.post(`${prefix}/v1/device/dept/updateStatus`, data)       //是否禁用部门 0-停用 1-正常

// 设备管理
export const addDevice = (data) => instance.post(`${prefix}/v1/device/device/deviceAdd`, data)           //新建设备
export const getDeviceList = (data) => instance.post(`${prefix}/v1/device/device/getDeviceList`, data)   //设备列表
export const getDeviceInfo = (data) => instance.post(`${prefix}/v1/device/device/deviceInfo`, data)      //设备信息详情
export const delDevice = (data) => instance.post(`${prefix}/v1/device/device/deviceDel`, data)           //删除设备
export const getAllStepTreeList = (data) => instance.post(`${prefix}/v1/device/device/getAllStepList`, data)      //查询所有设备对应步骤树形结构列表
export const isForbidDevice = (data) => instance.post(`${prefix}/v1/device/device/updateStatus`, data)       //是否禁用设备 0-停用 1-正常

//分组管理
export const addGroup = (data) => instance.post(`${prefix}/v1/device/group/groupAdd`, data)               //新建分组
export const getGroupList = (data) => instance.post(`${prefix}/v1/device/group/getGroupList`, data)       //分组列表
export const getGroupInfo = (data) => instance.post(`${prefix}/v1/device/group/groupInfo`, data)          //分组信息详情
export const delGroup = (data) => instance.post(`${prefix}/v1/device/group/groupDel`, data)               //删除分组
export const isForbidGroup = (data) => instance.post(`${prefix}/v1/device/group/updateStatus`, data)       //是否禁用分组 0-停用 1-正常

//人员管理
export const addStaff = (data) => instance.post(`${prefix}/v1/device/user/userAdd`, data)                 //新建人员
export const getStaffList = (data) => instance.post(`${prefix}/v1/device/user/getUserList`, data)         //人员列表
export const getStaffInfo = (data) => instance.post(`${prefix}/v1/device/user/userInfo`, data)            //人员信息详情
export const delStaff = (data) => instance.post(`${prefix}/v1/device/user/userDel`, data)                 //删除人员

//项目管理
export const addProject = (data) => instance.post(`${prefix}/v1/device/item/itemAdd`, data)              //新建项目
export const getProjectList = (data) => instance.post(`${prefix}/v1/device/item/getItemList`, data)      //项目列表
export const getProjectInfo = (data) => instance.post(`${prefix}/v1/device/item/itemInfo`, data)         //项目信息
export const delProject = (data) => instance.post(`${prefix}/v1/device/item/itemDel`, data)              //删除项目
export const isForbidProject = (data) => instance.post(`${prefix}/v1/device/item/updateStatus`, data)       //是否禁用项目 0-停用 1-正常

//步骤管理
export  const addStep = (data) => instance.post(`${prefix}/v1/device/step/stepAdd`,data)                 //新建步骤
export  const getStepList = (data) => instance.post(`${prefix}/v1/device/step/getStepList`,data)         //步骤列表
export  const getStepInfo = (data) => instance.post(`${prefix}/v1/device/step/stepInfo`,data)            //步骤信息
export  const delStep = (data) => instance.post(`${prefix}/v1/device/step/stepDel`,data)                 //删除步骤
export const isForbidStep = (data) => instance.post(`${prefix}/v1/device/step/updateStatus`, data)       //是否禁用步骤 0-停用 1-正常

//工单管理
export  const addWorkOrder = (data) => instance.post(`${prefix}/v1/device/work/workAdd`,data)            //新建工单
export  const getWorkList = (data) => instance.post(`${prefix}/v1/device/work/getWorkList`,data)         //工单列表
export  const getWorkInfo = (data) => instance.post(`${prefix}/v1/device/work/workInfo`,data)            //工单信息
export  const delWork = (data) => instance.post(`${prefix}/v1/device/work/workDel`,data)                 //删除工单
export  const setWorkStatus = (data) => instance.post(`${prefix}/v1/device/work/workAudit`,data)         //修改工单审核状态

//工单数据管理
export  const getWorkDataList = (data) => instance.post(`${prefix}/v1/device/workData/getDataList`,data)      //获取工单数据列表
export  const setWorkDataAuth = (data) => instance.post(`${prefix}/v1/device/workData/dataAudit`,data)           //工单数据审核
export  const getWorkDataInfo = (data) => instance.post(`${prefix}/v1/device/workData/dataInfo`,data)         //工单数据详情

//行政区管理
export  const getRegionInfo = (data) => instance.get(`${prefix}/v1/region/regionInfo`,data)                     //根据地区编码获取完整地区信息
export  const getRegionListById = (data) => instance.post(`${prefix}/v1/region/regionInfoList`,data)            //根据多个地区编码获取信息列表
export  const getRegionAllListById = (data) => instance.post(`${prefix}/v1/region/regionInfoAllList`,data)      //根据多个地区编码获取完整地区信息列表
export  const getCountyList = (data) => instance.post(`${prefix}/v1/region/counties`,data)                      //获取区/县列表
export  const getCityList = (data) => instance.post(`${prefix}/v1/region/cities`,data)                          //获取城市列表
export  const getVillageList = (data) => instance.post(`${prefix}/v1/region/villages`,data)                     //获取居委会/村列表
export  const getProvinceList = (data) => instance.post(`${prefix}/v1/region/provinces`,data)                   //获取省份列表
export  const getTownList = (data) => instance.post(`${prefix}/v1/region/towns`,data)                           //获取街道/乡镇列表