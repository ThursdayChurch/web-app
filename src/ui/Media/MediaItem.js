import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { keys } from 'lodash';
import Image from './Image';
import Video from './Video';

const MediaItem = ({
  children,
  circle,
  className,
  gradient,
  gradientDirection,
  imageAlt,
  imageUrl,
  isLive,
  altPlayButton,
  playVidInBackground,
  overlay,
  playIcon,
  ratio,
  rounded,
  showControls,
  showTheaterMode,
  style,
  videoUrl,
  withHover,
}) => {
  let ratioClass =
    typeof ratio === 'string'
      ? `embed-responsive-${ratio}`
      : keys(ratio).map((n) => `embed-responsive-${n}-${ratio[n]}`.replace('-xs', ''));

  if (circle) {
    ratioClass = 'embed-responsive-1by1';
  }

  // TODO : test where the showControls is passed in, but no value URL exists

  return (
    <div
      className={classnames(className, 'embed-responsive', ratioClass, {
        rounded: rounded && !circle,
        'rounded-circle': circle,
        'scale-media-up-on-hover': withHover,
        'overflow-visible': videoUrl,
      })}
      style={style}
    >
      {videoUrl ? (
        <Video
          className={classnames('embed-responsive-item')}
          playInBackground={playVidInBackground}
          source={videoUrl}
          poster={imageUrl}
          showControls={showControls}
          isLive={isLive}
          playIcon={playIcon}
          altPlayButton={altPlayButton}
          showTheaterMode={showTheaterMode}
        />
      ) : (
        <Image
          source={imageUrl}
          alt={imageAlt}
          className={classnames('embed-responsive-item')}
        />
      )}

      {!showControls && (
        <div
          className="fill d-flex justify-content-center align-items-center"
          style={{ zIndex: 1000 }}
        >
          {children}
        </div>
      )}

      {(gradient || overlay) && (
        <div
          className={classnames('w-100', 'h-100', 'absolute-center', 'opacity-65', {
            [`bg-${overlay}`]: !!overlay,
            [`gradient-${gradient}-${gradientDirection}`]: !!gradient,
          })}
        />
      )}
    </div>
  );
};

MediaItem.defaultProps = {
  ratio: '1by1',
  videoUrl: '',
  className: '',
  style: {},
  showControls: false,
  playIcon: {
    as: null,
    color: 'white',
    size: '54',
  },
  overlay: null,
  gradient: null,
  gradientDirection: 'bottom-top',
  withHover: false,
  isLive: false,
  altPlayButton: false,
  rounded: false,
  circle: false,
  playVidInBackground: false,
  showTheaterMode: false,
  children: null,
};

const RATIOS = ['1by1', '4by3', '16by9', '21by9', '3by4'];
MediaItem.propTypes = {
  ratio: PropTypes.oneOfType([
    PropTypes.oneOf(RATIOS),
    PropTypes.shape({
      xs: PropTypes.oneOf(RATIOS),
      sm: PropTypes.oneOf(RATIOS),
      md: PropTypes.oneOf(RATIOS),
      lg: PropTypes.oneOf(RATIOS),
      xl: PropTypes.oneOf(RATIOS),
    }),
  ]),
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  videoUrl: PropTypes.string,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  style: PropTypes.object,
  showControls: PropTypes.bool,
  withHover: PropTypes.bool,
  isLive: PropTypes.bool,
  showTheaterMode: PropTypes.bool,
  playIcon: PropTypes.shape({
    as: PropTypes.element, // TODO : add support
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  overlay: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
    'black',
  ]),
  gradient: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
    'black',
  ]),
  gradientDirection: PropTypes.oneOf(['bottom-top']),
  altPlayButton: PropTypes.bool,
  playVidInBackground: PropTypes.bool,
};

export default MediaItem;
