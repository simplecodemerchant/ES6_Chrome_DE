import { prependTo } from "../helpers/misc"
import { gid, qs, qsa, misc, getClosest } from '../helpers'
import $ from '../helpers/jquery'
import App from '../app';

class QuotaBuddy {

    toggleQB(){
        qs('#quotaBuddy').classList.toggle('qbhide');
    }

    hideShowAll(type) {
        for ( let ct of qsa( '.quota-sheet .sheet-header a.'+type ) ){
            ct.click();
        }
    }

    gotoquota(el) {
        const stage    = document.getElementById('stage');
        const goto     = el.getAttribute('data-goto');
        const subtable = gid(goto);
        const sheet    = getClosest(subtable, '.quota-sheet');
        const status   = sheet.querySelector('.quota-sheet-toggle.off');
        if ( status ) status.click();

        window.location.hash = '#' + goto;
    }
    searchQuotas(e) {
        const searchVal = e.target.value.toLowerCase();
        const searchTRs = gid('qbTable').querySelectorAll('table tr');

        let lastHeaderPassed;
        let anyTRsShown = false;

        for( let st of searchTRs ){

            if( st.classList.contains( 'row-legend' ) ) {
                if (lastHeaderPassed && !anyTRsShown){
                    lastHeaderPassed.style.display = 'none';
                } else if(lastHeaderPassed) {
                    lastHeaderPassed.style.display = 'table-row';
                }
                anyTRsShown = false
                lastHeaderPassed = st;
            }

            let atag = st.querySelector('button');

            const text = (atag) ? atag.innerText.toLowerCase() : '';
            if ( text.indexOf( searchVal ) > -1 ) {
                st.style.display = 'table-row';
                anyTRsShown = true;
            }
            else {
                st.style.display = 'none';
            }
        }

        if (lastHeaderPassed && !anyTRsShown){
            lastHeaderPassed.style.display = 'none';
        } else if(lastHeaderPassed) {
            lastHeaderPassed.style.display = 'table-row';
        }
    }


    highlight(el){
        el = el.target || el;
        const editor = gid( "_editor" );

        qsa( 'tbody td.editable' ).forEach((elem) => {
            elem.classList.remove( 'highlightEdit' );
        });
        el.classList.add( 'highlightEdit' );
        localStorage.setItem( 'quotaIndex', JSON.stringify(el.getAttribute('tabindex')) );

        setTimeout( function(){
            editor.select();
        }, 50);
    }
    cancel(){
        if (App.onQuota){
            const cancel = $('.cancel-link');
            cancel[0].click();

        }
    }
    tabForward(e){
        if ( e.keyCode === 9 ) { //tab
            gid('_save').click();

            const curindex = parseInt(JSON.parse(localStorage.getItem('quotaIndex')));
            const nextindex = e.shiftKey ? curindex - 1 : curindex + 1;

            const nextItem = qs('[tabindex="' + nextindex + '"]');
            this.highlight(nextItem);
            nextItem.click();
            e.preventDefault();
        }
    }

    run(){

        prependTo(gid('main'),
                `<div id="quotaBuddy" class="qbhide">
					<div id="qbHead">
						<div id="qbSearch"><input type="text" name="quotaLU" placeholder="Search Quotas ..." /></div>
						<div class="spQB">
							<button id="hideAll" class="spQBa qbred">Hide all</button>
							<button id="showAll" class="spQBa qbgreen">Show all</button>
						</div>
					</div>
					<div id="qbTable">
						<table></table>
					</div>
				    <div id="qbtoggle"></div>
				</div>`);

        gid('qbtoggle').addEventListener( 'click', this.toggleQB );
        gid('hideAll').addEventListener('click', this.hideShowAll.bind(null, 'on'));
        gid('showAll').addEventListener('click', this.hideShowAll.bind(null, 'off'));

        const qBuddyT = qs('#qbTable table'),
              qSheets = qsa('.quota-sheet');

        for ( let sheet of qSheets ){
            const sheetName = sheet.querySelector('.sheet-name strong').innerText;
            misc.addRow(qBuddyT, `<td>${sheetName}</td>`, "row-legend");

            const tables = sheet.querySelectorAll('table.table');

            for ( let table of tables ) {
                const subtables = table.querySelectorAll('.nquota-description');
                let rowtext = "";

                for ( let st of subtables ){
                    rowtext = `<td class="quotaTogglers">
									<button class="goto goto-${table.id}" data-goto="${table.id}">${st.innerText}</button>
								</td>`;

                    misc.addRow(qBuddyT, rowtext);
                }

            }
        }

        qBuddyT.addEventListener('click', (e) => {
            if ( e.target.classList.contains('goto') ){
                return this.gotoquota(e.target);
            }
            return false;
        });

        const qbSearch = gid('qbSearch').querySelector('input');
        qbSearch.addEventListener('keyup', e => this.searchQuotas(e) );

        const editableTDs = qsa("tbody td.editable");
        for (let i in editableTDs){
            if ( !isNaN(parseInt(i, 10)) ){
                editableTDs[i].setAttribute('tabindex', +i+1);
            }
        }

        const editor = gid("_editor");
        //when tab is pressed move to next input
        editor.addEventListener('keydown', e => this.tabForward(e));

        qsa("tbody td.editable").forEach((el) => {
            el.addEventListener('click', e => this.highlight(e));
        });
    }

}

export default new QuotaBuddy();
