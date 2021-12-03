import React from 'react';
import PropTypes from 'prop-types';
import csvData from './data/2021AtlantaHomicidesMasterList-homicides.csv';
import './default.scss';

const FlipCards = ({ customFields = {} }) => {
  const {
    useLocalData,
  } = customFields;

  const renderCards = ({ data }) => data && data.map((cardData, i) => {
    if (!cardData) return null;

    return <div className='card' key={i}>
      {cardData.image && <img src={cardData.image} alt={cardData.title} />}
      <h2>{cardData.title}</h2>
      <h3>{cardData.date}</h3>
      <h3>{cardData.location}</h3>
      <p>{cardData.description}</p>
      {cardData.link && <a className='more-link' href={cardData.link}>full article</a>}
    </div>;
  });

  if (useLocalData) {
    const data = csvData || null;
    // const data = Papa.parse('./data/2021AtlantaHomicidesMasterList-homicides.csv', {
    //   worker: true,
    //   header: true,
    //   step: row => console.log('Row:', row.data),
    //   complete: () => console.log('All done!'),
    // });
    // JSON.stringify(parsed.data);
    console.error('dave, data:', typeof data, data);
    // const reader = new FileReader();
    // reader.onload = function (e) {
    //   const text = e.target.result;
    //   console.error('dave, text:', text);
    // };
    // reader.readAsText(localData);

    return <div className='c-cards'>
      <h1>CARDS:</h1>
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
