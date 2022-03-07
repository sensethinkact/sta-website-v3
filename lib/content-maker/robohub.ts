import type {SerializedPost} from '@sta-podcast/types'
import endent from 'endent'
import type {PodcastConfig} from '../../podcast.config'
import {getYoutubeUrlFromVideoId} from './common'

function getRobohubPost(pod: PodcastConfig, ep: SerializedPost) {
  return endent`
    ${ep.description}

    <!--more-->

    ${getYoutubeUrlFromVideoId(ep.youtube.mainContentId)}

    <strong>Episode Links</strong>
    <ul>
      <li><a href="${
        ep.mp3.url
      }" target="_blank" rel="noopener">Download the episode </a></li>
      ${ep.links
        ?.map(
          (l) =>
            `<li><a href="${l.url}" target="_blank" rel="noopener">${l.name}</a></li>`,
        )
        .join('\n')}
    </ul>
    <strong>Podcast info</strong>
    <ul>
    ${pod.links.podcast
      .map(
        (l) =>
          `  <li><a href="${l.url}" target="_blank" rel="noopener">${l.name}</a></li>`,
      )
      .join('\n')}
    </ul>
  `
}

export default getRobohubPost
