import $jQuery from 'jquery'
import getBrowser  from '../helpers/getBrowser'
import '../styles/popup.scss'

(($) => {

    const browser = getBrowser();

    let cached_bookmarks = [];
    const bookmark_search = $('.bookmark-search');
    const bookmark_list = $('.bookmark-list');
    const update_bookmark = $('#update-bookmark');
    const update_bookmark_form = $('#update-bookmark-form');

    function getSearch() {
        browser.storage.local.get({'popup_search': ''}, (res) => {
            const value = res['popup_search'];
            if (value !== undefined) {
                bookmark_search.val(value);
                bookmark_search.select();
            }
        });
    }

    getSearch();

    function setSearch() {

        browser.storage.local.set({'popup_search': bookmark_search.val()});
    }

    function filter(obj, search) {
        const book_title = obj.title.toLowerCase();
        const searchlow = search.toLowerCase();

        return book_title.indexOf(searchlow) !== -1;
    }


    function filter_bookmarks(array) {
        const search = bookmark_search.val();
        return array.filter((obj) => {
            return filter(obj, search);
        });
    }


    function list_bookmarks() {

        bookmark_list.find('.book-wrap').remove();
        let filtered_books = filter_bookmarks(cached_bookmarks);

        let div;

        for (let book of filtered_books) {

            div = $('<div/>', {
                'class': "book-wrap",
            })
                .data(book)
                .text(book.title);

            bookmark_list.append(div);
        }
        move(1);
    }


    function flatten_bookmarks(bookmarks) {

        let books = [];

        function flatten(bookmarks) {

            for (let book of bookmarks) {
                if (book.url && !/^(javascript:|place:|data:)/i.test(book.url)) {
                    books.push(book);

                }

                if (book.children) {
                    flatten(book.children);
                }
            }
        }

        flatten(bookmarks.folders);
        return books;

    }


    function get_all_bookmarks() {
        return new Promise((res, rej) => {
            browser.runtime.sendMessage({
                    type: 'bookmarks'
                },
                (response) => {
                    if (response){
                        res(flatten_bookmarks(response))
                    }
                    else {
                        rej('No bookmarks found')
                    }
                });
        })

    }


    function update_bookmark_list() {
        get_all_bookmarks().then((response) => {

            cached_bookmarks = response;
            list_bookmarks();

        });
    }

    update_bookmark_list();


    function gotourl() {
        let that = $(this);

        browser.tabs.create({
            active: true,
            url: that.data('url')
        });

        window.close();
    }

    function gotourlback() {
        let that = $(this);

        browser.tabs.create({
            active: false,
            url: that.data('url')
        });
    }

    function move(direction) {
        let books = bookmark_list.find('.book-wrap');
        let selected = $('.selected');
        let idx = books.index(selected);

        const newidx = idx + direction;
        const newselected = books.eq(newidx);

        if ((newidx >= 0) && newselected && (newidx <= (books.length - 1))) {
            selected.removeClass('selected');
            newselected.addClass('selected');
        }

    }

    function list_action(e) {
        if (38 === e.keyCode) {
            e.preventDefault();
            return e.type === 'keydown' ? move(-1) : null;
        } else if (40 === e.keyCode) {
            e.preventDefault();
            return e.type === 'keydown' ? move(1) : null;
        } else if (13 === e.keyCode) {
            gotourl.call($('.book-wrap.selected'));
        }
        setSearch();
        list_bookmarks();
    }


    function clearForm() {
        update_bookmark_form.find('input:text, input:hidden').val('');
        update_bookmark.addClass('hide');
    }

    function loadBookmark(data) {
        update_bookmark.removeClass('hide');
        update_bookmark_form.find('input:text, input:hidden').each(function () {
            const that = $(this);
            const value = data[that.attr('id')];
            that.val(value);
        });
    }

    function updateBookmark() {
        const formData = update_bookmark_form.serializeArray().map((data) => {
            const obj = {};
            obj[data.name] = data.value;
            return obj;
        })
            .reduce((data, obj) => {
                return Object.assign(obj, data);
            }, {});


        const obj = {};
        obj['title'] = formData.title;
        obj['url'] = formData.url;
        if (obj['title'] !== undefined || obj['url'] !== undefined) {
            browser.bookmarks.update(formData.id, obj, () => {
                clearForm();
                update_bookmark_list();
            });
        }

    }


    function mouse(e) {
        switch (e.which) {
            case 3:
                loadBookmark($(this).data());
                break;
            case 2:
                gotourlback.call($(this));
                break;
            default:
                gotourl.call($(this));
                break;
        }
    }

    bookmark_search.on('keydown keyup', list_action);
    bookmark_list.on('mousedown', '.book-wrap', mouse);
    bookmark_list.contextmenu(() => {
        return false;
    });
    update_bookmark.contextmenu(() => {
        return false;
    });

    $('.btn').on('click', (e) => {
        e.preventDefault();
    });

    $('#cancel').on('click', clearForm);
    $('#save').on('click', updateBookmark);


    // Takes a bit for the popup to load even though the page says it loaded
    setTimeout(() => {
        $(".bookmark-search").focus();
    }, 100);


})($jQuery);