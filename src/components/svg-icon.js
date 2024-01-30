import { css, html, LitElement } from 'lit';
import DOMPurify from 'dompurify';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

class SvgIcon extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    svg {
      display: block;
      width: 24px;
      height: 24px;
      margin: 0;
      padding: 0;
    }
  `;

  static properties = {
    svgUrl: { type: String },
  };

  constructor() {
    super();
    this.svgContent = '';
  }

  async firstUpdated() {
    if (this.svgUrl) {
      this.svgContent = await this.fetchSvg(this.svgUrl);
      this.requestUpdate();
    }
  }

  async fetchSvg(url) {
    const response = await fetch(url);
    let svgContent = await response.text();
    svgContent = DOMPurify.sanitize(svgContent);
    return svgContent;
  }

  render() {
    return html`${unsafeHTML(this.svgContent)}`;
  }
}

customElements.define('svg-icon', SvgIcon);