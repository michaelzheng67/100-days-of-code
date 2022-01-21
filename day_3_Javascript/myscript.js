// Pixelated letters in canvas

var particleAlphabet = {
    Particle: function(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 3.5;
      this.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.radius, this.radius);
        ctx.restore();
      };
    },
    init: function() {
      particleAlphabet.canvas = document.querySelector('canvas');
      particleAlphabet.ctx = particleAlphabet.canvas.getContext('2d');
      particleAlphabet.W = window.innerWidth;
      particleAlphabet.H = window.innerHeight;
      particleAlphabet.particlePositions = [];
      particleAlphabet.particles = [];
      particleAlphabet.tmpCanvas = document.createElement('canvas');
      particleAlphabet.tmpCtx = particleAlphabet.tmpCanvas.getContext('2d');
  
      particleAlphabet.canvas.width = particleAlphabet.W;
      particleAlphabet.canvas.height = particleAlphabet.H;
  
      setInterval(function(){
        particleAlphabet.changeLetter();
        particleAlphabet.getPixels(particleAlphabet.tmpCanvas, particleAlphabet.tmpCtx);
      }, 1200);
  
      particleAlphabet.makeParticles(1000);
      particleAlphabet.animate();
    }, 
    currentPos: 0,
    changeLetter: function() {
      var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ',
        letters = letters.split('');
      particleAlphabet.time = letters[particleAlphabet.currentPos];
      particleAlphabet.currentPos++;
      if (particleAlphabet.currentPos >= letters.length) {
        particleAlphabet.currentPos = 0;
      }
    },
    makeParticles: function(num) {
      for (var i = 0; i <= num; i++) {
        particleAlphabet.particles.push(new particleAlphabet.Particle(particleAlphabet.W / 2 + Math.random() * 400 - 200, particleAlphabet.H / 2 + Math.random() * 400 -200));
      }
    },
    getPixels: function(canvas, ctx) {
      var keyword = particleAlphabet.time,
        gridX = 6,
        gridY = 6;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = 'red';
      ctx.font = 'italic bold 330px Noto Serif';
      ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height / 2 + 100);
      var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var buffer32 = new Uint32Array(idata.data.buffer);
      if (particleAlphabet.particlePositions.length > 0) particleAlphabet.particlePositions = [];
      for (var y = 0; y < canvas.height; y += gridY) {
        for (var x = 0; x < canvas.width; x += gridX) {
          if (buffer32[y * canvas.width + x]) {
            particleAlphabet.particlePositions.push({x: x, y: y});
          }
        }
      }
    },
    animateParticles: function() {
      var p, pPos;
      for (var i = 0, num = particleAlphabet.particles.length; i < num; i++) {
        p = particleAlphabet.particles[i];
        pPos = particleAlphabet.particlePositions[i];
        if (particleAlphabet.particles.indexOf(p) === particleAlphabet.particlePositions.indexOf(pPos)) {
        p.x += (pPos.x - p.x) * .3;
        p.y += (pPos.y - p.y) * .3;
        p.draw(particleAlphabet.ctx);
      }
      }
    },
    animate: function() {
      requestAnimationFrame(particleAlphabet.animate);
      particleAlphabet.ctx.fillStyle = 'rgba(23, 41, 58, .8)';
      particleAlphabet.ctx.fillRect(0, 0, particleAlphabet.W, particleAlphabet.H);
      particleAlphabet.animateParticles();
    }
  };
  
  window.onload = particleAlphabet.init;




  // Animated Clock

  function clock() {
    var now = new Date();
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, 150, 150);
    ctx.translate(75, 75);
    ctx.scale(0.4, 0.4);
    ctx.rotate(-Math.PI / 2);
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
  
    // Hour marks
    ctx.save();
    for (var i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.rotate(Math.PI / 6);
      ctx.moveTo(100, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.restore();
  
    // Minute marks
    ctx.save();
    ctx.lineWidth = 5;
    for (i = 0; i < 60; i++) {
      if (i % 5!= 0) {
        ctx.beginPath();
        ctx.moveTo(117, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
      }
      ctx.rotate(Math.PI / 30);
    }
    ctx.restore();
  
    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr  = now.getHours();
    hr = hr >= 12 ? hr - 12 : hr;
  
    ctx.fillStyle = 'black';
  
    // write Hours
    ctx.save();
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) *sec);
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();
  
    // write Minutes
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();
  
    // Write seconds
    ctx.save();
    ctx.rotate(sec * Math.PI / 30);
    ctx.strokeStyle = '#D40000';
    ctx.fillStyle = '#D40000';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(83, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
  
    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#325FA2';
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();
  
    ctx.restore();
  
    window.requestAnimationFrame(clock);
  }
  
  window.requestAnimationFrame(clock);


  // animating progress bar
elem.onclick = function() {
    animate({
      duration: 1000,
      timing: function(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        elem.style.width = progress * 100 + '%';
      }
    });
  };



function animate({duration, draw, timing}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      let progress = timing(timeFraction)
  
      draw(progress);
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
  }



  // change colour of text to black 
  function differentcolour() {
      document.getElementById("header").style.color = "black";
  }


  
  // replace current text with new one
  function replacetext() {
      document.getElementById("demo").innerHTML = "You just discovered a hidden secret. cool."
  }


  // make text disappear
  function begone(id) {
      document.getElementById(id).style.display= "none";
  }

