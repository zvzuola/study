let request = require('request')
let fs = require('fs')

let downloadPic = function(src, dest){
    request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
        console.log('pic saved!')
    })
}
for(let i = 1; i<106; i++) {
    downloadPic(`http://alicdn.rteam.cn/181021Midea/images/qq6/${i}.jpg`, `img/${i}.jpg`)
}