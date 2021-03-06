import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from 'react-apollo';
import { get } from 'lodash';
import moment from 'moment';

import { GoogleAnalytics } from 'analytics';
import { ErrorBlock, Loader } from 'ui';

import ADD_ATTENDANCE from './addAttendance';
import GET_GROUP from './getGroup';
import NewGroup from './NewGroup';

const NewGroupContentItemConnected = ({ itemId }) => {
  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: { itemId },
    fetchPolicy: 'cache-and-network',
  });

  const [handleAttend] = useMutation(ADD_ATTENDANCE);

  // When refetching data upon group edit,
  // we don't want to show the loader again
  if (loading && !data) {
    return (
      <div style={{ height: '50vh', width: '100vw', position: 'relative' }}>
        <Loader />
      </div>
    );
  }

  const content = get(data, 'node', {});

  if (error || (!loading && !content)) {
    console.log({ error }); // eslint-disable-line no-console
    return <ErrorBlock />;
  }

  const handleOnClickGroupResource = ({ resourceTitle }) => {
    GoogleAnalytics.trackEvent({
      category: 'Groups',
      action: 'Resource',
      label: `${get(content, 'title')} - ${resourceTitle}`,
    });
  };

  const handleOnClickVideoCall = (action) => {
    GoogleAnalytics.trackEvent({
      category: 'Groups',
      action: action ? `${action} Video Call` : 'Video Call',
      label: `${get(content, 'title')}`,
    });

    // Check to see if the current date is the date of the meeting before taking attendance.
    if (
      moment(get(content, 'dateTime.start', null)).format('MMDDYYYY') ===
      moment().format('MMDDYYYY')
    ) {
      handleAttend({ variables: { id: itemId } });
    }
  };

  return (
    <NewGroup
      coverImage={get(content, 'coverImage')}
      title={get(content, 'title')}
      summary={get(content, 'summary')}
      members={get(content, 'members', [])}
      leaders={get(content, 'leaders', []) || []}
      groupResources={get(content, 'resources', [])}
      dateTime={get(content, 'dateTime')}
      userName={
        get(data, 'currentUser.profile.nickName') ||
        get(data, 'currentUser.profile.firstName')
      }
      userId={get(data, 'currentUser.id')}
      videoCall={get(content, 'videoCall')}
      channelId={get(content, 'streamChatChannel.channelId')}
      chatChannelType={get(content, 'streamChatChannel.channelType', 'group')}
      onClickGroupResource={handleOnClickGroupResource}
      onClickVideoCall={handleOnClickVideoCall}
      id={itemId}
    />
  );
};

NewGroupContentItemConnected.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default NewGroupContentItemConnected;
