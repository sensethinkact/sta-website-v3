import type {SerializedPost} from '@sta-podcast/types'
import type {PodcastConfig} from '../../podcast.config'

import {checkYoutubeTitle} from './common'
import {listToString} from '../utils'
import endent from 'endent'
import {toTimestampString} from '@sta-podcast/timestamp-tools'
import {getYoutubeUrlFromVideoId} from './common'
import {MAX_TITLE_LENGTH} from '../constants'

export function getYoutubeInterviewDescription(
  pod: PodcastConfig,
  ep: SerializedPost,
) {
  return endent`
    ${ep.description}

    EPISODE LINKS:
    ${ep.links?.map((l) => `- ${l.name}: ${l.url}`).join('\n')}

    PODCAST INFO:
    ${pod.links.podcast.map((l) => `- ${l.name}: ${l.url}`).join('\n')}

    OUTLINE:
    ${ep.includes?.outline
      ?.map((o) => `- (${toTimestampString(o.timeStamp)}) ${o.title}`)
      .join('\n')})}`
}

export function getYoutubeClipTitles(pod: PodcastConfig, ep: SerializedPost) {
  if (!ep.youtube.clips) {
    return []
  }
  const titles: string[] = []
  for (const clipTitle of ep.youtube.clips) {
    titles.push(getClipTitle(pod, ep, clipTitle.title))
  }
  return titles
}

function getClipTitle(
  pod: PodcastConfig,
  ep: SerializedPost,
  clipTitle: string,
) {
  if (typeof ep.guests === 'string') {
    ep.guests = [ep.guests]
  }
  const people = [...(ep.guests as string[]), pod.host]
  const peopleString = listToString(people, 'and')
  const title = `${clipTitle} | ${peopleString}`
  checkYoutubeTitle(title, MAX_TITLE_LENGTH)
  return title
}

export function getYoutubeClipDescription(
  pod: PodcastConfig,
  ep: SerializedPost,
) {
  return endent`
    Sense Think Act Podcast full episode:
    ${getYoutubeUrlFromVideoId(ep.youtube.mainContentId)}

    GUEST BIO:
    ${ep.excerpt}

    PODCAST INFO:
    ${pod.links.podcast.map((l) => `- ${l.name}: ${l.url}`).join('\n')}
  `
}
