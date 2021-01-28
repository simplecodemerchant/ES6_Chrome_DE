import $ from './jquery'

const getTime = () => {
    return (new Date()).getTime();
}

export function checkExistence(selector, max, cb){
    const el = $(selector);
    const start = getTime();


    let diff;
    const interval = setInterval(() => {
        diff = getTime() - start;

        if ( el.length ){
            cb();
            clearInterval(interval);
        }

        if ( diff > (max * 1000) ){
            clearInterval(interval);
        }

    }, 100)

}