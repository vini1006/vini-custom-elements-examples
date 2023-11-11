import {makeDom, isClickedOutSide} from "/util/domHelper.js";

import style from './style.js';

/**
 * @typedef {{ key: string, text: string }} SelectOption
 */


class CustomSelect extends HTMLElement {
    isInit = false;
    _value;

    /**
     * @type {SelectOption[]}
     */
    options;

    selectBox;
    dropDownList;

    documentClickEvent;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    /**
     * @param {string} width
     * @param {SelectOption[]} options
     */
    render({ width }, options = []) {
        if (this.isInit) return;
        this.isInit = true;

        this.options = options;
        this.style.margin = '0.5rem';
        this.shadowRoot.innerHTML = `${style({ width })}`;
        this.shadowRoot.append(makeDom`
            ${this.getSelectBox('Korean')}
            ${this.getDropDownArea()}
        `);

        this.selectBox = this.shadowRoot.querySelector('.select-box');
        this.dropDownList = this.shadowRoot.querySelector('.drop-down-list');

        this.documentClickEvent = (e) => {
            if (!isClickedOutSide(e, this.selectBox)) {
                return;
            }

            if (isClickedOutSide(e, this.dropDownList)) {
                this.showHideDropDownArea(false);
            }
        };

        document.addEventListener('click', this.documentClickEvent);
    }

    get value () {
        return this._value;
    }

    set value (value) {
        this._value = value;
    }

    getSelectBox(selText) {
        const onclick = () => {
            this.toggleSelectArea()
        };

        return makeDom`
            <div d-onclick=${onclick} class="select-box">
               ${selText}
            </div>
        `;
    }

    getDropDownArea() {
        const area = makeDom`
            <div class="drop-down-area">
                <div class="drop-down-list" style="display:none;">
                </div>
            </div>
        `;

        this.drawDropDownList(area.querySelector('.drop-down-list'));
        return area;
    }

    /**
     * @param {SelectOption} option
     */
    addOption (option) {
        if (this.options.find(({key}) => key === option.key)) {
            return;
        }

        this.options.push(option);
        this.drawDropDownList(this.dropDownList);
    }

    removeOption (key) {
        this.options = this.options.filter(({key: k}) => k !== key);
        this.drawDropDownList(this.dropDownList);
        if (this._value === key) {
            this._value = this.options[0].key
            this.changeSelectBoxText(this.options[0].text);
            this.dispatchEvent(new Event('change'));
        }
    }

    drawDropDownList (dropDownList) {
        const optionClicked = (key, text) => () => {
            this._value = key;
            this.showHideDropDownArea(false);
            this.changeSelectBoxText(text);
            this.dispatchEvent(new Event('change'));
        }

        dropDownList.innerHTML = '';
        for (const opt of this.options) {
            dropDownList.append(makeDom`<span d-onclick=${optionClicked(opt.key, opt.text)} class="drop-down-item">${opt.text}</span>`)
        }
    }

    showHideDropDownArea (isShow = true) {
        this.dropDownList.style.display = isShow ? 'flex' : 'none';
        if (isShow) {
            this.selectBox.classList.add('clicked');
        } else {
            this.selectBox.classList.remove('clicked');
        }
    }

    toggleSelectArea () {
        this.showHideDropDownArea(this.dropDownList.style.display === 'none')
    }

    changeSelectBoxText (text) {
        this.selectBox.textContent = text;
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.documentClickEvent);
    }
}

customElements.define('custom-select', CustomSelect);

export const createCustomSelect = ({ width } = {}, options) => {
    const sel = document.createElement('custom-select');
    sel.render({ width }, options);
    return sel;
}