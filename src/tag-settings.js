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
            width: 300px;
            margin-top: 100px;
            padding: 20px;
            border: 2px solid grey;
        }
    
        .settings__group {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 20px;
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
    </style>
    <div class="settings">
        <h1>Settings</h1>
        <h2>General</h2>
    
        <div class="settings__group">
            <label for="fontStyle">Font style:</label>
            <select name="fontStyle" id="fontStyle">
                <option value="Helvetica">Helvetica</option>
                <option value="Bodoni">Bodoni</option>
                <option value="Futura">Futura</option>
            </select>
        </div>
    
        <div id="fontSizeForm" class="settings__group">
            <label for="fontSizeForm">Font size:</label>
            <div>
                <input type="radio" id="small" name="fontSizeForm" class="font-size__input"><label for="small"
                                                                                                   class="font-size__label-small">A</label>
                <input type="radio" id="default" name="fontSizeForm" class="font-size__input" checked><label for="default"
                                                                                                             class="font-size__label-default">A</label>
                <input type="radio" id="big" name="fontSizeForm" class="font-size__input"><label for="big"
                                                                                                 class="font-size__label-big">A</label>
            </div>
        </div>
    </div>
      `;
    }
  }
)