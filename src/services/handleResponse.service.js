export const handleResponse = {
  getFinalResponse
}

async function getFinalResponse (url, requestOptions) {
  return await fetch(url, requestOptions)
    .then(APIresponse)
    .catch(() => {
      // console.log(error)
    })
}

function APIresponse (response) {
  return response.text().then(text => {
    return text && JSON.parse(text)
  })
}
