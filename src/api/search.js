import request from '@/utils/request'

/**
 * 获取搜索建议
 * @param {String} q 搜索关键词
 * @returns Promise
 */
export const getSearchSuggestionApi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

/**
 * 获取搜索结果
 * @param {String} q 搜索关键词
 * @returns Promisse
 */
export const getSearchResultApi = (q, page) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}
