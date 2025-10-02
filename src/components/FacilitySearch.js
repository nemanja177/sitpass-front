import React, { useState } from 'react';

function FacilitySearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Search filters:", { query, page: 0, size: 10 });
    onSearch({ query, page: 0, size: 10 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Unesite upit, npr. name:Beograd prefix:name:Planina"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      />
      <button type="submit">Pretraži</button>
    </form>
  );
}

export default FacilitySearch;