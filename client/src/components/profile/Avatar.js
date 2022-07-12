import React, { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from "@mui/material"

export default function Avatar({img}) {

    const userImage = img;

    console.log(img)
    const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', (error) => reject(error))
      image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
      image.src = url
    })

    const getRadianAngle = (degreeValue) => {
        return (degreeValue * Math.PI) / 180
      }

    const rotateSize = (width, height, rotation) => {
        const rotRad = getRadianAngle(rotation)
      
        return {
          width:
            Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
          height:
            Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
        }
      }
      

    const getCroppedImg = async(
        imageSrc,
        pixelCrop,
        rotation = 0,
        flip = { horizontal: false, vertical: false }
        ) => {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
      
        if (!ctx) {
          return null
        }
    
      
        // calculate bounding box of the rotated image
        const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
            image.width,
            image.height,
            rotation
        )
      
        // set canvas size to match the bounding box
        canvas.width = bBoxWidth
        canvas.height = bBoxHeight
      
        // translate canvas context to a central location to allow rotating and flipping around the center
        ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
        ctx.translate(-image.width / 2, -image.height / 2)
      
        // draw rotated image
        ctx.drawImage(image, 0, 0)
      
        // croppedAreaPixels values are bounding box relative
        // extract the cropped image using these values
        const data = ctx.getImageData(
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height
        )
      
        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height
      
        // paste generated rotate image at the top left corner
        ctx.putImageData(data, 0, 0)

      
        // As a blob

        return new Promise((resolve, reject) => {
          canvas.toBlob((file) => {
            resolve(URL.createObjectURL(file))
          }, 'image/jpeg')

          
          
        })
    }

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        try {
        const croppedImage = await getCroppedImg(
            userImage,
            croppedAreaPixels,
            rotation
        )
        console.log('donee', { croppedImage })
        setCroppedImage(croppedImage)
            document.getElementById('img').src = croppedImage
            var file = new File([croppedImage], 'testFinal.png', Blob); // Final File to uplaod

        } catch (e) {
        console.error(e)
        }
    }, [croppedAreaPixels, rotation])

    return (
        <div>
            <div className='crop-container'>
                <Cropper
                    image={userImage}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={1/1}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    />
            </div>
            <Slider 
                    value={zoom}
                    onChange={(e, newValue) => setZoom(newValue)}
                    min={1}
                    max={3}
                    step={0.00001}
                    valueLabelDisplay="on"
                />

            <p onClick={() => showCroppedImage()}>crop</p>

            <img src="" alt=""  id="img"/>
        </div>
    )
}
