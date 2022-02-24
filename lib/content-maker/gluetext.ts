import type {SerializedPost} from '@sta-podcast/types'
import type {PodcastConfig} from '../../podcast.config'

import {listToString} from '../utils'
import endent from 'endent'

function getGluetext(pod: PodcastConfig, ep: SerializedPost) {
  const guests = listToString(ep.guests || '')
  return endent`
    # ${ep.number} - ${ep.title}

    ## Intro

    This is a conversation with ${guests}, who is ${ep.excerpt}
    CONTEXT

    In this interview, ${guests} and I talk about

    ${ep.description}

    This is the ${pod.name} - I'm ${pod.host}

    Thank you to our founding Sponsor, Open Robotics

    And now here's my conversation with ${guests}

    ## Outro

    Thank you for listening to this conversation with ${guests}

    Thank you to our founding Sponsor, Open Robotics

    See you next time!
  `
}

export default getGluetext
