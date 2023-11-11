const EVENT_ATTRIBUTES = [
    ['d-onclick', 'onclick'],
    ['d-onchange', 'onchange'],
];

const CHILDREN_ATTRIBUTE = 'd-children';

export const isClickedOutSide = (clickEvent, element) => {
    const elDimensions = element.getBoundingClientRect()
    return (
        clickEvent.clientX < elDimensions.left ||
        clickEvent.clientX > elDimensions.right ||
        clickEvent.clientY < elDimensions.top ||
        clickEvent.clientY > elDimensions.bottom
    )
}


export const makeDom = (strings, ...args) => {
    const template = document.createElement('template');
    template.innerHTML = strings.reduce((html, str, i) => {
        if (i === strings.length - 1) {
            return html + str;
        }

        if (args[i] instanceof DocumentFragment || args[i] instanceof HTMLElement) {
            return html + str + `<slot ${CHILDREN_ATTRIBUTE}="${i}"></slot>`;
        }

        if (typeof args[i] === 'string' || typeof args[i] === 'number' || typeof args[i] === 'boolean') {
            return html + str + args[i];
        }

        return html + str + `"${i}"`;
    }, '');

    return fixChild(fixAttributes(template.content.cloneNode(true), args), args);
}


function fixAttributes(domTree, argArr) {
    EVENT_ATTRIBUTES.forEach((attr) => {
        const elList = domTree.querySelectorAll(`[${attr[0]}]`);
        elList.forEach((el) => {
            const i = el.getAttribute(attr[0]);
            el.removeAttribute(attr[0]);
            el[attr[1]] = argArr[i];
        });
    });

    return domTree;
}

function fixChild(domTree, argArr) {
    domTree.querySelectorAll(`slot[${CHILDREN_ATTRIBUTE}]`).forEach((slot) => {
        const i = slot.getAttribute(CHILDREN_ATTRIBUTE);
        slot.replaceWith(argArr[i]);
    });

    return domTree;
}
