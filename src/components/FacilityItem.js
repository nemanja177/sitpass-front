import React from 'react';

function FacilityItem({ facility }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
      <h3>{facility.name}</h3>
      <p>{facility.description}</p>
      <p>Grad: {facility.city}</p>
      <p>Discipline: {facility.disciplines && facility.disciplines.length > 0 ? facility.disciplines.join(', ') : 'Nema disciplina'}</p>
      <p>Broj recenzija: {facility.reviewCount}</p>

      <div>
        <strong>Prosečne ocene:</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>Oprema: {facility.avgEquipmentGrade !== undefined ? facility.avgEquipmentGrade.toFixed(2) : 'N/A'}</li>
          <li>Osoblje: {facility.avgStaffGrade !== undefined ? facility.avgStaffGrade.toFixed(2) : 'N/A'}</li>
          <li>Higijena: {facility.avgHygieneGrade !== undefined ? facility.avgHygieneGrade.toFixed(2) : 'N/A'}</li>
          <li>Prostor: {facility.avgSpaceGrade !== undefined ? facility.avgSpaceGrade.toFixed(2) : 'N/A'}</li>
        </ul>
      </div>
    </div>
  );
}

export default FacilityItem;