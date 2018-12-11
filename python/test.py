# height = input('height: ')
# weight = input('weight: ')
# bmi = float(weight)/(float(height)**2)
# if bmi < 18.5:
#     print('过轻')
# elif bmi < 25:
#     print('正常')
# elif bmi < 28:
#     print('过重')
# elif bmi < 32:
#     print('肥胖')
# else:
#     print('严重肥胖')

# 求解
# import math
# def q(a, b, c):
#     d = b**2 - 4*a*c
#     if d > 0:
#         x1 = (-b + math.sqrt(d))/2*a
#         x2 = (-b - math.sqrt(d))/2*a
#         print(x1, x2)
#     elif d == 0:
#         x = -b / 2*a
#         print(x)
#     else:
#         print('无解')
# q(1, 2, 1)

# 爬虫
# from urllib import request
# from bs4 import BeautifulSoup
# response = request.urlopen("http://www.baidu.com")
# html = response.read()
# bf = BeautifulSoup(html, "html.parser")
# print(bf.find(id='su'))

# 验证码识别
# import pytesseract
# from PIL import Image
# # imgpath = '7039.jpg'
# imgpath = '1.jpeg'
# image = Image.open(imgpath)
# print(pytesseract.image_to_string(image))

# import re
# res = re.search('<a>(.*)</a>', '213<a>123</a>').group(1)
# print(res)

# 成员关系操作符(in、not in): 对象 [not] in 序列
# 重复操作符 * : 序列 * 整数
# 元组和列表的区别: 元组是不可变的，列表是可变的
# zodiac = '猴鸡狗猪鼠牛虎兔龙蛇马羊'
# year = 2018
# zodiac_name = ('摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座',
#                '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座')
# zodiac_days = ((1, 20), (2, 19), (3, 21), (4, 21), (5, 21), (6, 22),
#                (7, 23), (8, 23), (9, 23), (10, 23), (11, 23), (12, 23))
# (month, day) = (2, 15)
# zodiac_day = len(list(filter(lambda x: x < (month, day), zodiac_days)))
# print(zodiac[year % 12])
# print(zodiac_name[zodiac_day % 12])

# a_list = ['x', 'x']
# a_list.remove('x')
# print(a_list)

from PIL import Image
from io import BytesIO
import requests
import json
def mini_post():
    payload = json.dumps({
        'scene': 'a=1'
    })
    r = requests.post('https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=16_7hjX1zlFHnhY3Xd4imZLRRuzqrXh-Gqlq_bMPZzJQUNGpERs3bRSBxOK1pF5fzrQPcCV3ayphpHYw3uAv9ZMtw23JvJt7alQ7BgAw_QxsDtQ_fok6XB9vrumJ4vWhZ80-emDivdvDt5G9KfeEKEeAAAQWQ', data=payload)
    print(r.headers["content-type"])
    image = Image.open(BytesIO(r.content))
    image.save("miniprogram.jpg", "JPEG", quality=80, optimize=True, progressive=True)
mini_post()
