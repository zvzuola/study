#! /bin/bash
name='weishao'
echo $name
# 字符串长度
echo "name的长度：${#name}"
# 字符串截取
echo "name截取字符(0-3)：${name:0:3}"
# 输出第一个参数
echo "第一个参数：$1"
# 输出所有参数
echo "所有参数：$*"
# 循环输出参数
for i in $*; do
    echo $i
done
# 获取命令返回值
current_branch=`git rev-parse --abbrev-ref HEAD`
echo "当前分支：$current_branch"
pwd=`pwd`
echo "当前目录: $pwd"
echo "当前uid: $UID"