export const qsa = (query) => {
    return document.querySelectorAll(query);
};
export const qs = (query) => {
    return document.querySelector(query);
};

export const tqsa = (query) => {
    return this.querySelectorAll(query);
};
export const tqs = (query) => {
    return this.querySelector(query);
};

export const gid = (id) => {
    return document.getElementById(id);
};