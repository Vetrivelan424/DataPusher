import React from 'react';
import { deleteAccount } from '../api';

const AccountList = ({ accounts, onAccountDeleted, loadDestinations }) => {
  const handleDelete = async (accountId) => {
    try {
      await deleteAccount(accountId);
      onAccountDeleted(accountId);
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  return (
    <div>
      <h3>Accounts</h3>
      <div className='d-flex flex-wrap col-12 position-relative w-75'> 
        {accounts.map((account) => (
          <div key={account.accountId} className='card-fluid  col-12'>
            <div className='col-8' style={{lineHeight:'34px',}}>
            <span style={{letterSpacing:'04.px'}} className='text-center'> <b>{account.accountName} </b></span>
            <br/>
            <span> <b>Email  :</b>{account.email} </span><br/>
            <span className=''><b>App Secret Token</b> <br/></span>
            <input className='form-control' value={account.appSecretToken} type="text" />

            </div>
          <div>
            <button className='btn btn-primary m-2' onClick={() => loadDestinations(account.accountId)}>View Destinations</button>
            <button className='btn btn-danger m-2' onClick={() => handleDelete(account.accountId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountList;
