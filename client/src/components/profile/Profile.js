import React, { useEffect, useState } from 'react'
import { isEmpty } from '../../Utils';
import Avatar from './Avatar'

export default function Profile() {

    const [image, setImage] = useState();
    const [change, setChange] = useState(false)

    const handleImage = (event) => {
      setImage(URL.createObjectURL(event.target.files[0]));
      setChange(true);
    }

    

  return (
    <div>
        {!change ? (
            <input type="file" name="image" id="image" onChange={(event) => handleImage(event)} />
        ) : (
            <Avatar img={image} />
        )}

    </div>
  )
}
