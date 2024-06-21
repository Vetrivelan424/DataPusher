import React, { useState } from 'react';
import { createAccount } from '../api';
import { showToast } from '../utils/ToastNotification';
const AccountForm = ({ onAccountCreated }) => {
  const [email, setEmail] = useState('');
  const [accountName, setAccountName] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAccount = { email, accountName, website };
    try {
      const response = await createAccount(newAccount);
      onAccountCreated(response.data);
      showToast('success',"Account Created successfully")
      setEmail('');
      setAccountName('');
      setWebsite('');
    } catch (error) {
      showToast('error', error)
      console.error('Failed to create account:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 form-group'>
      <h3>Create Account</h3>
      <div>
        <label>Email:</label>
        <input className='form-control' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Account Name:</label>
        <input className='form-control' type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} required />
      </div>
      <div>
        <label>Website:</label>
        <input className='form-control' type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <button type="submit" className='mt-2 btn px-5 btn-primary'>Create</button>
    </form>
  );
};

export default AccountForm;
