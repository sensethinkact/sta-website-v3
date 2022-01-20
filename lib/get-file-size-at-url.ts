import fetch from 'node-fetch'

export async function getFileSizeAtUrl(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  } else {
    return response.headers.get('content-length')
  }
};

// const url = "https://ftp.osuosl.org/pub/ros/download.ros.org/sensethinkact/episodes/STA%20Ep%2010%20-%20Brett%20Aldrich.mp3"
// console.log(
//   getFileSize(url)
// )