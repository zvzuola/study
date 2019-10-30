# !/usr/bin/env python
# -*- coding: UTF-8 -*-
from selenium import webdriver
import datetime
import time

def login():
    browser.get("https://www.taobao.com")
    # time.sleep(3)
    # if browser.find_element_by_link_text("亲，请登录"):
    #     browser.find_element_by_link_text("亲，请登录").click()
    #     print("请在15秒内完成扫码")
    #     time.sleep(60)
    #     browser.get("https://cart.taobao.com/cart.htm")
    # time.sleep(3)

    # now = datetime.datetime.now()
    # print('login success:', now.strftime('%Y-%m-%d %H:%M:%S'))
 
 
def buy(times):
    while True:
        now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
        print(now)

        # 对比时间，时间到的话就点击结算
        if now > times:
            while True:
                try:
                    if browser.find_element_by_id("J_SelectAll2"):
                        browser.find_element_by_id("J_SelectAll2").click()
                        break
                except:
                    print("找不到全选按钮")
            # 点击结算按钮
            while True:
                try:
                    if browser.find_element_by_id("J_Go"):
                        browser.find_element_by_id("J_Go").click()
                        print("结算成功")
                        break
                except Exception as e:
                    print(e)
                    if browser.find_element_by_id("J_SelectAll2"):
                        print("点击全选按钮")
                        browser.find_element_by_id("J_SelectAll2").click()
            while True:
                try:
                    if browser.find_element_by_class_name('go-btn'):
                        browser.find_element_by_class_name('go-btn').click()
                        now1 = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
                        print("抢购成功时间：%s" % now1)
                        break
                except Exception as e:
                    print(e)
                    print("再次尝试提交订单")
                    if browser.find_element_by_id("J_Go"):
                        print("点击结算")                        
                        browser.find_element_by_id("J_Go").click()
            time.sleep(0.01)
            break
 
 
if __name__ == "__main__":
    # times = input("请输入抢购时间，格式如(2019-06-15 22:00:00.000000):")
    # 时间格式："2019-06-15 22:00:00.000000"
    times = "2019-06-16 22:00:00.000000"
    browser = webdriver.Chrome('/Users/zw/Downloads/chromedriver')
    browser.get("https://www.taobao.com")
    time.sleep(60)
    print('start')
    browser.get("https://cart.taobao.com/cart.htm")
    buy(times)
