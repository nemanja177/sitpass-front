import React, { useState } from 'react';

function FacilitySearch({ onSearch }) {
  const [mode, setMode] = useState('basic'); // 'basic' ili 'advanced'

  // Za Basic pretragu
  const [basicText, setBasicText] = useState('');

  // Za Advanced pretragu
  const [name, setName] = useState('');
  const [nameSearchType, setNameSearchType] = useState('match');
  const [description, setDescription] = useState('');
  const [descriptionSearchType, setDescriptionSearchType] = useState('match');
  const [minReview, setMinReview] = useState('');
  const [maxReview, setMaxReview] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');
  const [booleanOperator, setBooleanOperator] = useState('AND');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'basic') {
      const keywords = basicText.trim() ? basicText.trim().split(/\s+/) : [];
      onSearch({
        mode,
        keywords,
        page: 0,
        size: 10,
      });
    } else {
      onSearch({
        mode,
        name,
        nameSearchType,
        description,
        descriptionSearchType,
        minReview: minReview ? parseInt(minReview, 10) : null,
        maxReview: maxReview ? parseInt(maxReview, 10) : null,
        minRating: minRating ? parseFloat(minRating) : null,
        maxRating: maxRating ? parseFloat(maxRating) : null,
        booleanOperator,
        page: 0,
        size: 10,
      });
    }
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <div>
        <label>
          <input
            type="radio"
            value="basic"
            checked={mode === 'basic'}
            onChange={() => setMode('basic')}
          />
          Basic pretraga
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input
            type="radio"
            value="advanced"
            checked={mode === 'advanced'}
            onChange={() => setMode('advanced')}
          />
          Napredna pretraga
        </label>
      </div>

      {mode === 'basic' && (
        <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
          <input
            type="text"
            placeholder="Unesite ključne reči za pretragu"
            value={basicText}
            onChange={e => setBasicText(e.target.value)}
            style={{ width: '70%', padding: '8px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>Pretraži</button>
        </form>
      )}

      {mode === 'advanced' && (
        <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
          <div>
            <input
              type="text"
              placeholder="Unesite naziv objekta"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: '60%', padding: '8px', marginRight: '10px' }}
            />
            <select
              value={nameSearchType}
              onChange={e => setNameSearchType(e.target.value)}
              style={{ padding: '8px' }}
            >
              <option value="match">Match</option>
              <option value="phrase">Phrase</option>
              <option value="prefix">Prefix</option>
              <option value="fuzzy">Fuzzy</option>
            </select>
          </div>

          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Unesite opis objekta"
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ width: '60%', padding: '8px', marginRight: '10px' }}
            />
            <select
              value={descriptionSearchType}
              onChange={e => setDescriptionSearchType(e.target.value)}
              style={{ padding: '8px' }}
            >
              <option value="match">Match</option>
              <option value="phrase">Phrase</option>
              <option value="prefix">Prefix</option>
              <option value="fuzzy">Fuzzy</option>
            </select>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>
              Min Recenzija:
              <input
                type="number"
                value={minReview}
                onChange={e => setMinReview(e.target.value)}
                style={{ width: '80px', marginLeft: '5px', marginRight: '10px' }}
              />
            </label>
            <label>
              Max Recenzija:
              <input
                type="number"
                value={maxReview}
                onChange={e => setMaxReview(e.target.value)}
                style={{ width: '80px', marginLeft: '5px' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>
              Min Ocena:
              <input
                type="number"
                step="0.1"
                value={minRating}
                onChange={e => setMinRating(e.target.value)}
                style={{ width: '80px', marginLeft: '5px', marginRight: '10px' }}
              />
            </label>
            <label>
              Max Ocena:
              <input
                type="number"
                step="0.1"
                value={maxRating}
                onChange={e => setMaxRating(e.target.value)}
                style={{ width: '80px', marginLeft: '5px' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>
              Operator:
              <select
                value={booleanOperator}
                onChange={e => setBooleanOperator(e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            </label>
          </div>

          <div style={{ marginTop: '15px' }}>
            <button type="submit" style={{ padding: '8px 20px', fontWeight: 'bold' }}>
              Pretraži
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FacilitySearch;