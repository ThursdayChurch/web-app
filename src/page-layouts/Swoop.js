import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
    useQuery
} from 'react-apollo'

import {
    mapEdgesToNodes,
} from '../utils'

import { GET_BLOCK_ITEMS } from './queries'

import Loader from '../ui/Loader'

// import ContentContainer from ''
import {
    Block,
    BackgroundContentBlock,
    GroupBlock,
} from '../ui'
import { Feature } from '../features'
import { get, camelCase, lowerCase } from 'lodash'


const bgColor = {
    'true': 'bg-transparent',
    'false': 'bg-white',
    'accordion': 'bg-transparent',
}


const Swoop = ({ title }) => {
    const website = process.env.REACT_APP_WEBSITE_KEY
    const { loading, error, data } = useQuery(
        GET_BLOCK_ITEMS,
        { variables: { website, title } }
    )

    if (loading) return (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
            <Loader />
        </div>
    )

    if (error) {
        console.error("ERROR: ", { error })
        return <h1 className="text-center">There was an error loading the page. Please try again.</h1>
    }

    let bgIndex = true

    const blockItems = mapEdgesToNodes(data.getWebsitePageContentByTitle.childContentItemsConnection)

    console.log({ blockItems })

    return (
        <div className="container-fluid">
            {blockItems.map((item, i) => {
                const id = lowerCase(get(item, 'title', '')).replace(/\s/g, '-')
                const bg = bgColor[`${bgIndex}`]
                let content = null

                if (!camelCase(get(item, 'contentLayout', '')).includes('background'))
                    bgIndex = !bgIndex

                switch (item.__typename) {
                    case 'WebsiteBlockItem':
                        item.contentLayout = camelCase(item.contentLayout)
                        if (camelCase(get(item, 'contentLayout', '')).includes('background')) {
                            content = <BackgroundContentBlock {...item} />
                        } else {
                            content = <Block
                                withAnimation
                                {...item}
                            />
                        }
                        break
                    case 'WebsiteGroupItem':
                        content = <div
                            className={classnames("col")}
                        >
                            <GroupBlock {...item} />
                        </div>
                        break
                    case 'WebsiteFeature':
                        content = (
                            <div className={classnames("col", 'px-4')}>
                                <Feature name={get(item, 'feature', '')} background={bg} />
                            </div>
                        )
                        break
                    default:
                        content = <h1 className={classnames("text-center")}>{item.title}</h1>
                        break
                }

                return (
                    <div id={id} className={`row ${bg}`} key={i}>
                        {content}
                    </div>
                )
            })}
        </div>
    )
}

Swoop.defaultProps = {
    title: 'home',
}

Swoop.propTypes = {
    title: PropTypes.string,
}

export default Swoop
