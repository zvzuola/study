const nodemailer = require("nodemailer");
const path = require('path');
const axios = require('axios');
const fs = require('fs');

const comments = [];
const hasSend = ["565212118@qq.com", "416038227@qq.com", "861964257@qq.com", "1447635036@qq.com", "2105@163.com", "3330502245@qq.com", "1085804104@qq.com", "3063940354@qq.com", "2553402303@qq.com", "2904469392@qq.com", "1003120253@qq.com", "1457571317@qq.com", "1823436048@qq.com", "61829461@qq.com", "1804510354@qq.com", "2846357704@qq.com", "1976601402@qq.com", "983669264@qq.com", "2281984931@qq.com", "187348294@qq.com", "409189595@qq.com", "100@163.com", "791397979@qq.com", "592559040@qq.com", "1780036811@qq.com", "2196307374@qq.com", "2621660583@qq.com", "915311187@qq.com", "460571227@qq.com", "750509701@qq.com", "1193012552@qq.com", "1416653773@qq.com", "498939042@qq.com", "949758119@qq.com", "893110901@qq.com", "709551417@qq.com", "2167483079@qq.com", "1353890489@qq.com", "1530993865@qq.com", "397344958@qq.com", "2591230001@qq.com", "649413413@qq.com", "451360983@qq.com", "2534522456@qq.com", "1943341816@qq.com", "2764096434@qq.com", "534272600@qq.com", "371812961@qq.com", "1239108241@qq.com", "871808619@qq.com", "765536464@qq.com", "1048411820@qq.com", "87800458@qq.com", "3588389102@qq.com", "284118275@qq.com", "1732869171@qq.com", "1551524556@qq.com", "2636650608@qq.com", "191414447@qq.com", "1240645887@qq.com", "862074110@qq.com", "3108372904@qq.com", "755398984@qq.com", "871720217@qq.com", "984052012@qq.com", "929277@163.com", "2533842008@qq.com", "379655722@qq.com", "2605515960@qq.com", "1160533242@qq.com", "1587497375@qq.com", "3468734015@qq.com", "1614172334@qq.com", "875065591@qq.com", "619223143@qq.com", "38704088@qq.com", "2315783969@qq.com", "694322220@qq.com", "1442994563@qq.com", "1637039718@qq.com", "1755158540@qq.com", "2372053685@qq.com", "1449649299@qq.com", "1538473466@qq.com", "248935591@qq.com", "1025207728@qq.com", "958006265@qq.com", "1737123167@qq.com", "867466011@qq.com", "951963242@qq.com", "459337356@qq.com", "370436866@qq.com", "2239212316@qq.com", "2556336358@qq.com", "2675676544@qq.com", "1361214926@qq.com", "1024867128@qq.com", "1774869052@qq.com", "2625261789@qq.com"]

function getCom(offset) {
  return axios.default.get(`https://www.zhihu.com/api/v4/answers/736085394/root_comments?limit=20&offset=${offset}&order=normal&status=open`, {
    headers: {
      cookie: '_zap=c13ddde3-9333-4a64-ba0c-10ed4b502a7c; d_c0="AMBjK3Gt0g6PTnveorcHeCC2KnYYNrDCiok=|1547436496"; q_c1=d231f23a431d4a53a30a3d64dfc39543|1547436497000|1547436497000; __gads=ID=103a67cfcab1c2ec:T=1547459059:S=ALNI_MZPv-4z9U8bbLn87xPvnCAc9w9BTw; __utma=51854390.1828422272.1548926976.1548926976.1548926976.1; __utmz=51854390.1548926976.1.1.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/question/301253397/answer/548334082; __utmv=51854390.100--|2=registration_date=20150617=1^3=entry_date=20150617=1; _xsrf=a75a1763-27a6-4147-9b91-012aca9a20ff; tgw_l7_route=a37704a413efa26cf3f23813004f1a3b'
    }
  }).then(res => {
    res.data.data.forEach(v => {
      const matchRes = v.content.match(/\d+@(qq|163)\.com/)
      if (matchRes && hasSend.indexOf(matchRes[0]) === -1) {
        comments.push(matchRes[0])
      }
    })
    if (!res.data.paging.is_end) {
      return getCom(offset + 20)
    }
  })
}

// async..await is not allowed in global scope, must use a wrapper
async function main(to) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    // service: 'qq',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '1240061849@qq.com', // generated ethereal user
      pass: '' // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"试玩" <1240061849@qq.com>', // sender address
    to, // list of receivers
    subject: "试玩平台", // Subject line
    html: '<div>您好，在知乎上看到您关于《有哪些真正的冷门且暴利的行业？》回答下的留言，现在为您推荐一个app试玩平台。<br /><br />请记住平台绝对免费且不收任何费用。只需根据提示下载app试玩3分钟即可获取奖励。<br /><br />平台下载请微信扫描下图二维码或点击下方链接下载<br /><br /><a href="https://www.eimoney.com/landing/share.html?promote=11694917">https://www.eimoney.com/landing/share.html?promote=11694917</a>。</div><br /><br /><img src="cid:unique@nodemailer.com"/>',
    attachments: [
      {
        filename: 'shiwan.jpeg',
        path: path.resolve(__dirname, 'shiwan.jpeg'),
        cid: 'unique@nodemailer.com'
      }
    ]
  });

  console.log("Message sent: %s", to);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}


getCom(0).then(() => {
  console.log(comments)
  fs.writeFile('to.txt', comments, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
  // const tasks = comments.map(v => main(v))
  // Promise.all(tasks).then(() => {console.log('发送完成')}).catch(console.error);
})
