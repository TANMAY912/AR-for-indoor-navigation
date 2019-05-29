var app=new Vue({
  el:"#app",
  data:{
    scanner:null,
    activeCameraId:null,
    cameras:[],
    scans:[]
  },
  mounted:function(){
    var self=this;
    var isMobile={
      Android: function(){
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function(){
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function(){
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function(){
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };
    var qrcontent="q";
    var x=123;
    var count=0;
    self.scanner=new Instascan.Scanner({video:document.getElementById("pre"),scanPeriod:1});
    self.scanner.addListener('scan',function(content,image){
      self.scans.unshift({date:+(Date.now()), content:content});
      qrcontent=content;
      if(!isNaN(qrcontent)){
        x=parseInt(qrcontent);
      }
      else{
        x=60606060;
      }
      if(isNaN(x)){
        alert("Invalid Data! Scan another qr code");
      }
      else{
        x1=x%100;
        y=Math.floor(x/100);
        x2=y%100;
        y=Math.floor(y/100);
        x3=y%100;
        y=Math.floor(y/100);
        x4=y%100;
        y=Math.floor(y/100);
        if((x1>=0&&x1<=59)&&(x2>=0&&x2<=59)&&(x3>=0&&x3<=59)&&(x4>=0&&x4<=59)&&(y==0)){
          alert(x1);
          alert(x2);
          alert(x3);
          alert(x4);
          alert("Valid Data");
          self.scanner.stop();
          location.href="https://www.google.com";
        }
        else{
          alert("Invalid Data! Scan another qr code");
        }
      }
    });
    Instascan.Camera.getCameras().then(function(cameras){
      self.cameras=cameras;
      if(cameras.length>0){
        var i=0;
        if(isMobile.Android() || isMobile.iOS()){
          i=1;
          self.scanner.mirror=false;
        }
        self.activeCameraId=cameras[i].id;
        self.scanner.start(cameras[i]);
      }
      else{
        console.error('No cameras');
      }
    }).catch(function(e){
      console.error(e);
    });
  },
  methods:{
    formatName:function(name){
      return name || 'unknown';
    },
    selectCamera:function(camera){
      this.activeCameraId=camera.id;
      this.scanner.start(camera);
    }
  }
});
