import React from 'react'
import { Helmet } from 'react-helmet-async'
import { createUrl } from './helpers'
import config from './../../config'

const Metadata = (props) => {

  if (typeof props.seo !== 'undefined' && typeof props.seo !== 'undefined') {
    let seodata = props.seo
    let seometa = []
    let linkUrl = []

    if (typeof seodata !== 'undefined') {
      const title = seometa.title ? seometa.title : config.DEFAULT_METADATA.TITLE
      const keywords = seodata.keywords ? seodata.keywords  : config.DEFAULT_METADATA.KEYWORDS
      const description = seodata.description ? seodata.description : config.DEFAULT_METADATA.DESCRIPTION
      const socialTitle = seodata.social_title ? seodata.social_title : config.DEFAULT_METADATA.SOCIAL_TITLE
      const socialDescription = seodata.og_description ? seodata.og_description  : config.DEFAULT_METADATA.OG_DESCRIPTION
      const ogImage = seodata.og_image ? seodata.og_image  : config.DEFAULT_METADATA.OG_IMAGE

      seometa.push(<meta name="keywords" content={keywords} key={0} />)
      seometa.push(<meta name="description" content={description} key={1} />)
      seometa.push(<meta property="og:title" content={socialTitle} key={2} />)
      seometa.push(<meta property="twitter:title" content={socialTitle} key={3} />)
      seometa.push(<meta property="og:description" content={socialDescription} key={4} />)
      seometa.push(<meta property="twitter:description" content={socialDescription} key={5} />)
      seometa.push(<meta property="og:image" content={ogImage} key={6} />)
      seometa.push(<meta property="twitter:image" content={ogImage} key={7} />)

      if (seodata.media && seodata.media.media_metadata) {
        if (seodata.media.media_metadata.width)
          seometa.push(<meta property="og:image:width" content={seodata.media.media_metadata.width} key={8} />)
        if (seodata.media.media_metadata.height)
          seometa.push(<meta property="og:image:height" content={seodata.media.media_metadata.height} key={9} />)
      }

      if (seodata.time_data) {
        if (seodata.time_data.publish_date)
          seometa.push(<meta property="article:published_time" content={seodata.time_data.publish_date} key={10} />)

        if (seodata.time_data.modified_date)
          seometa.push(<meta property="article:modified_time" content={seodata.time_data.modified_date} key={11} />)
      }
      if (typeof seodata.canonical !== 'undefined' && seodata.canonical != '') {
        linkUrl.push(<link rel="canonical" href={createUrl(seodata.canonical)} key={0} />)
      }
      if (typeof seodata.slug !== 'undefined' && seodata.slug != '') {
        seometa.push(<meta property="og:url" content={createUrl(seodata.slug)} key={12} />)
        //linkUrl.push(<link rel="alternate" href={createUrl(seodata.slug, 'canonical')} hreflang={"en-"+seodata.locale.locale_label} key={1}/>);
      }

      if (typeof seodata.is_amp !== 'undefined' && seodata.is_amp == 1) {
        linkUrl.push(<link rel="amphtml" href={createUrl(getAMPURL(seodata.slug, seodata.locale))} key={13} />)
      }

      if (typeof seodata.alternate !== 'undefined') {
        linkUrl.push(<link rel="alternate" href={createUrl(seodata.alternate)} key={14} />)
      }

      if (typeof seodata.robots !== 'undefined') {
        seometa.push(<meta name="robots" content={seodata.robots} key={15} />)
      }

      if (typeof seodata.preconnect !== 'undefined') {
        for (let index = 0; index < seodata.preconnect.length; index++) {
          linkUrl.push(<link rel="preconnect" href={seodata.preconnect[index]} key={15 + index} />)
        }
      }

      return (
	<Helmet>
		<title>{title}</title>
		{seometa}
		{linkUrl}
	</Helmet>
      )
    } else {
      return null
    }
  }
  return null
}
export default Metadata
