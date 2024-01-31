import React from 'react';
import styles from './SpotifyNowPlaying.module.scss';
import Image from 'next/image';
import { useSpotify } from '@hooks';

const SpotifyNowPlaying: React.FC = () => {
  const { spotify } = useSpotify();

  return (
    <div className={`${styles.musicContainer} bg-gray-900`}>
      <div className={styles.song}>
        <div className={styles.albumArt}>
          <Image
            className="logo-night"
            alt="lamora logo"
            src="/assets/icons/spotify.svg"
            width={50}
            height={50}
          />
          <Image
            className="d-none logo-day"
            alt="lamora logo"
            src="/assets/icons/spotify-day.svg"
            width={50}
            height={50}
          />
        </div>
        {/** TODO: this should display if isPlaying, else recently played state.  */}
        {spotify?.isPlaying ? (
          <div className={`${styles.musicinfo}`}>
            <p className={`${styles.title} color-gray-300`}>{spotify?.title}</p>
            <p className={`${styles.artist} color-gray-400`}>
              {spotify?.artists[0]?.name}
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
      {spotify?.isPlaying ? (
        <div className={styles.nowPlayingContainer}>
          <div className={styles.soundwaveContainer}>
            <div className={`${styles.bar} bg-gray-400`}></div>
            <div className={`${styles.bar} bg-gray-400`}></div>
            <div className={`${styles.bar} bg-gray-400`}></div>
            <div className={`${styles.bar} bg-gray-400`}></div>
          </div>
          <p className="text-xs color-gray-300">Now Cookin&apos;</p>
        </div>
      ) : (
        <p className="text-xs color-gray-300">Chasing Toddlers</p>
      )}
    </div>
  );
};

export default SpotifyNowPlaying;
