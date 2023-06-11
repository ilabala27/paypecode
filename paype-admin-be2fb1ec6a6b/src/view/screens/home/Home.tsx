import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useSystemStore } from '../../../modal/redux/system/system.hooks';

export function Home() {
  const { t } = useTranslation();
  const { SYSTEM_STORE, LOGIN, LOGOUT } = useSystemStore()
  const { user } = SYSTEM_STORE
  

  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <h2>{t('Welcome')}</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
      <p>Name {user?.name}</p>
      <p onClick={()=>LOGIN({ name: "Arun", mobile: 9578551126 })}>Login</p>
      <p onClick={()=>LOGOUT()}>Logout</p>
    </>
  );
}