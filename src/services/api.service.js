import {handleResponse} from './handleResponse.service'

export const apiService = {
  countriesData
}

function countriesData() {
  const requestOptions = {
    method: 'GET'
  }
  return handleResponse.getFinalResponse(`https://corona.lmao.ninja/countries?sort=cases`, requestOptions)
}
