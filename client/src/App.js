import { useEffect, useState } from 'react';
import Routes from './components/Routes';
import './styles/index.scss';
import {useDispatch} from "react-redux";
import axios from 'axios';
import { getUser } from './actions/user.actions';
import { UIdContext } from './components/App.context';


function App() {

  const [UId, setUId] = useState(null);
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchToken = async() => {
        await axios({
          method: 'get',
          withCredentials: true,
          url: `${process.env.REACT_APP_API_URL}/jwtid`
        }).then((res) => {
          setUId(res.data);
        }).catch((err) => {
          console.log(err);
        })
    }
    fetchToken();

    if (UId) {
      dispatch(getUser(UId));
    } 
  }, [UId, dispatch]);


  return (
    <div className="App">
      <UIdContext.Provider value={UId}>
        <Routes />
      </UIdContext.Provider>
    </div>
  );
}

export default App;
