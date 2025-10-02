import React, { useState, useEffect } from 'react';
import FacilitySearch from '../components/FacilitySearch';
import FacilityList from '../components/FacilityList';
import Pagination from '../components/Pagination';

function FacilitySearchPage() {
  const [facilities, setFacilities] = useState([]);
  const [filters, setFilters] = useState({ query: '', page: 0, size: 10 });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchFacilities = async (searchFilters) => {
    const { query, page, size } = searchFilters;
    const url = `http://localhost:8080/api/facilities/search?page=${page}&size=${size}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }), // šaljemo samo query u JSON telu
    });

    if (!res.ok) {
      console.error('Greška prilikom pretrage');
      return;
    }

    const data = await res.json();
    setFacilities(data.content || []);
    setTotalPages(data.totalPages || 0);
    setPage(data.number || 0);
    setFilters(searchFilters);
  };

  const handleSearch = (searchFilters) => {
    fetchFacilities({ ...searchFilters, page: 0 }); // resetujemo stranicu na 0
  };

  const handlePageChange = (newPage) => {
    fetchFacilities({ ...filters, page: newPage });
  };

  useEffect(() => {
    fetchFacilities(filters);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pretraga Objekata</h1>
      <FacilitySearch onSearch={handleSearch} />
      <FacilityList facilities={facilities} />
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default FacilitySearchPage;



// import React, { useState, useEffect } from 'react';
// import FacilitySearch from '../components/FacilitySearch';
// import FacilityList from '../components/FacilityList';
// import Pagination from '../components/Pagination';

// function FacilitySearchPage() {
//   const [facilities, setFacilities] = useState([]);
//   const [filters, setFilters] = useState({ query: '', page: 0, size: 10 });
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchFacilities = async (searchFilters) => {
//     const res = await fetch("http://localhost:8080/api/facilities/search", {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(searchFilters),
//     });

//     if (!res.ok) {
//       console.error('Greška prilikom pretrage');
//       return;
//     }

//     const data = await res.json();
//     setFacilities(data.content || []);
//     setTotalPages(data.totalPages || 0);
//     setPage(data.number || 0);
//     setFilters(searchFilters);
//   };

//   const handleSearch = (searchFilters) => {
//     searchFilters.page = 0;
//     fetchFacilities(searchFilters);
//   };

//   const handlePageChange = (newPage) => {
//     const newFilters = { ...filters, page: newPage };
//     fetchFacilities(newFilters);
//   };

//   useEffect(() => {
//     fetchFacilities(filters);
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Pretraga Objekata</h1>
//       <FacilitySearch onSearch={handleSearch} />
//       <FacilityList facilities={facilities} />
//       <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
//     </div>
//   );
// }

// export default FacilitySearchPage;