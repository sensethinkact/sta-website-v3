import {listToString} from '../utils'
import type {SerializedPost} from '@sta-podcast/types'
import type {PodcastConfig} from '../../podcast.config'

export function checkYoutubeTitle(title: string, maxLength: number) {
  if (title.length > maxLength) {
    throw new Error(
      `Title is too long: ${title.length} > ${maxLength} - ${title}`,
    )
  }
}

export function getTitle(pod: PodcastConfig, ep: SerializedPost) {
  const interviewees = listToString(ep.guests || '')
  const title = `${interviewees}: ${ep.title} | ${pod.name} #${ep.number}`
  return title
}

export function getIntervieweesString(ep: SerializedPost, andStr = '&') {
  return listToString(ep.guests || '', andStr)
}

export function getYouTubeVideoCodeFromUrl(url: string) {
  return url.split('/').pop()
}

export function getYoutubeUrlFromVideoId(id: string) {
  return `https://www.youtube.com/watch?v=${id}`
}
