const quote = document.querySelector('.quote-text'),
  author= document.querySelector('.author');

const getRandomQuote = quantityQuote => Math.floor(Math.random() * quantityQuote);

async function getQuotes() {  
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  
  const quoteCount = data.en.length;
  const randomQuote = getRandomQuote(quoteCount);
  
  quote.textContent = `"${data.en[randomQuote].quote}"`;
  author.textContent = data.en[randomQuote].author;
}

export default getQuotes;
