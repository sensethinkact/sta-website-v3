import YAML from 'yaml'
import fs from 'fs'
import path from 'path'

import type EpisodeYamlData from '../types/EpisodeYamlData'
import type EpisodeData from '../types/EpisodeData'

const episodesDirectory = path.join(process.cwd(), 'episodes')

// TODO leverage example from
// https://github.com/vercel/next-learn/blob/master/basics/typescript-final/lib/posts.ts

export function getSortedEpisodeData(): EpisodeData[] {
  const episodes = fs.readdirSync(episodesDirectory)
  const episodeData: EpisodeData[] = episodes.map(episode => {
    const episodePath = path.join(episodesDirectory, episode, 'info.yaml')
    const episodeYaml = fs.readFileSync(episodePath, 'utf8')
    const episodeYamlData = YAML.parse(episodeYaml) as EpisodeYamlData

    const episodeNumber = Number(episodePath.split('/').slice(-2)[0])
    const slug = `${episodeNumber}-${episodeYamlData.guests.map(g =>
      g.toLowerCase())
      .join()
      .replace(/\s/g, '-')}`

    return {
      ...episodeYamlData,
      number: episodeNumber,
      path: episodePath,
      slug,
    }
  })
  return episodeData.sort(sortEpisodesByDate)
}

function sortEpisodesByDate({ publicationDate: a }: EpisodeYamlData, { publicationDate: b }: EpisodeYamlData) {
  return a > b ? -1 : 1
}
