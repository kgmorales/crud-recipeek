export interface SpotifyImage {
  url: string;
}

export interface SpotifyArtist {
  name: string;
}

export interface SpotifyAlbum {
  images: SpotifyImage[];
  name: string;
}

export interface SpotifyTrack {
  name: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  external_urls: { spotify: string };
}

export interface SpotifyCurrentlyPlayingResponse {
  is_playing: boolean;
  item?: SpotifyTrack;
}

export interface SpotifyNowPlaying {
  album: string;
  albumImgUrl: string;
  artist: string;
  isPlaying: boolean;
  title: string;
  songUrl: string;
}
