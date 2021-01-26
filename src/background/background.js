import getBrowser from '../helpers/getBrowser'

// const defaultSite = '.*?.decipherinc.com';
const browser = getBrowser();

// browser.runtime.onMessage.addListener((msg, sender, handler) => {
//
//     if ( msg.type === 'bookmarks' ){
//
//         browser.bookmarks.getTree((bookmarks_tree) => {
//             handler({ folders: bookmarks_tree });
//         });
//
//     } else if ( msg.type === 'sites' ){
//
//         browser.storage.sync.get({
//                 sites: [ defaultSite ],
//                 special: true,
//                 specialx2: true,
//                 showModal: false
//             },
//             ( items ) => {
//                 if ( items.sites.indexOf( defaultSite ) === -1 ){
//                     items.sites.push( defaultSite );
//                 }
//
//                 handler( { type: 'sites', payload: items } );
//             });
//     }
//     // Must return true for handler to be async
//     return true;
// });

browser.omnibox.onInputStarted.addListener(function(){
    browser.omnibox.setDefaultSuggestion({description:"FV Switch"});
})

browser.omnibox.setDefaultSuggestion({description:"FV Switch"});


browser.omnibox.onInputChanged.addListener((text, suggest) => {

    const suggestions = [
        {content: 'google.com', description: 'Google'},
        {content: 'focusvision.com', description: 'FV'},
        {content: 'tes.decipherinc.com', description: 'TES'},
        {content: 'selfserve.decipherinc.com', description: 'Selfserve'},
        {content: 'walmart.decipherinc.com', description: 'Walmart'},
        {content: 'esurveys.decipherinc.com', description: 'Esurveys'},
    ];
    browser.omnibox.setDefaultSuggestion({description: suggestions[0].description});

    suggest(suggestions);
})