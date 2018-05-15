$(document).ready(() => {
  var quotes = [
    {
      quote: "There is nothing either good or evil but thinking so makes it so.",
      author: "William Shakespeare"
    },
    {
      quote: "Not everything that can be counted counts, and not everything that counts can be counted",
      author: "Albert Einstein"
    },
    {
      quote: "To Beatrice,<br>darling, dearest, dead.",
      author: "Lemony Snicket"
    },
    {
      quote: "No legacy is so rich as honesty.",
      author: "William Shakespeare"
    },
    {
      quote: "In the middle of difficulty lies opportunity",
      author: "Albert Einstein"
    },
    {
      quote: "To Beatrice,<br>My love for you shall live forever. You, however, did not",
      author: "Lemony Snicket"
    }
  ];
  
  var num = Math.round(Math.random() * (quotes.length - 1));
  var quoteContent = quotes[num].quote;
  var quoteAuthor = quotes[num].author;
  $('#quote').html(quoteContent);
  $('#author').html(quoteAuthor);
  quoteContent = quoteContent.replace("<br>", " ");
  $('#tweet').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="' + encodeURIComponent(quoteContent + '" ' + quoteAuthor));
  
  $('#favourite-quote').on('click', () => {
    num = Math.round(Math.random() * (quotes.length - 1));
    quoteContent = quotes[num].quote;
    quoteAuthor = quotes[num].author;
    $('#quote').html(quoteContent);
    $('#author').html(quoteAuthor);
    quoteContent = quoteContent.replace("<br>", " ");
    $('#tweet').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="' + encodeURIComponent(quoteContent + '" ' + quoteAuthor));
  });
  
  $('#random-quote').on('click', (e) => {
    e.preventDefault();
    $.ajax( {
      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&filter[]",
      success: (data) => {
        var post = data.shift();
        post.content = post.content.replace('<p>', '').replace('</p>\n', '').replace(".  ", ".");
        $('#quote').html(post.content);
        $('#author').html(post.title);
        if(post.content.length > 200) {
          $('#tweet').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent(post.link + $('#author').html()));
        } else {
          $('#tweet').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="' + encodeURIComponent($('#quote').html() + '" ' + $('#author').html()));
        }
      },
      cache: false
    });
  });
});