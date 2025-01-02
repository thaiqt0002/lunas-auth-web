import axios from 'axios'

/**
 * @param {string} url - The presigned url to upload the file
 * @param {File} file - The file to upload
 * @returns {Promise<void>} - The response of the request
 */
const presignedUrl = async (
  url: string,
  file: File,
  cb?: (progress: number) => void,
): Promise<void> => {
  try {
    await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / (progressEvent?.total ?? 1))
        if (cb) cb(progress ?? 0)
      },
    })
    // eslint-disable-next-line no-console
  } catch (error: any) {
    throw new Error(error)
  }
}
export { presignedUrl }
