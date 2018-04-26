const defaultSite = '.*?.decipherinc.com';

function getBrowser(){
    if ( typeof( browser ) !== 'undefined' ) return browser;
    if ( typeof( chrome ) !== 'undefined' ) return chrome;
    return {};

}

const browser = getBrowser();

browser.runtime.onMessage.addListener((msg, sender, handler) => {
    console.log('background');

    if ( msg.type === 'bookmarks' ){

        browser.bookmarks.getTree((bookmarks_tree) => {
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
