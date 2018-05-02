/**
 * Created by Administrator on 2017/9/26.
 */
import fetch from '@/utils/fetch'

export function getList(page,fuzzy,type) {
  return fetch({
    url: '/enquiries/pageall',
    method: 'post',
    data:{
      page,
      row:10,
      fuzzy,
      type
    }
  })
}
