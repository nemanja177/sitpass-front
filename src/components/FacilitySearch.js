import React, { useState } from 'react';

function FacilitySearch({ onSearch }) {
  const [mode, setMode] = useState('basic');

  // Basic
  const [basicText, setBasicText] = useState('');

  // Advanced
  const [name, setName] = useState('');
  const [nameSearchType, setNameSearchType] = useState('match');
  const [description, setDescription] = useState('');
  const [descriptionSearchType, setDescriptionSearchType] = useState('match');
  const [usePdfText, setUsePdfText] = useState(false); // NOVO - flag za PDF pretragu
  const [pdfTextSearchType, setPdfTextSearchType] = useState('match');

  const [minReview, setMinReview] = useState('');
  const [maxReview, setMaxReview] = useState('');
  const [booleanOperator, setBooleanOperator] = useState('AND');

  const [avgGradeCategory, setAvgGradeCategory] = useState('equipment');
  const [minAvgRating, setMinAvgRating] = useState('');
  const [maxAvgRating, setMaxAvgRating] = useState('');

  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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
      const filters = {
        mode,
        name,
        nameSearchType,
        description: usePdfText ? '' : description,
        descriptionSearchType: usePdfText ? '' : descriptionSearchType,
        pdfText: usePdfText ? description : '',
        pdfTextSearchType: usePdfText ? pdfTextSearchType : '',
        minReview: minReview ? parseInt(minReview, 10) : null,
        maxReview: maxReview ? parseInt(maxReview, 10) : null,
        booleanOperator,
        avgGradeCategory,
        minAvgRating: minAvgRating !== '' ? parseFloat(minAvgRating) : null,
        maxAvgRating: maxAvgRating !== '' ? parseFloat(maxAvgRating) : null,
        sortField: sortField || null,
        sortOrder,
        page: 0,
        size: 10,
      };
      onSearch(filters);
    }
  };

  return (
    <div
      style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '20px' }}
    >
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
            onChange={(e) => setBasicText(e.target.value)}
            style={{ width: '70%', padding: '8px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>
            Pretraži
          </button>
        </form>
      )}

      {mode === 'advanced' && (
        <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
          <div>
            <input
              type="text"
              placeholder="Unesite naziv objekta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '60%', padding: '8px', marginRight: '10px' }}
            />
            <select
              value={nameSearchType}
              onChange={(e) => setNameSearchType(e.target.value)}
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
              placeholder={
                usePdfText
                  ? 'Unesite tekst za pretragu u PDF-u'
                  : 'Unesite opis objekta'
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '60%', padding: '8px', marginRight: '10px' }}
            />
            <select
              value={usePdfText ? pdfTextSearchType : descriptionSearchType}
              onChange={(e) =>
                usePdfText
                  ? setPdfTextSearchType(e.target.value)
                  : setDescriptionSearchType(e.target.value)
              }
              style={{ padding: '8px' }}
            >
              <option value="match">Match</option>
              <option value="phrase">Phrase</option>
              <option value="prefix">Prefix</option>
              <option value="fuzzy">Fuzzy</option>
            </select>

            <label style={{ marginLeft: '10px' }}>
              <input
                type="checkbox"
                checked={usePdfText}
                onChange={(e) => setUsePdfText(e.target.checked)}
              />
              Pretraži PDF opis
            </label>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>
              Min Recenzija:
              <input
                type="number"
                value={minReview}
                onChange={(e) => setMinReview(e.target.value)}
                style={{
                  width: '80px',
                  marginLeft: '5px',
                  marginRight: '10px',
                }}
              />
            </label>
            <label>
              Max Recenzija:
              <input
                type="number"
                value={maxReview}
                onChange={(e) => setMaxReview(e.target.value)}
                style={{ width: '80px', marginLeft: '5px' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>
              Kategorija prosečne ocene:&nbsp;
              <select
                value={avgGradeCategory}
                onChange={(e) => setAvgGradeCategory(e.target.value)}
                style={{ padding: '5px', marginRight: '8px' }}
              >
                <option value="equipment">Oprema</option>
                <option value="staff">Osoblje</option>
                <option value="hygiene">Higijena</option>
                <option value="space">Prostor</option>
              </select>
            </label>
            <label>
              Min prosek:
              <input
                type="number"
                step="0.1"
                value={minAvgRating}
                onChange={(e) => setMinAvgRating(e.target.value)}
                style={{
                  width: '80px',
                  marginLeft: '5px',
                  marginRight: '10px',
                }}
              />
            </label>
            <label>
              Max prosek:
              <input
                type="number"
                step="0.1"
                value={maxAvgRating}
                onChange={(e) => setMaxAvgRating(e.target.value)}
                style={{ width: '80px', marginLeft: '5px' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>
              Operator:
              <select
                value={booleanOperator}
                onChange={(e) => setBooleanOperator(e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            </label>
          </div>

          <div
            style={{
              marginTop: '15px',
              borderTop: '1px dashed #ccc',
              paddingTop: '10px',
            }}
          >
            <label>
              Sortiraj po:
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                style={{ padding: '5px', marginRight: '10px' }}
              >
                <option value="">-- Bez sortiranja --</option>
                <option value="name">Naziv</option>
                <option value="reviewCount">Broj recenzija</option>
              </select>
            </label>

            {sortField && (
              <label>
                Smer:&nbsp;
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{ padding: '5px' }}
                >
                  <option value="asc">Rastuće (ASC)</option>
                  <option value="desc">Opadajuće (DESC)</option>
                </select>
              </label>
            )}
          </div>

          <div style={{ marginTop: '15px' }}>
            <button
              type="submit"
              style={{ padding: '8px 20px', fontWeight: 'bold' }}
            >
              Pretraži
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FacilitySearch;