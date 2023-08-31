$(document).ready(function () {
    const savedBooksForBookshelf = [];

    $('.book-cover').on('click', function () {
        $('.book-cover-description').toggleClass("hidden");
        $('.book-cover-description').toggleClass("book-description");
    });

    $('.recommended-book .options .like').on('click', function () {
        const grandparentID = $(this).closest('.recommended-book').attr('id');
        if(!savedBooksForBookshelf.includes(grandparentID)) {
            savedBooksForBookshelf.push(grandparentID);
            $(this).css('opacity', 0.5);
        } else {
            const index = savedBooksForBookshelf.indexOf(grandparentID);
            savedBooksForBookshelf.splice(index, 1);
            $(this).css('opacity', 1);
        }
    });

    $('.recommended-book .options .not-like').on('click', function () {
        const grandparentID = $(this).closest('.recommended-book').attr('id');
        $('#' + grandparentID).animate({ opacity: 0 }, 500, function() {
            $('#' + grandparentID).remove();
        });
        if(savedBooksForBookshelf.includes(grandparentID)) {
            const index = savedBooksForBookshelf.indexOf(grandparentID);
            savedBooksForBookshelf.splice(index, 1);
        }
    });

    $('.view-your-bookshelf').on('click', function () {
        /* Using the savedBooksForBookshelf arrays, make API call to genres table to populate the
        bookshelf section before revealing the section as below */
        $.ajax({
            type: GET,
            url: 'http://0.0.0.0.5001/api/v1/books/' + savedBooksForBookshelf,
            success: function (bookshelf) {
                $('div.bookshelf-books').empty()
                $.each(bookshelf, function(index, element) {
                    const bookshelfBookItem = `<div class="bookshelf-book" id="${element.id}"><div class="bookshelf-book-cover"></div><div class="bookshelf-book-cover-description hidden"><p>${element.description}</p></div><div class="options"><div class="remove"></div></div></div>`;
                    $('div.bookshelf-books').append(bookshelfBookItem);
                    $(`div#${element.id} .bookshelf-book-cover`).css({
                        'background-image': `url(${element.cover_image})`,
                        'background-repeat': 'no-repeat',
                        'background-size': 'contain',
                        'background-position': 'center center'
                    });
                });
            }
        });
        if($('#bookshelf').hasClass("hidden")) {
            $('#bookshelf').removeClass("hidden");
            $('#bookshelf').addClass("bookshelf-section");
        }
    });
});
