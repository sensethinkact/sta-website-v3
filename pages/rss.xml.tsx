import { GetServerSideProps } from 'next'
import React from 'react'
import { getSortedEpisodeData } from '../lib/episodes'

const RssFeed: React.FC = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    const episodes = getSortedEpisodeData()
    const titles = episodes.map(episode => episode.title).join(', ')

    res.setHeader('Content-Type', 'text/text')
    // res.setHeader('Content-Type', 'text/xml')
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${titles}
    </urlset>`)
    res.end()
  }
  return {
    props: {},
  }
}

export default RssFeed