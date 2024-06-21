import React, { useEffect, useState } from 'react';
import { fetchAccounts, fetchDestinations } from './api';
import AccountForm from './components/AccountForm';
import AccountList from './components/AccountList';
import DestinationForm from './components/DestinationForm';
import DestinationList from './components/DestinationList';
import DataHandlerForm from './components/DataHandlerForm';
import Header from './components/Header';
import ToastNotification from './utils/ToastNotification';
const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [responseData, setResponseData] = useState('');

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const response = await fetchAccounts();
      setAccounts(response.data);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    }
  };

  const loadDestinations = async (accountId) => {
    try {
      const response = await fetchDestinations(accountId);
      setDestinations(response.data);
      setSelectedAccountId(accountId);
    } catch (error) {
      console.error('Failed to fetch destinations:', error);
    }
  };

  const handleAccountCreated = (account) => {
    setAccounts([...accounts, account]);
  };

  const handleAccountDeleted = (accountId) => {
    setAccounts(accounts.filter((account) => account.accountId !== accountId));
    if (selectedAccountId === accountId) {
      setDestinations([]);
      setSelectedAccountId(null);
    }
  };

  const handleDestinationCreated = (destination) => {
    if (destination.accountId === selectedAccountId) {
      setDestinations([...destinations, destination]);
    }
  };

  const handleDestinationDeleted = (id) => {
    setDestinations(destinations.filter((destination) => destination.id !== id));
  };

  const handleResponseData = (data) => {
    setResponseData(data);
  };

  return (
    <div className="container-flui">
       <ToastNotification />
      <Header />
      <div className="d-flex ">
        <div className="column left-column">
          <h2 className='text-center'>Create New Entries</h2>
          <AccountForm onAccountCreated={handleAccountCreated} />
          {selectedAccountId && (
            <>
              <DestinationForm accountId={selectedAccountId} onDestinationCreated={handleDestinationCreated} />
            </>
          )}
          <DataHandlerForm onResponseData={handleResponseData} />
        </div>
        <div className="column right-column">
          <h2 className='text-center'>Existing Data</h2>
          <AccountList
            accounts={accounts}
            onAccountDeleted={handleAccountDeleted}
            loadDestinations={loadDestinations}
          />
          {selectedAccountId && (
            <DestinationList
              accountId={selectedAccountId}
              destinations={destinations}
              onDestinationDeleted={handleDestinationDeleted}
            />
          )}
          {responseData && (
            <div>
              <h2>Response Data</h2>
              <pre>{JSON.stringify(responseData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
