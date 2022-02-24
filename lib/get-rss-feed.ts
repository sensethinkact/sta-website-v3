import {Podcast} from 'podcast'
import urlJoin from 'proper-url-join'
import endent from 'endent'

import {toTimestampString} from '@sta-podcast/timestamp-tools'

import type {FeedOptions, ItemOptions} from 'podcast'
import type {PostLoader} from '@sta-podcast/post-loader'
import type {Link, PodcastConfig, Outline} from '@sta-podcast/types'

export type YoutubePost = {
  videoId: string
  title: string
  description: string
  coverArtPath?: string
}

export type WordpressPost = {
  title: string
  postBody: string
  tags: string[]
  coverArtPath?: string
}

export type StaWebsitePost = {
  title: string
  videoId: string
  tags: string[]
  postBody: string
  transcript: string
}

export default function getRssFeed(
  podcastConfig: PodcastConfig,
  postLoader: PostLoader,
) {
  // Validated with
  // https://validator.w3.org/feed/
  // TODO check Spotify and iTunes validators

  const feedOptions: FeedOptions = {
    title: podcastConfig.name,
    description: podcastConfig.description,
    feedUrl: podcastConfig.itunes.feedUrl,
    siteUrl: podcastConfig.siteUrl,
    imageUrl: podcastConfig.itunes.image,
    managingEditor: podcastConfig.owner.email,
    webMaster: podcastConfig.owner.email,
    copyright: podcastConfig.copyright,
    language: podcastConfig.itunes.language,
    categories: podcastConfig.itunes.categories,
    itunesAuthor: podcastConfig.owner.name,
    itunesSubtitle: podcastConfig.tagline,
    itunesSummary: podcastConfig.description,
    itunesOwner: podcastConfig.owner,
    itunesExplicit: podcastConfig.itunes.isExplicit,
    itunesCategory: podcastConfig.itunes.categories.map((category) => ({
      text: category,
    })),
    itunesImage: podcastConfig.itunes.image,
    itunesType: podcastConfig.itunes.type,
  }

  const podcast = new Podcast(feedOptions)

  for (const post of postLoader.getPosts()) {
    const description = getDescriptionWithLinks({
      description: post.description,
      episodeLinks: post.links || [],
      podcastLinks: podcastConfig.links.podcast,
      socialLinks: podcastConfig.links.social,
      outline: post.includes?.outline,
    })
    const itemOptions: ItemOptions = {
      title: post.title,
      description: description,
      url: urlJoin(podcastConfig.siteUrl, 'episodes', post.slug),
      date: post.publishDate as string,
      enclosure: {
        url: post.mp3.url,
        size: post.mp3.sizeBytes,
        type: 'audio/mpeg',
      },
      itunesAuthor: podcastConfig.owner.name,
      itunesExplicit: podcastConfig.itunes.isExplicit,
      itunesSummary: post.description,
      itunesImage: podcastConfig.itunes.image,
      itunesDuration: toTimestampString(post.duration),
    }
    podcast.addItem(itemOptions)
  }
  return podcast
    .buildXml()
    .replace(
      /<itunes:explicit>false<\/itunes:explicit>/g,
      '<itunes:explicit>no</itunes:explicit>',
    )
    .replace(
      /<itunes:explicit>true<\/itunes:explicit>/g,
      '<itunes:explicit>yes</itunes:explicit>',
    )
}

function getDescriptionWithLinks(args: {
  description: string
  episodeLinks: Link[]
  podcastLinks: Link[]
  outline?: Outline
  socialLinks: Link[]
}) {
  let text = endent`
    ${args.description}

    EPISODE LINKS:
    ${getLinksHtml(args.episodeLinks)}

    PODCAST INFO:
    ${getLinksHtml(args.podcastLinks)}
  `
  if (args.outline) {
    const outline = args.outline
      .map((i) => `- (${toTimestampString(i.timeStamp)}) ${i.title}`)
      .join('\n')
    text = endent`
      ${text}

      OUTLINE:
      ${outline}
    `
  }
  text = endent`
    ${text}

    SOCIAL:
    ${getLinksHtml(args.socialLinks)}
    `
  return text
    .replace(/\n/g, '<br/>')
    .replace(/-/g, '&#8211;')
    .replace(/'/g, '&#8217;')
}

function getLinksHtml(links: Link[]) {
  return links
    .map((link) => `- ${link.name}: <a href="${link.url}">${link.url}</a>`)
    .join('\n')
}
