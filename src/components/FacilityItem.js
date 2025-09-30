import React from 'react';

function FacilityItem({ facility }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
      <h3>{facility.name}</h3>
      <p>{facility.description}</p>
      <p>Grad: {facility.city}</p>
      <p>Discipline: {facility.disciplines.join(', ')}</p>
      <p>Broj recenzija: {facility.review_count}</p>
      <p>Prosečna ocena: {facility.avg_equipment_grade}</p>
    </div>
  );
}

export default FacilityItem;