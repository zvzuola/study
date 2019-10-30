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


# dt=$(date '+%Y-%m-%d-%H-%M-%S')
# tmpdir="tmpdir"
# project="xczaxq"
# backup_dir="/cygdrive/d/webapp_backup/$dt"
# project_dir="/cygdrive/d/webserver/apache-tomcat-8.5.33-windows-x64/apache-tomcat-8.5.33/webapps/$project"
# yarn
# yarn build
# cd dist&&tar -zcvf dist.tar.gz *
# mv dist.tar.gz /home/build/$project
# cd /home/build/$project
# git add .
# git commit -m "feat: update $dt"
# git push -u origin master
# mkdir -p $tmpdir
# tar -zxf dist.tar.gz -C ./$tmpdir
# ssh administrator@10.5.1.23 "mkdir -p $backup_dir && mv $project_dir $backup_dir"
# scp -r ./$tmpdir administrator@10.5.1.23:$project_dir
# rm -rf $tmpdir