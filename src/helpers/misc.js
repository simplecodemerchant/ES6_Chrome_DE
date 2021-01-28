

export const url = () => window.location.href;

export const url_host = () => window.location.host;

export const url_origin = () => window.location.origin;

export const createEl = (str) => {
    const div = document.createElement('div');
    div.innerHTML = str;
    return div;
};

export const appendTo = (el, str) => {
    const div = createEl(str);

    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
};

export const prependTo = (el, str) => {
    const div = createEl(str);

    el.insertBefore(div.firstChild, el.firstChild);
};

export const addRow = (table, rowtext, c) => {
    const newRow = table.insertRow(table.rows.length);
    if (c) newRow.classList.add(c);
    newRow.innerHTML = rowtext;
};