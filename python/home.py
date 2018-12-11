import requests
import json
get_post_comments_url = "http://home.netease.com/captain/comment/getPostComments.du"
reply_post_url = "http://home.netease.com/captain/comment/replyPost.du"
cookies = dict(cookies_are='JSESSIONID=F5ABAE71AFB2BDC551277B53FC91A36D; Hm_lvt_b9b943fde20f5fb3a9f5862bf7790a8a=1530515972; _ga=GA1.2.797719616.1540461412; Hm_lvt_d1f1df8cd06d5684d88473bd8cd05b16=1541123945,1541397296,1542005183,1542160331; hrs_online_op_state_id_1.0=rr8ge805dt; hrs_online_op_session_id_1.0=16E5769C36D69B2EE11975B3295430A747F49C1AC525A86FC780985DB104D1282F7B24738ACE59CF921F2C46C7389750232020D09BE5BA6F1A9ED68550F65F3A7EA237AFBE9314144153F33D6AFFE938642EBA1E75E60F26F2E1BFFAAB5A6F12A37D4482679612123B95D1A2420F33D12F9B2D446FF54F35C5C5001F234BB93393EA1D7DD5270D0543CCCAC164B474B9F1D3A26C16FFD221524F1DBAAD8F4F81; token=eyJkYXRlIjoxNTQyMTYwMzMzNDc4LCJleHBpcmVUaW1lIjoiNzIwMDAiLCJtYWlsIjoid2VpLnpoYW9AY29ycC5uZXRlYXNlLmNvbSIsImVtcGxveWVlSWQiOiJINjI1NyIsImZ1bGxuYW1lIjoiJUU4JUI1JUI1JUU1JUE4JTgxIiwiRUhSIjoiRUhSX0xPR0lOIn0=; Hm_lpvt_d1f1df8cd06d5684d88473bd8cd05b16=1542165131')

# headers = {
#     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
# }


def get_post_comments():
    payload = {
        'onlyLandlord': 'false',
        'pageNo': 1,
        'pageSize': 5,
        'postId': 2839
    }
    r = requests.post(get_post_comments_url, cookies=cookies, data=payload)
    json_data = r.json()
    if json_data['code'] == 200:
        print(json_data['data']['count'])


def reply_post():
    payload = {
        'content': '<p>隐身</p>',
        'isAnonymous': 'false',
        'landlordVisible': 'false',
        'postId': 2839
    }
    r = requests.post(reply_post_url, cookies=cookies, data=payload)
    print(r.text)
    json_data = r.json()
    if json_data['code'] == 302:
        print('未登录')
    get_post_comments()



if __name__ == '__main__':
    reply_post()
