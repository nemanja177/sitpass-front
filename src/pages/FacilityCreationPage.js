// import React, { useState } from 'react';

// const FacilityForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     city: '',
//     address: '',
//     description: '',
//     disciplines: [],
//   });

//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [uploadedPdf, setUploadedPdf] = useState(null);

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDisciplinesChange = (e) => {
//     const value = e.target.value;
//     const arr = value.split(',').map((d) => d.trim()).filter((d) => d.length > 0);
//     setFormData((prev) => ({ ...prev, disciplines: arr }));
//   };

//   const handleFileUpload = async (files, type) => {
//     setError(null);
//     if (files.length === 0) return;

//     const data = new FormData();

//     if (type === 'images') {
//       files.forEach((file) => data.append('images', file));
//       try {
//         const response = await fetch('/api/files/upload/images', {
//           method: 'POST',
//           body: data,
//         });
//         if (!response.ok) throw new Error('Failed to upload images');
//         const imagesData = await response.json();
//         setUploadedImages((prev) => [...prev, ...imagesData]); // imagesData: [{fileName, originalName, url...}]
//       } catch (err) {
//         setError(err.message);
//       }
//     } else if (type === 'pdf') {
//       data.append('pdf', files[0]);
//       try {
//         const response = await fetch('/api/files/upload/pdf', {
//           method: 'POST',
//           body: data,
//         });
//         if (!response.ok) throw new Error('Failed to upload PDF');
//         const pdfData = await response.json();
//         setUploadedPdf(pdfData); // pdfData: {fileName, originalName, url...}
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);
//     setLoading(true);

//     if (!formData.name || !formData.city || formData.disciplines.length === 0) {
//       setError('Name, City, and at least one Discipline are required');
//       setLoading(false);
//       return;
//     }

//     const facilityData = {
//       name: formData.name,
//       city: formData.city,
//       address: formData.address,
//       description: formData.description,
//       disciplines: formData.disciplines,
//       imageFileNames: uploadedImages.map((img) => img.fileName),
//       pdfFileName: uploadedPdf?.fileName || null,
//       pdfText: '', 
//     };

//     try {
//       const response = await fetch('/api/facilities', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(facilityData),
//       });
//       if (!response.ok) {
//         const errorResp = await response.json();
//         throw new Error(errorResp.message || 'Error creating facility');
//       }

//       setSuccess('Facility created successfully!');
//       setFormData({ name: '', city: '', address: '', description: '', disciplines: [] });
//       setUploadedImages([]);
//       setUploadedPdf(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Create New Facility</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name (required): </label>
//           <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>City (required): </label>
//           <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>Address: </label>
//           <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
//         </div>
//         <div>
//           <label>Description: </label>
//           <textarea name="description" value={formData.description} onChange={handleInputChange} />
//         </div>
//         <div>
//           <label>Disciplines (comma separated, at least one required): </label>
//           <input type="text" value={formData.disciplines.join(', ')} onChange={handleDisciplinesChange} required />
//         </div>
//         <div>
//           <label>Upload Images (multiple): </label>
//           <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(Array.from(e.target.files), 'images')} />
//           {uploadedImages.length > 0 && (
//             <ul>
//               {uploadedImages.map((img) => (
//                 <li key={img.fileName}>{img.originalName}</li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <div>
//           <label>Upload PDF Document: </label>
//           <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(Array.from(e.target.files), 'pdf')} />
//           {uploadedPdf && <p>Uploaded PDF: {uploadedPdf.originalName}</p>}
//         </div>
//         <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Create Facility'}</button>
//       </form>
//     </div>
//   );
// };

// export default FacilityForm;

import React, { useState } from 'react';

const FacilityForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    description: '',
    disciplines: [],
  });

  const [images, setImages] = useState([]);
  const [pdf, setPdf] = useState(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDisciplinesChange = (e) => {
    const value = e.target.value;
    const arr = value.split(',').map((d) => d.trim()).filter((d) => d.length > 0);
    setFormData((prev) => ({ ...prev, disciplines: arr }));
  };

  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!formData.name || !formData.city || formData.disciplines.length === 0) {
      setError('Name, City, and at least one Discipline are required');
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('city', formData.city);
      if (formData.address) data.append('address', formData.address);
      if (formData.description) data.append('description', formData.description);
      formData.disciplines.forEach(d => data.append('disciplines', d));
      images.forEach(image => data.append('images', image));
      if (pdf) data.append('pdf', pdf);

      const response = await fetch('/api/facilities', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        let errorMessage = 'Error creating facility';
        try {
          const errorJson = await response.json();
          errorMessage = errorJson.message || JSON.stringify(errorJson);
        } catch {
          const text = await response.text();
          if (text) errorMessage = text;
        }
        throw new Error(errorMessage);
      }

      // Sigurno čitanje tela odgovora
      const text = await response.text();
      if (text) {
        try {
          JSON.parse(text);
          // Ovdje možete raditi sa JSON odgovorom ako treba
        } catch {
          // Odgovor nije validan JSON, nastavi bez problema
        }
      }

      setSuccess('Facility created successfully!');
      setFormData({ name: '', city: '', address: '', description: '', disciplines: [] });
      setImages([]);
      setPdf(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Facility</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name (required): </label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>City (required): </label>
          <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Address: </label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
        </div>
        <div>
          <label>Description: </label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        <div>
          <label>Disciplines (comma separated, at least one required): </label>
          <input
            type="text"
            value={formData.disciplines.join(', ')}
            onChange={handleDisciplinesChange}
            required
          />
        </div>
        <div>
          <label>Upload Images (multiple): </label>
          <input type="file" multiple accept="image/*" onChange={handleImagesChange} />
          {images.length > 0 && (
            <ul>
              {images.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label>Upload PDF Document: </label>
          <input type="file" accept="application/pdf" onChange={handlePdfChange} />
          {pdf && <p>Selected PDF: {pdf.name}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Create Facility'}
        </button>
      </form>
    </div>
  );
};

export default FacilityForm;