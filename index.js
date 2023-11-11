import {createCustomSelect} from "./components/CustomSelect/CustomSelect.js";
const options = [
    { key: 'ko', text: 'Korean' },
    { key: 'en', text: 'English' },
    { key: 'zh', text: 'chinese' },
]

const sel1 = createCustomSelect({ width: '100px' }, options);
const sel2 = createCustomSelect({ width: '100px' }, options);
const sel3 = createCustomSelect({ width: '100px' }, options);

document.body.appendChild(sel1);
document.body.appendChild(sel2);
document.body.appendChild(sel3);

sel1.addEventListener('change', (e) => {
    console.log('se1 change: ', e.currentTarget.value);
});

window.__addOption = (option) => {
    sel1.addOption(option);
}

window.__removeOption = (key) => {
    sel1.removeOption(key);
}

