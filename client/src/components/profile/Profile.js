import React, { useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux';
import Avatar from './Avatar'

export default function Profile() {

    const [image, setImage] = useState();
    const [change, setChange] = useState(false)

    const userData = useSelector(state => state.userReducers);

    const handleImage = (event) => {
      setImage(URL.createObjectURL(event.target.files[0]));
      setChange(true);
    }

    

  return (
    <div>
        {!change ? (
            <>
              <label htmlFor="image">
              <img src={process.env.PUBLIC_URL + userData.userPic} alt="picture" />
              </label>
              <input type="file" name="image" id="image" onChange={(event) => handleImage(event)} />
            </>
        ) : (
            <Avatar img={image} userData={userData} />
        )}

    </div>
  )
}
