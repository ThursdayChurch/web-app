import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'
import classnames from 'classnames'
import moment from 'moment'
import { faTimes } from '@fortawesome/fontawesome-pro-light'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { GET_LIVE_STREAM } from './queries'
import { redirectTo } from '../../utils'

  const LiveBanner = () => {
    const [closed, isClosed] = useState(false)

    const { loading, error, data } = useQuery(GET_LIVE_STREAM, {
      fetchPolicy: "cache-and-network",
      pollInterval: 60000
    })

    if (loading || error) return null

    const isLive = get(data, 'liveStream.isLive', false)
    const startTime = moment(get(data, 'liveStream.eventStartTime', null)).format('hh')
    const currentTime = moment().format('hh mm').split(' ').map(Number)

    let almostLive = false

    //checks if service starts in the next 30 min
    if (!isLive) {
      if (startTime - currentTime[0] == 1) {
        if (currentTime[1] > 29){
          almostLive = true
        }
      }
    }

    console.log({ startTime }, { currentTime }, { almostLive })

    return isLive || almostLive ? (
      <div className={classnames(
        'bg-primary',
        `d-${
        closed
          ? 'none'
          : 'flex'
        }`,
        'justify-content-between',
        'align-items-center',
        'px-4'
      )}>
        <div
          className='d-none d-lg-block'
        />
        <a
          href='#'
          onClick={() => redirectTo('https://live.gochristfellowship.com/', true)}
        >
          <h4 className='text-white mb-0'>
            {almostLive
              ? 'We’re almost live! Join here!'
              : 'We’re live! Join now!'}
          </h4>
        </a>
        <div>
          <FontAwesomeIcon
            style={{fontSize:'20px'}}
            className={classnames(
              'cursor-hover',
              'my-2',
            )}
            color='white'
            icon={faTimes}
            onClick={() => isClosed(true)}
          />
        </div>
      </div>
    ) : null
  }

export default LiveBanner