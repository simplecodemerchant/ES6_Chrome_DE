import { getBrowser } from '../helpers'
const defaultSite = '.*?.decipherinc.com';

const browser = getBrowser();

browser.runtime.onMessage.addListener((msg, sender, handler) => {
    console.log(msg);
    if (msg.type === 'bookmarks'){

        const getTree = browser.bookmarks.getTree((bookmarks_tree) => {
            handler({ folders: bookmarks_tree });
        });

    } else if ( msg.type === 'sites' ){

        browser.storage.sync.get({
                sites: [ defaultSite ],
                special: true,
                showModal: false
            },
            ( items ) => {
                if ( items.sites.indexOf( defaultSite ) === -1 ){
                    items.sites.push( defaultSite );
                }

                handler( { type: 'sites', payload: items } );
            });

    }
    return true;
});
