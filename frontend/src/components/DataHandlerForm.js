import React, { useState } from 'react';
import { sendData } from '../api';

const DataHandlerForm = ({ onResponseData }) => {
  const [token, setToken] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(data);
      const response = await sendData(parsedData, token);
      onResponseData(response.data);
      // showToast('success',"Data Sented successfully")
      setToken('');
      setData('');
    } catch (error) {
      console.error('Failed to send data:', error);
      onResponseData('Failed to send data');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-gruop m-4'>
      <h3>Send Data</h3>
      <div>
        <label>App Secret Token:</label>
        <input className='form-control' type="text" value={token} onChange={(e) => setToken(e.target.value)} required />
      </div>
      <div>
        <label>Data (JSON):</label>
        <textarea className='form-control' value={data} onChange={(e) => setData(e.target.value)} required />
      </div>
      <button className='btn btn-success px-5 my-3' type="submit">Send</button>
    </form>
  );
};

export default DataHandlerForm;
