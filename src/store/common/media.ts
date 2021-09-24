
export type MediaInfo = {
  altText?: string;
  mediaSizes: {
    xs: string;
    md: string;
    lg: string;
  }
}

export const DEFAULT_MEDIA_INFO: MediaInfo = {
  mediaSizes: {
    xs: '',
    md: '',
    lg: '',
  }
}
