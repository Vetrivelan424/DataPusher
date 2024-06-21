import React, { useState } from 'react';
import { createDestination } from '../api';

const DestinationForm = ({ accountId, onDestinationCreated }) => {
  const [url, setUrl] = useState('');
  const [httpMethod, setHttpMethod] = useState('POST');
  const [headers, setHeaders] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDestination = { accountId, url, httpMethod, headers: JSON.stringify(headers) };
    try {
      const response = await createDestination(newDestination);
      onDestinationCreated(response.data);
      setUrl('');
      setHttpMethod('POST');
      setHeaders('');
    } catch (error) {
      console.error('Failed to create destination:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-gruop mx-4'>
      <h3 className='bolder'>Create Destination</h3>
      <div>
        <label>URL:</label>
        <input className='form-control' type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </div>
      <div>
        <label>HTTP Method:</label>
        <select className='form-control' value={httpMethod} onChange={(e) => setHttpMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
        </select>
      </div>
      <div>
        <label>Headers:</label>
        <textarea className='form-control' placeholder='Please provide a Account ID' value={headers} onChange={(e) => setHeaders(e.target.value)} />
      </div>
      <button className='btn btn-primary px-5 my-3' type="submit">Create</button>
    </form>
  );
};

export default DestinationForm;
