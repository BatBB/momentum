const quote = document.querySelector('.quote-text'),
  author= document.querySelector('.author');

const getRandomQuote = quantityQuote => Math.floor(Math.random() * quantityQuote);

async function getQuotes() {  
  const url = 'https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
  const quotes = url;
  const res = await fetch(quotes);
  const data = await res.json();
  const quoteLength = data.quotes.length;
  const randomQute = getRandomQuote(quoteLength);
  
  quote.textContent = `"${data.quotes[randomQute].quote}"`;
  author.textContent = data.quotes[randomQute].author;
}

export default getQuotes;
