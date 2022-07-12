import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import { UIdContext } from './App.context';

import MainFeed from './MainFeed';
import Loading from './Modules/Loading'
import Login from './Auth/Login';

export default function Home() {

  const uid = useContext(UIdContext);
  const userData = useSelector(state => state.userReducer);

  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (!isEmpty(uid) && !isEmpty(userData)) { 
      setIsLogged(true);
      setIsLoading(false);
    } else {
      setIsLogged(false);
      setIsLoading(false)
    }
  }, [uid, userData])

  return (
    <>
      {isLoading ? (
          <Loading />
        ) : (
          <>
            {isLogged ? (
              <MainFeed />
            ) : (
              <Login />
            )}
        </>
      )}
    </>
  )
}
