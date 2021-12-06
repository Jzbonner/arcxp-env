import React from 'react';
import PropTypes from 'prop-types';
import AtlantaHomicidesMasterList2021 from './data/AtlantaHomicidesMasterList2021';
import './default.scss';

const FlipCards = ({ customFields = {} }) => {
  const {
    useLocalData,
  } = customFields;

  const renderCards = data => data && data?.items.map((cardData, i) => {
    if (!cardData) return null;

    const {
      'First name': fName = '',
      'Last name': lName = '',
      Image: imageUri,
      Date: date,
      Street: street,
      City: city,
      Latitude: lat,
      Longitude: long,
      Details: description,
      Link: storyUri,
    } = cardData || {};

    // when attempting to create a template literal for combining fName & lName, I was running into an eslint error:
    // TypeError: Cannot read property 'range' of null
    // const name = `${fName} ${lName}`;

    return <div className='card' key={i}>
      {imageUri && <img src={imageUri} alt={fName} />}
      <h2>{fName} {lName}</h2>
      {date && <h3>{date}</h3>}
      <h3>{street} {city}</h3>
      {lat && long && <p>coords: {lat}, {long}</p>}
      {description && <p>{description}</p>}
      {storyUri && <a className='more-link' href={storyUri}>full article</a>}
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
