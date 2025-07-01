// src/views/Play/Play3.jsx
import React from 'react'
import '../../assets/styles/Play/Play3.css'
import useImage from '../../image_logic/cloudinary_config'


const Play = () => (
  <div className="play-container">
    {/* ... tu layout ... */}

    {/* 3. Renderiza con <AdvancedImage> */}
    {useImage('TripleByte/ChatGPT_Image_27_jun_2025_05_43_36_p.m._tqu5mb.png', 60, 84)}

    {/* ... resto de tu layout ... */}
  </div>
)

export default Play
