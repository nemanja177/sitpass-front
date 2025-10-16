import React from 'react';

function FacilityItem({ facility }) {
  const handleDownloadPdf = () => {
    window.open(`http://localhost:8080/api/facilities/download/pdf/${facility.id}`, '_blank');
  };

  const hasPdf =
    facility &&
    facility.pdfFileName;
  console.log("FACILITY: " + JSON.stringify(facility));
  return (
    <div style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
      <h3>{facility.name}</h3>
      <p>{facility.description || 'Nema opisa'}</p>
      <p>Grad: {facility.city}</p>
      <p>
        Discipline:{' '}
        {facility.disciplines && facility.disciplines.length > 0
          ? facility.disciplines.join(', ')
          : 'Nema disciplina'}
      </p>
      <p>Broj recenzija: {facility.reviewCount || 0}</p>

      <div>
        <strong>Prosečne ocene:</strong>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>
            Oprema:{' '}
            {facility.avgEquipmentGrade !== undefined
              ? facility.avgEquipmentGrade.toFixed(2)
              : 'N/A'}
          </li>
          <li>
            Osoblje:{' '}
            {facility.avgStaffGrade !== undefined
              ? facility.avgStaffGrade.toFixed(2)
              : 'N/A'}
          </li>
          <li>
            Higijena:{' '}
            {facility.avgHygieneGrade !== undefined
              ? facility.avgHygieneGrade.toFixed(2)
              : 'N/A'}
          </li>
          <li>
            Prostor:{' '}
            {facility.avgSpaceGrade !== undefined
              ? facility.avgSpaceGrade.toFixed(2)
              : 'N/A'}
          </li>
        </ul>
      </div>

      <div style={{ marginTop: '10px' }}>
        <strong>Opis objekta (PDF): </strong>
        {hasPdf ? (
          <button onClick={handleDownloadPdf}>Preuzmi PDF opis</button>
        ) : (
          <span style={{ color: 'gray' }}>Nema dostupnog PDF-a</span>
        )}
      </div>
    </div>
  );
}

export default FacilityItem;
