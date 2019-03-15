export const getVideoInformation = async (videoId) => {
  const response = await fetch(`/videos/${videoId}`);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message)
  }
  return body;
};