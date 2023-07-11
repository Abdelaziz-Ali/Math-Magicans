import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/Quote.css';

function Quote({ styleClass }) {
  const [quote, setQuote] = useState('loading...');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('loading...');

  useEffect(() => {
    const getQuotes = async () => {
      const myHeaders = new Headers();
      myHeaders.append('X-Api-Key', 'JApZ9IkdEvyK/Wn4uTRNkQ==vEuwff2CfhjGsGLJ');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      await fetch(
        'https://api.api-ninjas.com/v1/quotes?category=learning',
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => { setAuthor(`― ${result[0].author}`); setQuote(`“${result[0].quote}”`); })
        .catch((error) => setError(`Error loading Quotes!!${error.status_code}`));
    };
    getQuotes();
  }, []);

  return (
    <>
      <p className={`${styleClass} quote`}>
        Quote :
        {' '}
        {quote}
        <br />
        {author}
      </p>
      <p className={`${styleClass} quote`}>
        {error}
      </p>
    </>
  );
}
Quote.propTypes = { styleClass: PropTypes.string.isRequired };

export default Quote;
