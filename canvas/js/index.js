let loader = new PxLoader();
let imgs = []

for(var i=1; i < 106; i++) {
    var pxImage = new PxLoaderImage(`http://alicdn.rteam.cn/181021Midea/images/qq6/${i}.jpg`); 
    pxImage.imageNumber = i; 
    loader.add(pxImage)
    imgs.push(pxImage.img)
} 
 
loader.addCompletionListener(function() { 
    console.log('over', imgs)
    let canvas = document.getElementById('canvas');
    let a = new spriteCanvas({fps: 10, loop: false, canvas, imgs, update: function(index) {
        // if(index === 10) {
        //     console.log('stop')
        //     this.stop()
        //     setTimeout(() => {
        //         this.start(index + 1)
        //     }, 2000);
        // }
    }})
    a.loopFromTo(0, 59)
}); 

loader.addProgressListener(function(e) {  
    console.log('Image ' + e.resource.imageNumber + ' Loaded\r' + e.completedCount + ' / ' + e.totalCount); 
}); 
 
loader.start(); 