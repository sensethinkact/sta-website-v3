import type {SerializedPost} from '@sta-podcast/types'
import type {PodcastConfig} from '../../podcast.config'

import {listToString} from '../utils'
import endent from 'endent'

export function getTweet(_pod: PodcastConfig, ep: SerializedPost) {
  const guests = listToString(ep.guests || '')
  return endent`
    .@audrow interviews ${guests}, ${ep.excerpt}, on ${ep.title}.

    ${ep.url}
  `
}

export function getLinkedIn(_pod: PodcastConfig, ep: SerializedPost) {
  const guests = listToString(ep.guests || '')
  return endent`
    Audrow Nash interviews ${guests}, ${ep.excerpt}, on ${ep.title}.

    ${ep.url}
  `
}
