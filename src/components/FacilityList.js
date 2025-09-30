import React from 'react';
import FacilityItem from './FacilityItem';

function FacilityList({ facilities }) {
  if (!facilities.length) return <p>Nema rezultata za prikaz.</p>;

  return (
    <>
      {facilities.map(f => (
        <FacilityItem key={f.id} facility={f} />
      ))}
    </>
  );
}

export default FacilityList;