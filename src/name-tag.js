customElements.define(
  "name-tag",
  class NameTag extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: "open"});
    }

    connectedCallback() {
      this.shadowRoot.innerHTML =
        `
        <style>
         .tag {
             border: 1px solid rgba(0, 0, 0, 0.7);
             margin: 0 auto;
             width: 500px;
             height: 355px;
             background-color: red;
             border-radius: 20px;  
         }
         .tag-header {
              padding: 10px 0;
         }
         .tag-title {
              color: white;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 32px;
              letter-spacing: 0.1em;
              text-align: center;
              padding: 0 0 10px;
              margin: 0;
          }
         .tag-copy {
              color: white;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 18px;
              letter-spacing: 0.1em;
              text-align: center;
              margin: 0;
          }
         .tag-canvas {
              width: 100%;
              height: 65%;
              cursor: default;
              background-color: white;
          }
         </style>
         
         <section class="tag" id="outer">
           <div class="tag-header"> 
             <h1 class="tag-title">Hello</h1>
             <p class="tag-copy">My Name Is</p>
           </div>
           <canvas class="tag-canvas" id="canvas"></canvas>
         </section>
      `
      const canvas = this.shadowRoot.querySelector('#canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      const position = {
        x: 0,
        y: 0
      };

      function setPosition(event) {
        position.x = event.pageX - canvas.offsetLeft;
        position.y = event.pageY - canvas.offsetTop;
      }

      canvas.addEventListener('mousemove', setPosition);

      ctx.lineWidth = 5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'black';

      canvas.addEventListener('mousedown', function (e) {
        canvas.addEventListener('mousemove', onPaint, false);
      }, false);

      canvas.addEventListener('mouseup', function () {
        canvas.removeEventListener('mousemove', onPaint, false);
      }, false);

      const onPaint = function (event) {
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
        setPosition(event);
        ctx.lineTo(position.x, position.y);
        ctx.closePath();
        ctx.stroke();
      };

      window.addEventListener("font-size", (e) => {
        let tagTitle = this.shadowRoot.querySelector(".tag-title");
        let tagCopy = this.shadowRoot.querySelector(".tag-copy");

        if (e.detail === "default") {
          tagTitle.style.fontSize = 32 + "px";
          tagCopy.style.fontSize = 18 + "px";
        }
        if (e.detail === "small") {
          tagTitle.style.fontSize = 32 / 1.2 + "px";
          tagCopy.style.fontSize = 18 / 1.2 + "px";
        }
        if (e.detail === "big") {
          tagTitle.style.fontSize = 32 * 1.2 + "px";
          tagCopy.style.fontSize = 18 * 1.2 + "px";
        }
      });

      window.addEventListener("font-style", (e) => {
        this.shadowRoot.querySelector(".tag-title").style.fontFamily = e.detail;
        this.shadowRoot.querySelector(".tag-copy").style.fontFamily = e.detail;
      })
    }
  }
)
