// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

//refresh the quote every 30 seconds
window.setInterval(printQuote, 30000);

//selects a random quote object from the quotes array and return it
function getRandomQuote() {
    var totalQuotes     = quotes.length; 
    var getRandomQuote  = Math.floor(Math.random() * totalQuotes);
    var randomQuote     = quotes[getRandomQuote];
    return randomQuote;
}

//generate random number between 1 and 255
function randomRGB(){
    return Math.floor(Math.random() * 255) +1;
}

//call randomRGB 3 times and return gba color
function randomColor() {
    var red     = randomRGB();
    var green   = randomRGB();
    var blue    = randomRGB();
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

/*
1. output quotes randomly 
2. change the background color of the body and loadQuote button
*/
function printQuote() {
    var quote = getRandomQuote();
    var backgroundColor = randomColor();
    // prevent white background color
    while (backgroundColor == 'rgb(255,255,255)') {
        backgroundColor = randomColor();
    }
    
    //when all the quotes played reset playedQuotes
    if(playedQuotes.length === quotes.length) {
        playedQuotes = [];
    }

    //if the quote already played get another
    while(playedQuotes.indexOf(quote) !== -1) {
        quote = getRandomQuote();
    }

    var html    = '<p class="quote">' + quote.quote + '</p>';
    html += '<p class="source">' + quote.source;
    if(quote.citation) {
        html += '<span class="citation">' + quote.citation + '</span>';
    }
    if(quote.year) {
        html += '<span class="year">' + quote.year + '</span>';
    }
    html += '</p><p class="tags">tags: ' + quote.tags.join(', ') + '</p>';

    //add the quote to playedQuotes
    playedQuotes.push(quote);

    document.getElementById('quote-box').innerHTML = html;
    document.body.style.backgroundColor = backgroundColor;
    document.getElementById('loadQuote').style.backgroundColor = backgroundColor;
}
var playedQuotes = [];