import React from 'react';
import { deleteDestination } from '../api';

const DestinationList = ({ accountId, destinations, onDestinationDeleted }) => {
  const handleDelete = async (id) => {
    try {
      await deleteDestination(id);
      onDestinationDeleted(id);
    } catch (error) {
      console.error('Failed to delete destination:', error);
    }
  };

  return (
    <div className='card p-4 mx-5'>
      <h5>Destinations for Account ID: {accountId}</h5>
      <ul>
        {destinations.map((destination) => (
          <li key={destination.id}>
            {destination.url} ({destination.httpMethod})
            <button className='btn-danger btn px-4 m-3' onClick={() => handleDelete(destination.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DestinationList;
