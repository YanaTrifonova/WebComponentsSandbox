customElements.define(
  "tag-settings",
  class TagSettings extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: "open"});
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = `
      <style>
        .settings {
            width: 600px;
            margin-top: 100px;
            padding: 20px;
            border: 2px solid grey;
            margin: 20px auto;
        }
        
        .about-me {
            display: flex;
            justify-content: flex-end;
        }
        
        .settings__container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    
        .settings__group {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 20px;
            width: 250px;
        }
    
        .font-size__input {
            margin-left: 15px;
        }
    
        .font-size__label-small {
            font-size: 14px;
        }
    
        .font-size__label-default {
            font-size: 26px;
        }
    
        .font-size__label-big {
            font-size: 32px;
        }
        
        .brush {
            width: 10px;
            height: 10px;
            background-color: #000000;
            border-radius: 100px;
        }
    </style>
    
    <div class="settings">
        <a target="_blank" rel="noopener noreferrer" 
           href="https://www.linkedin.com/in/yana-trifonova/" class="about-me">about me</a>
        <h1>Settings</h1>
        
        <div class="settings__container">
            <div>
                <h2>General</h2>
                <div class="settings__group">
                    <label for="fontStyle">Font style</label>
                    <select id="fontStyle">
                        <option name="fontStyle" value="Arial">Arial</option>
                        <option name="fontStyle" value="Bodoni">Bodoni</option>
                        <option name="fontStyle" value="Futura">Futura</option>
                    </select>
                </div>
            
                <div id="fontSizeForm" class="settings__group">
                    <label for="fontSizeForm">Font size</label>
                    <div>
                        <input type="radio" value="small" name="fontSizeForm" class="font-size__input"><label for="small"
                                                                                                           class="font-size__label-small">A</label>
                        <input type="radio" value="default" name="fontSizeForm" class="font-size__input" checked><label for="default"
                                                                                                                     class="font-size__label-default">A</label>
                        <input type="radio" value="big" name="fontSizeForm" class="font-size__input"><label for="big"
                                                                                                         class="font-size__label-big">A</label>
                    </div>
                </div>
                
                <div class="settings__group">
                    <label for="backgroundColor">Background colour</label>
                    <input type="color" value="#ff0000" id="backgroundColor">
                </div>
                
                <div class="settings__group">
                    <label for="fontColor">Font colour</label>
                    <input type="color" value="#ffffff" id="fontColor">
                </div>
            </div>
            
            <div>
                <h2>Tag styling</h2>
                <div class="settings__group">
                    <label >Brush size</label>
                    <button id="decrease"> - 5 </button>
                    <span class="brush"></span>
                    <button id="increase"> + 5 </button>
                </div>
                
                <div class="settings__group">
                    <label for="canvasColor">Canvas colour</label>
                    <input type="color" value="#ffffff" id="canvasColor">
                </div>
                
                <div class="settings__group">
                    <label for="brushColor">Pen colour</label>
                    <input type="color" value="#000000" id="brushColor">
                </div>
            </div>
        </div>
    </div>
      `;

      this.shadowRoot.querySelectorAll('input[name="fontSizeForm"]').forEach((input) => {
        input.addEventListener('click', (event) => {
          dispatchEvent(
            new CustomEvent("font-size", {
              bubbles: true,
              composed: true,
              detail: event.target.value,
            })
          );
        })
      });

      this.shadowRoot.querySelector('select[id="fontStyle"]').addEventListener('change', (event) => {
        dispatchEvent(
          new CustomEvent("font-style", {
            bubbles: true,
            composed: true,
            detail: event.target.value,
          })
        )
      });

      this.shadowRoot.querySelector('input[id="backgroundColor"]').addEventListener('change', (event) => {
        dispatchEvent(
          new CustomEvent("background-color", {
            bubbles: true,
            composed: true,
            detail: event.target.value,
          })
        )
      });

      this.shadowRoot.querySelector('input[id="fontColor"]').addEventListener('change', (event) => {
        dispatchEvent(
          new CustomEvent("font-color", {
            bubbles: true,
            composed: true,
            detail: event.target.value,
          })
        )
      });

      this.shadowRoot.querySelector('button[id="decrease"]').addEventListener('click', (event) => {
        const decreaseButton = this.shadowRoot.querySelector('button[id="decrease"]');
        const increaseButton = this.shadowRoot.querySelector('button[id="increase"]');

        const brush = this.shadowRoot.querySelector('.brush');

        if (brush.offsetHeight === 10 && brush.offsetWidth === 10) {
          decreaseButton.setAttribute("disabled", true);
        } else {
          decreaseButton.removeAttribute("disabled");
          increaseButton.removeAttribute("disabled");
        }

        brush.style.width = brush.offsetWidth - 5 + "px";
        brush.style.height = brush.offsetHeight - 5 + "px";

        dispatchEvent(
          new CustomEvent("brush-decrease", {
            bubbles: true,
            composed: true,
            detail: brush.offsetWidth,
          })
        )
      });

      this.shadowRoot.querySelector('button[id="increase"]').addEventListener('click', (event) => {
        const increaseButton = this.shadowRoot.querySelector('button[id="increase"]');
        const decreaseButton = this.shadowRoot.querySelector('button[id="decrease"]');

        const brush = this.shadowRoot.querySelector('.brush');

        if (brush.offsetHeight === 15 && brush.offsetWidth === 15) {
          increaseButton.setAttribute("disabled", true);
        } else {
          increaseButton.removeAttribute("disabled");
          decreaseButton.removeAttribute("disabled");
        }

        brush.style.width = brush.offsetWidth + 5 + "px";
        brush.style.height = brush.offsetHeight + 5 + "px";

        dispatchEvent(
          new CustomEvent("brush-increase", {
            bubbles: true,
            composed: true,
            detail: brush.offsetWidth,
          })
        )
      });

      this.shadowRoot.querySelector('input[id="canvasColor"]').addEventListener('change', (event) => {
        dispatchEvent(
          new CustomEvent("canvas-color", {
            bubbles: true,
            composed: true,
            detail: event.target.value,
          })
        )
      });

      this.shadowRoot.querySelector('input[id="brushColor"]').addEventListener('change', (event) => {
        dispatchEvent(
          new CustomEvent("brush-color", {
            bubbles: true,
            composed: true,
            detail: event.target.value,
          })
        )
      });
    }
  }
)