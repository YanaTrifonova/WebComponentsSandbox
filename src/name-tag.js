class NameTag extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    this.shadowRoot.innerHTML =
      `
        <h1>Hello</h1>
      `
  }
}

customElements.define("name-tag", NameTag);