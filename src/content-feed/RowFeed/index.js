import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get, take } from 'lodash';
import classnames from 'classnames';

import {
    ContentContainer,
    Loader,
    TileRowCard,
} from '../../ui';
import ContentCardConnected from '../../content-card-connected';
import { GET_CONTENT_FEED } from '../queries';

const RowFeed = ({
    id,
    title,
    connection,
    urlBase,
    first,
    className,
    columnClass,
}) => {
    // we want to query at least one additional item just in case we get back the
    //  original item as a part of the child/sibling collection. Later on, we'll filter
    //  results to remove the original item from the list
    const calculatedFirst = first
        ? first + 1
        : null;
    const { loading, error, data } = useQuery(GET_CONTENT_FEED, {
        variables: {
            itemId: id,
            first: calculatedFirst,
            child: connection === 'child',
            sibling: connection === 'sibling',
        },
    });

    if (loading) {
        return (
            <ContentContainer>
                <Loader />
            </ContentContainer>
        );
    }

    if (error) {
        console.log({ error });
        return null;
    }

    let content = get(data, `node.${connection}ContentItemsConnection.edges`, []).map(
        (edge) => edge.node,
    ).filter((n) => n.id !== id);

    if (first) content = take(content, first);

    return content.length > 0
        ? (
            <div
                className={classnames(
                    'container-fluid',
                    className,
                )}
            >
                <div className="row">
                    <div
                        className={classnames(
                            columnClass,
                        )}
                    >
                        <Card
                            loading={isLoading}
                        >
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <h3>
                                            {title}
                                        </h3>
                                    </div>
                                    {!!urlBase && urlBase !== ''
                                        && (
                                            <div className="col text-right">
                                                <a
                                                    href={`/${urlBase}`}
                                                    className="text-dark align-self-end"
                                                >
                                                    See More
                                          </a>
                                            </div>
                                        )}
                                </div>
                                <div className="row mx-n2">
                                    {content.map(({ id }, i) => (
                                        <div
                                            key={`RowFeedCard:${id}`}
                                            className={classnames(
                                                'col-12',
                                                'col-md-6',
                                            )}
                                        >
                                            <ContentCardConnected
                                                contentId={id}
                                                card={TileRowCard}
                                                urlBase={urlBase}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        ) : null;
};

RowFeed.propTypes = {
    id: PropTypes.string,
    connection: PropTypes.oneOf([
        'child',
        'sibling',
    ]),
    title: PropTypes.string,
    first: PropTypes.number,
    className: PropTypes.string,
    columnClass: PropTypes.string,
};

RowFeed.defaultProps = {
    id: null,
    connection: 'child',
    first: null,
    className: '',
    columnClass: 'col p-2',
};

export default RowFeed;
