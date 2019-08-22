import KeyBinds from "../helpers/keybinds";


export default function Clips(){
    const kb = new KeyBinds([

        { t: 'ctrl+r', f: WOW },
    ]);
    const testKeys = kb.testKeys.bind(kb);

    document.addEventListener('keydown', e => testKeys(e) );
    document.addEventListener('keyup', e => testKeys(e) );

}



function WOW(){
    alert(window.getSelection());
}