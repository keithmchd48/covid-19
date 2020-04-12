import {handleResponse} from './handleResponse.service'

export const apiService = {
  countriesData,
  bingData
}

function countriesData() {
  const requestOptions = {
    method: 'GET'
  }
  return handleResponse.getFinalResponse(`https://corona.lmao.ninja/countries?sort=cases`, requestOptions)
}

function bingData() {
  const requestOptions = {
    method: 'GET'
  }
  return handleResponse.getFinalResponse(`https://covid.hnrtech.com/`, requestOptions)
}
