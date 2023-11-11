import { getStyleWithReset } from '../styles/reset.js';

export default ({ width }) => getStyleWithReset(`
    <style>
        * {
            -webkit-user-select: none;
            user-select: none; 
        }
        
        .select-box {
            width: ${width};
            border: 1px solid #CCCCCC;
            padding: 0.3rem 0.5rem;
            position: relative;
            border-radius: 0.3rem;
        }
        
        .select-box.clicked::after {
            transform: rotate(180deg);
        }
        
        .select-box::after {
            position: absolute;
            content: "";
            background-image: url("/assets/image/down-arrow.svg");
            background-repeat: no-repeat;
            background-size: contain;
            right: 0.5rem;
            width: 1rem;
            height: 1rem;
            transition: transform 0.1s ease-in-out;
        }
        
        .drop-down-area {
            position: relative;
        }
        
        .drop-down-list {
            z-index: 1;
            min-width: calc(${width} + 1rem);
            width: fit-content;
            background-color: ghostwhite;
            position: absolute;
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
            top: 0.5rem;
            border-radius: 0.3rem;
        }
        
        .drop-down-item {
            padding: 0.5rem 0.5rem;
        }
        
        /*.drop-down-item:not(:last-child) {*/
        /*    border-bottom: 1px solid #CCCCCC;*/
        /*}*/
        
        .drop-down-item:hover {
            background-color: #3068ef;
            color: white;
        }
    </style>
`);