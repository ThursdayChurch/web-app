import React from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import {
    Loader,
} from '../../ui';

import ContentSingle from '../../content-single';
import {
    EventDetail,
    EventBanner,
} from '../../content-single/EventContentItem';
import { CardFeed } from '../../content-feed';

import { GET_EVENT } from './queries';
import { redirectTo } from '../../utils';
import { useAuth } from '../../auth';

const EventConnected = ({ title }) => {
    const { loading, error, data } = useQuery(
        GET_EVENT,
        { variables: { title }, fetchPolicy: 'cache-and-network' },
    );

    if (loading) return <Loader />;
    if (error) {
        console.log({ error });
        return null;
    }

    const content = get(data, 'getEventContentByTitle', null);

    if (!content) {
        // redirectTo('/events');
        return null;
    }

    console.log({ content });

    return <ContentSingle itemId={content.id} />;

    return [
        <EventBanner
            key={1}
            {...content}
        />,
        <EventDetail
            key={2}
            {...content}
        />,
        // TODO : finish this
        <CardFeed
            key={3}
            id={content.id}
            title="Related Events"
            urlBase="events"
            connection="sibling"
            first={3}
        />,
    ];
};

export default EventConnected;
