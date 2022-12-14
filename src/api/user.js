import request from '@/utils/request'

/**
 * 登录API
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 验证码API
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const getCodeApi = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户个人资料
 * @returns Promise
 */
export const getUserInfoApi = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 如果传的是对象, axios默认将对象转成json并且加上content-type=application/json
// 如果传的是formDate表单, 那么axios会将表单提交给后端, 并且默认的加上content-type=mutipart/form-data
// 如果后端要的是表单(form-data)
// const fm = new FormData()
// fm.append('表单的name',表单项)

/**
 * 上传的图片
 * @param {*} file 图片的file对象
 * @returns Promise
 */

export const getUserPhoto = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

/**
 * 编辑个人资料
 * @param {String} name 昵称
 * @param {String} gender 性别，0-男，1-女
 * @param {String} birthday 生日，格式'2018-12-20'
 * @param {String} realName 真实姓名
 * @param {String} intro 个人介绍
 * @returns Promise
 */
export const getUserProfile = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
