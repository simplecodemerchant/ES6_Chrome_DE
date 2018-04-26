class QuotaBuddy {


    run(){

    }

}

// var QuotaBuddy = {
//
//
//     url1: function(){
//         return window.location.href;
//     },
//
//
//     url_host: function(){
//         return window.location.host;
//     },
//
//     gid: function(id){
//         return document.getElementById(id);
//     },
//     q: function(query){
//         return document.querySelector(query);
//     },
//
//     qa: function(query){
//         return document.querySelectorAll(query);
//     },
//
//     getClosest: function ( elem, selector ) {
//         for ( ; elem && elem !== document; elem = elem.parentNode ) {
//             if ( elem.matches( selector ) ) return elem;
//         }
//         return null;
//
//     },
//
//     injectJs: function(srcFile) {
//         var src = document.createElement('script');
//         src.textContent = srcFile;
//         document.body.appendChild(src);
//     },
//
//
//     gotoquota: function gotoquota(el) {
//         var goto     = el.getAttribute('data-goto');
//         var subtable = document.getElementById(goto);
//         var sheet    = this.getClosest(subtable, '.quota-sheet');
//         var status   = sheet.querySelector('.quota-sheet-toggle.off');
//         if ( status ) status.click();
//         console.log(sheet);
//
//         window.location.hash = '#' + goto;
//     },
//
//
//     hideShowAll: function(type) {
//         for ( var ct of this.qa( '.quota-sheet .sheet-header a.'+type ) ){
//             ct.click();
//         }
//     },
//
//
//     searchQuotas: function() {
//         var searchVal = $(this).val().toLowerCase();
//         var searchTRs = $('#qbTable').find('table tr');
//
//         searchTRs.each(function () {
//             var self    = $(this);
//             var selfVal = self.find('a').text().toLowerCase();
//
//             if ( selfVal.indexOf( searchVal ) > -1 || self.hasClass( 'quotaTogglersHead' ) ) {
//                 self.show();
//             }
//             else {
//                 self.hide();
//             }
//         });
//     },
//
//
//     //cancel editing cell
//     cancel: function() {
//         $("#saveCancel").find('button.secondary').click();
//     },
//
//     //edit quotas
//     edit: function() {
//         $("#editQuotas").click();
//     },
//     addTo: function(el, str, c){
//
//         var div = document.createElement(eltype);
//         div.innerHTML = str;
//         div.classList.add(c);
//
//         while (div.children.length > 0) {
//             el.appendChild(div.children[0]);
//         }
//     },
//     addRow: function(table, rowtext, c){
//         var newRow = table.insertRow(table.rows.length);
//         if (c) newRow.classList.add(c);
//         newRow.innerHTML = rowtext;
//     },
//
//     init: function(){
//
//         var self = this;
//
//         var quotaBuddyHtml = `
//                 <div id="quotaBuddy" class="qbhide">
// 					<div id="qbHead">
// 						<div id="qbSearch"><input type="text" name="quotaLU" placeholder="Search Quotas ..." /></div>
// 						<div class="spQB">
// 							<button id="hideAll" class="spQBa qbred">-</button>
// 							<button id="showAll" class="spQBa qbgreen">+</button>
// 							<button id="closeQB" class="spQBa qbgrey">&lt;</button>
// 						</div>
// 					</div>
// 					<div id="qbTable">
// 						<table></table>
// 					</div>
// 				</div>
// 				<div id="qbtoggle" class="qbhide">&gt;</div>
// 				`;
//
//         $('#main').prepend(quotaBuddyHtml);
//         $('#closeQB, #qbtoggle').on('click', function(){
//             $('#quotaBuddy').toggleClass('qbhide');
//             $('#qbtoggle').toggleClass('qbhide');
//         });
//
//         this.gid('hideAll').addEventListener('click', self.hideShowAll.bind(this, 'on'));
//         this.gid('showAll').addEventListener('click', self.hideShowAll.bind(this, 'off'));
//         // this.injectJs(this.gotoquota);
//
//         var qBuddyT = this.q('#qbTable table'),
//             qSheets     = this.qa('.quota-sheet');
//
//         for ( var sheet of qSheets ){
//             var sheetName = sheet.querySelector('.sheet-name strong').innerText;
//             this.addRow(qBuddyT, `<td>${sheetName}</td>`, "row-legend");
//
//             var tables = sheet.querySelectorAll('table.table');
//
//             for ( var table of tables ) {
//                 var subtables = table.querySelectorAll('.nquota-description');
//                 var rowtext = "";
//
//                 for ( var st of subtables ){
//                     rowtext = `
// 								<td class="quotaTogglers">
// 									<a  href="javascript:void(0)" class="goto ${table.id}" data-goto="${table.id}">${st.innerText}</a>
// 								</td>`;
//
//                     this.addRow(qBuddyT, rowtext);
//                 }
//
//             }
//         }
//
//         qBuddyT.addEventListener('click', function(e){
//             var classes = e.target.className.split(/\s+/);
//             if ( classes.indexOf('goto') !== -1 ){
//                 return this.gotoquota(event.target);
//             }
//             return false;
//         }.bind(this));
//
//         var qbSearch = $('#qbSearch').find('input');
//         qbSearch.on('keyup', self.searchQuotas);
//
//
//         var editor = $("#_editor");
//         //when tab is pressed move to next input
//         editor.on('keydown', function (e) {
//             var code = e.keyCode || e.which;
//             if (code === 9) { //tab
//                 $('#_save').get(0).click();
//
//                 var curindex = parseInt(JSON.parse(localStorage.getItem('quotaIndex')));
//                 var nextindex = e.shiftKey ? curindex - 1 : curindex + 1;
//
//                 var nextItem = $('[tabindex=' + nextindex + ']');
//                 self.highlight(nextItem);
//                 nextItem.click();
//                 e.preventDefault();
//             }
//         });
//
//
//         // set up tab indexes
//         $("tbody td.editable").each(function (i) {
//             $(this).attr('tabindex', i + 1);
//         });
//
//         $("tbody td.editable").on('click', function(){
//             self.highlight($(this));
//         });
//     },
//
//     highlight: function(el){
//         var editor = $("#_editor");
//
//         $('tbody td.editable').removeClass('highlightEdit');
//         el.addClass('highlightEdit');
//         localStorage.setItem( 'quotaIndex', JSON.stringify(el.attr('tabindex')) );
//
//         setTimeout( function(){
//             editor.focus().select();
//         }, 50);
//     }
//
//
// };
//
// return QuotaBuddy;
// }