import itchat
import re
from itchat.content import TEXT, NOTE
rec_msg_dict = {}


@itchat.msg_register(TEXT, isFriendChat=True)
def handle_friend_msg(msg):
    print(msg)
    msg_id = msg['MsgId']
    msg_from_user = msg['User'].get('NickName') or msg['User'].get('UserName')
    msg_content = msg['Content']
    msg_create_time = msg['CreateTime']
    msg_type = msg['Type']
    rec_msg_dict.update({
        msg_id: {
            'msg_from_user': msg_from_user,
            'msg_create_time': msg_create_time,
            'msg_type': msg_type,
            'msg_content': msg_content
        }
    })
    print("收到信息: ", msg_id, msg_from_user,
          msg_content, msg_create_time, msg_type)


@itchat.msg_register([NOTE], isFriendChat=True, isGroupChat=False)
def revoke_msg(msg):
    old_msg_id = re.search('<msgid>(.*)</msgid>', msg['Content']).group(1)
    old_msg = rec_msg_dict.get(old_msg_id, {})
    print('撤回：', msg)
    itchat.send_msg(str(old_msg.get('msg_from_user') + "撤回了一条信息：" +
                        old_msg.get('msg_content')), toUserName=old_msg.get('msg_from_user'))


if __name__ == '__main__':
    itchat.auto_login()
    itchat.run()
