const quote = document.querySelector('.quote-text'),
  author= document.querySelector('.author');

const getRandomQuote = quantityQuote => Math.floor(Math.random() * quantityQuote);

async function getQuotes() {
  const lang = localStorage.getItem('lang');  
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  
  const quoteCount = data[lang].length;
  const randomQuote = getRandomQuote(quoteCount);
  
  quote.textContent = `"${data[lang][randomQuote].quote}"`;
  author.textContent = data[lang][randomQuote].author;
}

export default getQuotes;
