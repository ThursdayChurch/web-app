import memoize from 'fast-memoize';
import { isString, get, isEmpty } from 'lodash';
import moment from 'moment';

import StreamChatClient from './client';
import ChatRoles from './chatRoles';

// :: General
export function stripPrefix(string) {
  if (!isString(string)) {
    return undefined;
  }

  return string.split(':')[1];
}

// User
function _getStreamUser(user) {
  if (!user) {
    return;
  }

  return {
    id: stripPrefix(user.id),
    name: `${user.profile.firstName} ${user.profile.lastName}`,
    image: get(user, 'profile.photo.uri', ''),
  };
}

// Memoized to allow shallow equality checks in hooks, etc.
export const getStreamUser = memoize(_getStreamUser, {
  serializer: (user) => user?.id,
});

export function getRoleFromMembership(channel) {
  // Not ideal, but it seems like Stream Chat provides this info in a few inconsistent ways.
  // In an abundance of (ugly) caution, exhaust the options. Some of this logic borrowed from
  // stream component internals.
  const isModerator = get(channel, 'state.membership.is_moderator');

  if (isModerator === true) {
    return ChatRoles.MODERATOR;
  }

  const userRole = get(channel, 'state.user.role');
  const membership = get(channel, 'state.membership.role');
  const membershipUserRole = get(channel, 'state.membership.user.role');
  const value = userRole || membership || membershipUserRole;

  switch (value) {
    case 'channel_moderator':
    case 'moderator':
      return ChatRoles.MODERATOR;
    case 'member':
    case 'user':
    case 'owner':
      return ChatRoles.USER;
    case 'anonymous':
    default:
      return ChatRoles.ANONYMOUS;
  }
}

// :: Channel
export function getChannelById(channels, channelId) {
  return channels.find((channel) => channel.cid === channelId);
}

export function channelIncludesUser(channel, userId) {
  return Object.keys(get(channel, 'state.members', {})).includes(userId);
}

export function getChannelUnreadCount(channel, userId) {
  return get(channel, `state.read[${userId}].unread_messages`, 0);
}

export function getOtherUser(channel, currentUserId) {
  const otherUser = Object.values(get(channel, 'state.members', [])).find(
    (member) => member.user.id !== currentUserId
  );

  return otherUser || null;
}

// :: Direct Messages
export async function getUserDmChannels() {
  const currentUserId = get(StreamChatClient, 'user.id');

  if (currentUserId) {
    const filter = {
      type: 'messaging',
      members: { $in: [currentUserId] },
    };
    const sort = { last_message_at: -1 };
    const options = { limit: 30 };

    return StreamChatClient.queryChannels(filter, sort, options);
  }

  return [];
}

export function filterRecentDmChannels(channels) {
  if (isEmpty(channels)) {
    return channels;
  }

  // This is where we define what "recent" means for direct messages
  const recentDate = moment().subtract(12, 'hours');
  return channels.filter(
    (channel) => !!moment(get(channel, 'state.last_message_at')).isAfter(recentDate)
  );
}

// :: Development Utils

export async function logChannelMembers(channel) {
  console.group('logChannelMembers()');

  console.log('[rkd] channel:', channel);
  console.group('•••••  👮‍♀️ Moderators  ••••••••••••••••••••••••••••••••••••••');
  const moderators = await channel.queryMembers({ is_moderator: true });
  moderators.members.forEach(({ user }) => {
    console.log(user);
  });
  console.groupEnd();

  console.group('•••••  👤 Users  ••••••••••••••••••••••••••••••••••••••');
  const users = await channel.queryMembers({ is_moderator: false });
  users.members.forEach(({ user }) => {
    console.log(user);
  });
  console.groupEnd();

  console.groupEnd();
}
