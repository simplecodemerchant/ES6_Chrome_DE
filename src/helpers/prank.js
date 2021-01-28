
export const RightDate = () => {
    const today = new Date();
    return (today.getMonth() === 3 && today.getDate() === 1);
};



const addNewStyle = (newStyle) => {
    let styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
};



const Prank = () => {
    addNewStyle('body,*{font-family: \'Charmonman\', cursive !important;}');
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Charmonman');
    document.head.appendChild(link);

};
export default Prank;

