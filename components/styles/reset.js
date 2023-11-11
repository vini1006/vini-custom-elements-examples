export const getStyleWithReset = (styles) => `
<style>
    input,
    select,
    textarea,
    button {
        vertical-align: middle;
        box-sizing: border-box;
        border-style: none;
        -webkit-appearance: none;
        -webkit-border-radius: 0;
    }
    
    button {
    border: 0 none;
    background-color: transparent;
    cursor: pointer;
    }
    
    button:disabled {
        cursor: default;
    }
    
    th,
    td,
    input,
    select,
    textarea,
    button,
    pre {
        color: #161931;
        font-weight: 400;
        font-size: 14px;
    }
    
    a:focus,
    button:focus,
    input:focus,
    textarea:focus,
    *:focus {
        outline: none !important;
    }
    
    a {
        color: #222;
        text-decoration: none;
    }
    
    a:hover {
        text-decoration: none;
    }
    
    img,
    video {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
    }
    
    /*img, a*/
    a,
    img,
    svg {
        display: inline-block;
        vertical-align: middle;
    }
    
    img,
    button,
    a {
        -khtml-user-select: none;
        -o-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
    
    div,
    span,
    em,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong,
    p,
    a,
    button,
    img,
    ul,
    li,
    ol,
    label {
        box-sizing: border-box;
    }
</style>
${styles}
`;