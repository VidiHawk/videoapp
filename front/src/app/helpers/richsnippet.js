import React from 'react'
import { Helmet } from 'react-helmet-async'
import config from '../../config'

export const VideoJSONLD = React.memo(function VideoJSONLD(props) {
  const video = props.video

  if (video && video.name) {
    let rich_snippet = `{
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "${video.name}",
      "description": "${video.name}",
      "thumbnailUrl": [
        "${config.IMG_END_POINT}${video.thumbnail}"
       ],
      "uploadDate": "${video.createTime}",
      "duration": "PT1M54S",
      "contentUrl": "${config.VIDEO_ENDPOINT}LiveApp/streams/${video.id}.mp4",
      "embedUrl": "${config.BASE_URL}/product-view/2",
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": { "@type": "http://schema.org/LikeAction" },
        "userInteractionCount": ${video.like}
      }
    }`

    return (
      <Helmet
        script={[
          {
            type: 'application/ld+json',
            innerHTML: rich_snippet,
          },
        ]}
      />
    )
  } else return null
})

export const LiveVideoJSONLD = React.memo(function LiveVideoJSONLD() {
  let rich_snippet = `{
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "contentURL": "https://example.com/bald-eagle-at-the-park.mp4",
    "description": "Bald eagle at the park livestream.",
    "duration": "PT37M14S",
    "embedUrl": "https://example.com/bald-eagle-at-the-park",
    "expires": "2018-10-30T14:37:14+00:00",
    "regionsAllowed": "US",
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "http://schema.org/WatchAction" },
      "userInteractionCount": 4756
    },
    "name": "Bald eagle nest livestream!",
    "thumbnailUrl": "https://example.com/bald-eagle-at-the-park",
    "uploadDate": "2018-10-27T14:00:00+00:00",
    "publication": [
      {
        "@type": "BroadcastEvent",
        "isLiveBroadcast": true,
        "startDate": "2018-10-27T14:00:00+00:00",
        "endDate": "2018-10-27T14:37:14+00:00"
      },
      {
        "@type": "BroadcastEvent",
        "isLiveBroadcast": true,
        "startDate": "2018-10-27T18:00:00+00:00",
        "endDate": "2018-10-27T18:37:14+00:00"
      }
    ]
  }`

  return (
    <Helmet
      script={[
        {
          type: 'application/ld+json',
          innerHTML: rich_snippet,
        },
      ]}
    />
  )
})

// const formatDescription = (description) => {
//   description = description.replace(/<script(.*?)(.*?)[^>]*>(.*?)<\s*\/\s*script>/gm, '')
//   description = stripTags(description)
//   description = description.replace(/"/g, '\\"')
//   return description
// }
