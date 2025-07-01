import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
// import { fill } from '@cloudinary/url-gen/actions/resize';
import '../assets/styles/Play/Play2_modificado.css'

const cld = new Cloudinary({
  cloud: { cloudName: 'dmjynxst6' }
})
const urlBase = 'TripleByte/'
const imageIds = [
    'carta0_iffpnb.png',
    'carta1_uqpgrh.png',
    'carta2_na0im1.png',
    'carta3_mhp9ie.png',
    'carta4_buj4l2.png',
    'carta5_b5xuw4.png',
    'carta6_jim52l.png',
    'carta7_pcdii2.png',
    'carta8_evwup2.png',
    'carta9_odtc3z.png',
    'carta10_otafyp.png',
    'carta11_ufm75o.png',
    'carta12_hnofqd.png',
    'comodin_simple_d492bh.png',
    'comodin_doble_xc0nfb.png',
    'bloqueo_inuy3r.png',
    'acceso_s1hqau.png'
]

function renderImage(cardId, cssClassName) {
    const image = cld.image(urlBase + imageIds[cardId])
    return <AdvancedImage cldImg={image} alt={imageIds[cardId]} className={cssClassName} />
}

export default renderImage