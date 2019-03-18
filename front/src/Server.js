export const getVideoInformation = async (videoId) => {
  const response = await fetch(`/videos/${videoId}`);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message)
  }
  return body;
};


export const getCaptions = async (captionId) => {
  console.log(`fetch captions of ${captionId}`);
  const response = await fetch(`/captions/${captionId}`);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message)
  }
  return body;
}