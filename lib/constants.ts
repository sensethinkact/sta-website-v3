import { join } from 'path'
import type PodcastConfig from '../types/PodcastConfig'

const siteUrl = 'https://sensethinkact.com/'
const feedFile = 'itunes.xml';
const feedUrl = join(siteUrl, feedFile);

const podcastConfig: PodcastConfig = {
  title: 'Sense Think Act Podcast',
  subtitle: 'Accessible Robotics interviews',
  description: 'An accessible, long-form podcast about all areas of robotics that is hosted by Audrow Nash and sponsored by Open Robotics.',
  copyright: `© ${new Date().getFullYear()} Open Source Robotics Foundation`,
  owner: {
    name: 'Open Robotics',
    email: 'sensethinkact@googlegroups.com',
  },
  github: {
    organization: 'sensethinkact', // Usually your GitHub org/user name.
    repository: 'www.sensethinkact.com', // Usually your repo name.
  },
  itunes: {
    feedFile,
    feedUrl,
    categories: ['Technology'],
    isExplicit: false,
    type: 'episodic',
    image: 'https://www.sensethinkact.com/assets/img/cover.jpg',
    language: 'en-us',
  },
  siteUrl,
  links: {
    podcast: [
      {
        name: 'Podcast website',
        url: siteUrl,
      },
      {
        name: 'Apple Podcasts',
        url: 'https://podcasts.apple.com/us/podcast/sense-think-act/id1582090036',
      },
      {
        name: 'Spotify',
        url: 'https://open.spotify.com/show/52wK4oMDvgijRk6E82tC5d',
      },
      {
        name: 'RSS',
        url: feedUrl,
      },
      {
        name: 'Full episodes',
        url: 'https://www.youtube.com/c/SenseThinkActPodcast',
      },
      {
        name: 'Clips',
        url: 'https://www.youtube.com/channel/UChfnCpNwZzYtZ32J-pZvNDg',
      },
    ],
    social: [
      {
        name: 'Twitter',
        url: 'https://twitter.com/sense_think_act',
      },
      {
        name: 'Discourse',
        url: 'https://discourse.ros.org/c/sensethinkact/71',
      },
    ],
  }
}

export default podcastConfig