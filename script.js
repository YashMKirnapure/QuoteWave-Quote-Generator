const api_url = 'https://api.api-ninjas.com/v1/quotes?category=happiness';
const api_key = 'UQ7CpqyHxE07T4ej6+En/A==6278POSagg1y9420';

const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote-button');
const tweetButton = document.getElementById('tweet-button');

async function getQuote() {
    try {
        const response = await fetch(api_url, {
            headers: { 'X-Api-Key': api_key }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const [data] = await response.json(); // Destructure to get the first item

        quoteElement.innerHTML = data?.quote || 'No quote available';
        authorElement.innerHTML = data?.author || 'Unknown author';
    } catch (error) {
        console.error('Error fetching the quote:', error);
        quoteElement.innerHTML = 'Error fetching quote.';
        authorElement.innerHTML = '';
    }
}

function tweet() {
    const tweetText = `${quoteElement.innerHTML} — by ${authorElement.innerHTML}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, "Tweet Window", "width=600,height=300");
}

// Fetch a quote when the page loads
getQuote();

// Add event listeners for button clicks
newQuoteButton.addEventListener('click', getQuote);
tweetButton.addEventListener('click', tweet);
