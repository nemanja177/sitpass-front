import React, { useState, useEffect } from 'react';
import FacilitySearch from '../components/FacilitySearch';
import FacilityList from '../components/FacilityList';
import Pagination from '../components/Pagination';

function FacilitySearchPage() {
  const [facilities, setFacilities] = useState([]);
  const [filters, setFilters] = useState({
    mode: 'basic',
    keywords: [],
    searchText: '',
    searchType: 'match',
    name: '',
    nameSearchType: 'match',
    description: '',
    descriptionSearchType: 'match',
    minReview: '',
    maxReview: '',
    minRating: '',
    maxRating: '',
    booleanOperator: 'AND',
    page: 0,
    size: 10,
  });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchFacilities = async (searchFilters) => {
    const {
      mode,
      keywords,
      searchText,
      searchType,
      name,
      nameSearchType,
      description,
      descriptionSearchType,
      minReview,
      maxReview,
      minRating,
      maxRating,
      booleanOperator,
      page,
      size,
    } = searchFilters;

    let url = '';
    let body = {};

    if (mode === 'basic') {
      url = `http://localhost:8080/api/facilities/basicsearch?page=${page}&size=${size}`;
      body = {
        keywords: keywords.length ? keywords : (searchText ? searchText.trim().split(/\s+/) : []),
      };
    } else {
      url = `http://localhost:8080/api/facilities/advancedsearch?page=${page}&size=${size}`;
      body = {
        name,
        nameSearchType,
        description,
        descriptionSearchType,
        minReviewCount: minReview ? parseInt(minReview, 10) : null,
        maxReviewCount: maxReview ? parseInt(maxReview, 10) : null,
        minAvgRating: minRating ? parseFloat(minRating) : null,
        maxAvgRating: maxRating ? parseFloat(maxRating) : null,
        booleanOperator,
      };
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error('Greška prilikom pretrage');
      return;
    }

    const data = await res.json();
    setFacilities(data.content || []);
    setTotalPages(data.totalPages || 0);
    setPage(data.number || 0);
    setFilters({ ...searchFilters, page });
  };

  const handleSearch = (searchFilters) => {
    fetchFacilities({ ...searchFilters, page: 0 });
  };

  const handlePageChange = (newPage) => {
    fetchFacilities({ ...filters, page: newPage });
  };

  useEffect(() => {
    fetchFacilities(filters);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pretraga objekata</h1>
      <FacilitySearch onSearch={handleSearch} />
      <FacilityList facilities={facilities} />
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default FacilitySearchPage;