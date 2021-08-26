import React from 'react'
import Head from 'frontend-head'

const HOST_URL = 'https://shogun-starter-kit-mvp.frontend.getshogun.com'
const LOGO_IMAGE_URL = 'https://f.shgcdn.com/4f1c2c48-c495-40f7-830b-ccaa81ddf204/'

const GeneralStructuredData = () => (
  <Head>
    <script type="application/ld+json">{`
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "${HOST_URL}",
        "logo": "${LOGO_IMAGE_URL}"
      }
    `}</script>
  </Head>
)

export default GeneralStructuredData
