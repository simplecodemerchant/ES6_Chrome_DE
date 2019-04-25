import '../styles/options.scss'
const defaultSite = '.*?.decipherinc.com';

const browser = browser || chrome;

function save_options() {
    console.log('save');
    const sites = document.getElementById('sites').value.split(/\s+|\n+|[,]+/);
    const special = document.getElementById('special').checked;
    const specialx2 = document.getElementById('specialx2').checked;
    const showModal = document.getElementById('showmodal').checked;

    if ( sites.indexOf( defaultSite ) === -1 ){
        sites.push( defaultSite );
    }

    browser.storage.sync.set({
            sites: sites,
            special: special,
            specialx2: specialx2,
            showModal: showModal,
        },
        function() {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';

            setTimeout(function() {
                status.textContent = '';
            }, 750);

        });

}


function restore_options(){

    browser.storage.sync.get({
            sites: [ defaultSite ],
            special: true,
            specialx2: true,
            showModal: false
        },
        function(items) {

            if ( items.sites.indexOf( defaultSite ) === -1 ){
                items.sites.push( defaultSite );
            }

            document.getElementById('sites').value = items.sites.join('\n');
            document.getElementById('special').checked = items.special;
            document.getElementById('specialx2').checked = items.specialx2;
            document.getElementById('showmodal').checked = items.showModal;
        });
}



document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);