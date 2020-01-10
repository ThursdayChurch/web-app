import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  get,
  find,
  flatMapDepth,
  identity,
  uniq,
  groupBy,
  keys,
} from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faClock,
  faAngleDown
} from "@fortawesome/fontawesome-pro-regular"
import {
  Dropdown,
  DropdownButton,
} from 'react-bootstrap'
import moment from 'moment'

import {
  Button,
  Card,
} from '../ui'
import Icon from './eventIcon'

import { useAuth } from '../auth'
import { CAMPUS_KEY } from '../keys'
import { getDirectionsUrl } from '../utils'
import { GET_EVENT_SCHEDULES } from './queries'

const row = classnames(
  'row',
  'my-4'
)

const EventTimes = ({ date, times, className }) => {
  const mDate = moment(date)
  const currentUtcOffset = moment().format('ZZ')

  return (
    <div
      className={classnames(
        'd-flex',
        'flex-column',
        className,
      )}
    >
      <div className="">
        <h3>
          <Icon
            icon={faCalendarAlt}
            className="mr-2"
          />
          {mDate.format('ddd MMM D')}
        </h3>
      </div>
      {times
        .sort((a, b) => moment(a.start).diff(moment(b.start)))
        .map(t => {
          const utc = moment.utc(t.start)
          const local = moment(utc).utcOffset(currentUtcOffset)

          return <div
            key={`${date}:${t}`}
            className=''
          >
            <h4
              className='font-weight-normal'
            >
              <Icon
                icon={faClock}
                className="mr-2"
              />
              {local.format('LT')}
            </h4>
          </div>
        }
        )}
    </div>
  )
}

const CampusSelectToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    className="w-100"
    style={{
      verticalAlign: 'middle',
      cursor: 'pointer'
    }}
    ref={ref}
    onClick={e => {
      e.preventDefault()
      onClick(e)
    }}
  >
    <span className="h4">
      {children}
      <span
        className="ml-2 float-right"
        style={{ fontSize: 22 }}
      >
        <FontAwesomeIcon
          icon={faAngleDown}
        />
      </span>
    </span>
  </div >
))

const CampusSelection = ({ campuses, onChange, defaultCampus }) => {
  const id = 'event-campus-selection'
  const selectLocation = 'Select Location'
  const options = [selectLocation, ...campuses]
  const [selected, setSelected] = useState(defaultCampus || options[0])

  // when the selection changes, call the onChange method
  useEffect(() => onChange(selected), [selected])

  return <Card className="mb-3">
    <Dropdown
      id={id}
      onSelect={(key, e) => {
        e.preventDefault()
        var index = parseInt(key, 10)
        setSelected(options[index])
      }}
    >
      <Dropdown.Toggle
        variant="link"
        id={id}
        as={CampusSelectToggle}
      >
        {selected}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((c, i) =>
          <Dropdown.Item
            key={`CampusSelection:${i}`}
            eventKey={i}
            active={c === selected}
          >
            {c}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  </Card>
}

const EventSchedule = ({
  id,
  defaultCampus,
  callsToAction,
  events,
}) => {
  const [visibleOccurrences, setVisibleOccurrences] = useState([])
  const campusOptions = uniq(flatMapDepth(
    events.map(e => e.campuses.map(c => c.name)),
    identity,
    2
  ))
  const groupByLocations = groupBy(visibleOccurrences, 'location')
  const groupByLocationDate = keys(groupByLocations).map(l => {
    const dateTimes = groupBy(
      groupByLocations[l],
      (o) => moment(o.start).format('YYYY-MM-DD')
    )

    return { location: l, dateTimes }
  })

  const onChange = (campus) => {
    const campusEvents = events.filter(e => e.campuses.find(c => c.name === campus))

    setVisibleOccurrences(campusEvents)
  }

  return [
    <CampusSelection
      key={`CampusSelection`}
      campuses={campusOptions}
      onChange={onChange}
      defaultCampus={defaultCampus}
    />,
    <Card
      key={`EventOccurences`}
      className={classnames(
        'my-3',
      )}
    >
      <div className="py-3">
        {groupByLocationDate.map((event, i) => {
          const { location, dateTimes } = event
          return <div
            key={`EventOccurence:${i}`}
            className={classnames({
              'border-bottom': i < groupByLocationDate.length - 1,
              'border-light': i < groupByLocationDate.length - 1,
              'pb-3': i < groupByLocationDate.length - 1,
            })}
          >
            {keys(dateTimes).map(date => (
              <EventTimes
                key={`EventOccurenceDate:${date}`}
                date={date}
                times={dateTimes[date]}
                className={classnames({
                  'mb-4': keys(dateTimes).length > 1,
                })}
              />
            ))}

            <a
              className="text-dark"
              href={getDirectionsUrl(location)}
              target="_blank"
            >
              {location}
            </a>
          </div>
        })}

        <div className={classnames({ 'mt-5': callsToAction.length > 0 })}>
          {callsToAction.map((n, i) => (
            <a
              key={i}
              className={classnames(
                'btn',
                'btn-primary',
                'btn-block',
                "my-3"
              )}
              href={n.action}
            >
              {n.call}
            </a>
          ))}
        </div>
      </div>
    </Card >
  ]
}

EventSchedule.propTypes = {
  id: PropTypes.string.isRequired,
  defaultCampus: PropTypes.string,
  callsToAction: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })
  )
}

EventSchedule.defaultProps = {
  defaultCampus: '',
  callsToAction: []
}

export default EventSchedule
