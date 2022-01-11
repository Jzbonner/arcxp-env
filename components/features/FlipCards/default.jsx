import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AtlantaHomicidesMasterList2021 from './data/AtlantaHomicidesMasterList2021';
import './default.scss';

const initMap = () => {
  if (typeof window !== 'undefined') {
    const mapJs = window.document.querySelector('#mapJs');
    if (mapJs && !mapJs.attr('data-loaded')) {
      const accessToken = 'pk.eyJ1IjoibmV3c2FwcHNhamMiLCJhIjoiY2trNzVoM3RmMDliMTJ2bW9ndmsycmhjZCJ9.a37jVrQk_5FHFkUo0U-K6A';
      const L = window.L || {};
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken,
      }).addTo(map);

      mapJs.attr('data-loaded', true);
    }
  }
};

const FlipCards = ({ customFields = {} }) => {
  const {
    useLocalData,
  } = customFields;
  const [isFlipped, setFlipped] = useState(-1);

  const flipCard = (i) => {
    if (isFlipped === i) {
      setFlipped(-1);
    } else {
      setFlipped(i);
    }
  };

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
  ];

  const renderCards = (data) => {
    if (!data.items) return null;

    const sortedData = data.items;
    sortedData.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    return sortedData.map((cardData, i) => {
      if (!cardData) return null;

      const {
        'First name': fName = '',
        'Last name': lName = '',
        Age: age,
        Gender: gender,
        photo_url: imageUri,
        Date: date,
        Latitude: lat,
        Longitude: long,
        Details: description,
        Link: storyUri,
      } = cardData || {};

      const dateArr = date.split('-');
      const {
        0: year,
        1: month,
        2: day,
      } = dateArr;
      const monthFullName = month ? months[month - 1] : '';
      const monthShortName = monthFullName.substr(0, 3);

      // when attempting to populate className values with template literals, I was running into an eslint error:
      // TypeError: Cannot read property 'range' of null
      // happened for all three of the example immediately following this (name) and the className compilation
      // const name = `${fName} ${lName}`;

      let cardClass = 'card ';
      cardClass += isFlipped === i ? 'is-flipped' : '';
      let descriptionClass = 'description ';
      descriptionClass += storyUri ? 'condensed' : '';
      let cardBackContentClass = 'back content';
      cardBackContentClass += imageUri ? ' with-image' : '';
      let fullName = fName;
      fullName += ' ';
      fullName += lName;

      return <div className={cardClass} key={i} onClick={ () => flipCard(i) }>
        <div className='front content'>
          <h2>{fName}<br />{lName}</h2>
          <h3>Age: {age}</h3>
          <div className='month'>
            <span>{monthShortName.substr(0, 1)}</span>
            <span>{monthShortName.substr(1, 1)}</span>
            <span>{monthShortName.substr(2, 1)}</span></div>
          {date && <h3 className='date'>Died:<br />{monthFullName} {day}, {year}</h3>}
        </div>
        <div className={cardBackContentClass}>
          <div className='details'>
            {imageUri && <img src={imageUri} alt={fullName} />}
            <h2>{fullName}</h2>
            {age && <h3>Age: {age}</h3>}
            {gender && <h3>Gender: {gender}</h3>}
          </div>
          {lat && long && <p className='location'>
            <a href='#' data-lat={lat} data-long={long}>Location of death</a>
          </p>}
          {description && <p className={descriptionClass}>{description}</p>}
          {storyUri && <a className='more-link' href={storyUri}>Read the Article</a>}
        </div>
      </div>;
    });
  };

  if (useLocalData) {
    const data = AtlantaHomicidesMasterList2021;

    return <>
      <div id='map' className='c-map'></div>
      <div className='c-cards'>
        {renderCards(data)}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossOrigin=""/ >
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" id="mapJs" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossOrigin="" onLoad={ initMap() }></script>
      </div>
    </>;
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
