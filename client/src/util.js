export const ENDPOINT = 'http://localhost:8080/upload';

// allowed file types
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'video/mp4'
]

export const ERROR_MESSAGES = [
  `Invalid file type, allowed file types are ${ALLOWED_FILE_TYPES.toString()}`
]