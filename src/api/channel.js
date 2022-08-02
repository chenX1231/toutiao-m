// import store from '@/store'
import request from '@/utils/request'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
    // headers: {
    //   // Bearer 后面一定要有空格
    //   Authorization: 'Bearer ' + store.state.tokenObj.token
    // }
  })
}
