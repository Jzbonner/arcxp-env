import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AtlantaHomicidesMasterList2021 from './data/AtlantaHomicidesMasterList2021';
import './default.scss';

const FlipCards = ({ customFields = {} }) => {
  const {
    useLocalData,
  } = customFields;
  const [isFlipped, setFlipped] = useState(-1);

  const flipCard = (i) => {
    setFlipped(i);
  };

  const months = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
  ];

  const renderCards = data => data && data?.items.map((cardData, i) => {
    if (!cardData) return null;

    const {
      'First name': fName = '',
      'Last name': lName = '',
      Age: age,
      Agency: agency,
      Image: imageUri,
      Date: date,
      Street: street,
      City: city,
      Latitude: lat,
      Longitude: long,
      Details: description,
      Link: storyUri,
    } = cardData || {};

    const dateMonth = date.split('-')[1];
    const monthName = dateMonth ? months[dateMonth - 1] : '';

    // when attempting to create a template literals, I'm running into an eslint error:
    // TypeError: Cannot read property 'range' of null
    // happened for both the example immediately following this (name) and the className compilation
    // const name = `${fName} ${lName}`;

    let cardClass = 'card';
    cardClass += isFlipped === i ? ' is-flipped' : '';

    return <div className={cardClass} key={i} onClick={ () => flipCard(i) }>
      <div className='front content'>
        <h2>{fName} {lName}</h2>
        <h3>Age: {age}</h3>
        <div className='month' datamonth={dateMonth}>{monthName}</div>
        {date && <h3 className='date'>Died:<br />{date}</h3>}
      </div>
      <div className='back content'>
        {imageUri && <img src={imageUri} alt={fName} />}
        <h2>{fName} {lName}</h2>
        <h3>Age: {age}</h3>
        <p className='location'>{street} {city} (coords: {lat}, {long})</p>
        {agency && <p className='agency'>Agency: {agency}</p>}
        {description && <p className='description'>{description}</p>}
        {storyUri && <a className='more-link' href={storyUri}>Read the Article</a>}
      </div>
    </div>;
  });

  if (useLocalData) {
    const data = AtlantaHomicidesMasterList2021;

    return <div className='c-cards'>
      {renderCards(data)}
    </div>;
  }

  return <h1>FlipCards are still under construction</h1>;
};

FlipCards.propTypes = {
  customFields: PropTypes.shape({
    useLocalData: PropTypes.bool.tag({
      label: 'Use local data (i.e. csv)',
      description: 'Check this box to use local (to the feature) data instead of a content source',
      value: '',
    }),
  }),
};

export default FlipCards;
