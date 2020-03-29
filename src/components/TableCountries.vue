<template>
  <div class="flex justify-center">
    <div class="w-2/3 mt-5">
      <div class="flex justify-between">
        <div class="flex items-center">
          <label for="search" class="font-semibold">Search Country:</label>
          <div class="p-2 w-56">
            <input id="search" type="text" class="border-gray-500" />
          </div>
        </div>
      </div>
      <!--TABLE TITLES-->
      <div class="border border-gray-500 grid grid-cols-8 cursor-pointer">
        <!--TITLE COUNTRY-->
        <div class="border-r border-gray-500 font-bold text-base flex justify-center items-center p-1">
          Country
        </div>
        <!--TITLE TOTAL CASES-->
        <div class="border-r border-gray-500 font-bold text-base flex justify-center items-center p-1">
          Total Cases
        </div>
        <!--TITLE NEW CASES-->
        <div class="border-r border-gray-500 font-bold text-base flex justify-center items-center p-1">
          New Cases
        </div>
        <!--TITLE TOTAL DEATHS-->
        <div class="border-r border-gray-500 font-bold text-base flex justify-center items-center p-1">
          Total Deaths
        </div>
        <!--TITLE NEW DEATHS-->
        <div class="border-r border-gray-500 font-bold text-base flex justify-center items-center p-1">
          New Deaths
        </div>
        <!--TITLE TOTAL RECOVERED-->
        <div class="border-r border-gray-500 font-bold text-base flex justify-center items-center p-1 text-center">
          Total Recovered
        </div>
        <!--TITLE ACTIVE CASES-->
        <div class="border-r border-gray-500 font-bold text-base flex justify-center items-center p-1">
          Active Cases
        </div>
        <!--TITLE CRITICAL-->
        <div class="border-r border-gray-500 font-bold text-base flex justify-center items-center p-1">
          Critical
        </div>
      </div>
      <!--WORLD-->
      <div class="border border-gray-500 grid grid-cols-8">
        <div class="bg-gray-300 border-r border-gray-500 flex items-center p-1">World</div>
        <div class="bg-gray-300 border-r border-gray-500 flex justify-center items-center">
          {{numberWithCommas(worldTotalCases)}}
        </div>
        <div class="bg-gray-300 border-r border-gray-500 flex justify-center items-center">
          {{appendPlus(worldNewCases)}}
        </div>
        <div class="bg-gray-300 border-r border-gray-500 flex justify-center items-center">
          {{numberWithCommas(worldTotalDeaths)}}
        </div>
        <div class="bg-gray-300 border-r border-gray-500 flex justify-center items-center">
          {{appendPlus(worldNewDeaths)}}
        </div>
        <div class="bg-gray-300 border-r border-gray-500 flex justify-center items-center">
          {{numberWithCommas(worldTotalRecovered)}}
        </div>
        <div class="bg-gray-300 border-r border-gray-500 flex justify-center items-center">
          {{numberWithCommas(worldActiveCases)}}
        </div>
        <div class="bg-gray-300 border-r border-gray-500 flex justify-center items-center">
          {{numberWithCommas(worldCritical)}}
        </div>
      </div>
      <!--COUNTRIES-->
      <div class="overflow-y-scroll table-height border-b">
        <div class="border border-gray-500 grid grid-cols-8 hover:bg-gray-200"
             v-for="(country, index) in countries" :key="index"
        >
          <!--COUNTRY-->
          <div class="border-r border-gray-500 flex justify-between items-center cursor-pointer p-1">
            <div>{{country.country}}</div>
            <div>
              <img :src="country.countryInfo.flag" class="object-scale-down h-5">
            </div>
          </div>
          <!--TOTAL CASES-->
          <div class="border-r border-gray-500 flex justify-center items-center">
            {{numberWithCommas(country.cases)}}
          </div>
          <!--NEW CASES-->
          <div class="border-r border-gray-500 flex justify-center items-center"
               :class="country.todayCases > 0 ? 'bg-yellow-300' : '' "
          >
            {{appendPlus(country.todayCases)}}
          </div>
          <!--TOTAL DEATHS-->
          <div class="border-r border-gray-500 flex justify-center items-center">
            {{numberWithCommas(country.deaths)}}
          </div>
          <!--NEW DEATHS-->
          <div class="border-r border-gray-500 flex justify-center items-center"
               :class="[
             country.todayDeaths > 0 ? 'bg-red-600' : '',
             country.todayDeaths > 0 ? 'text-white' : 'text-black'
             ]"
          >
            {{appendPlus(country.todayDeaths)}}
          </div>
          <!--TOTAL RECOVERED-->
          <div class="border-r border-gray-500 flex justify-center items-center">
            {{numberWithCommas(country.recovered)}}
          </div>
          <!--ACTIVE CASES-->
          <div class="border-r border-gray-500 flex justify-center items-center">
            {{numberWithCommas(country.active)}}
          </div>
          <!--CRITICAL-->
          <div class="border-r border-gray-500 flex justify-center items-center">
            {{numberWithCommas(country.critical)}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {apiService} from "@/services/api.service";

  export default {
    name: 'Home',
    data () {
      return {
        countries: [],
        sortby: '2'
      }
    },
    computed: {
      worldTotalCases () {
        return this.countries.reduce((tot, country) => {
          return tot + country.cases
        } , 0)
      },
      worldNewCases () {
        return this.countries.reduce((tot, country) => {
          return tot + country.todayCases
        } , 0)
      },
      worldTotalDeaths () {
        return this.countries.reduce((tot, country) => {
          return tot + country.deaths
        } , 0)
      },
      worldNewDeaths () {
        return this.countries.reduce((tot, country) => {
          return tot + country.todayDeaths
        } , 0)
      },
      worldTotalRecovered () {
        return this.countries.reduce((tot, country) => {
          return tot + country.recovered
        } , 0)
      },
      worldActiveCases () {
        return this.countries.reduce((tot, country) => {
          return tot + country.active
        } , 0)
      },
      worldCritical () {
        return this.countries.reduce((tot, country) => {
          return tot + country.critical
        } , 0)
      }
    },
    created () {
      this.getCountriesData()
    },
    methods: {
      async getCountriesData () {
        const response = await apiService.countriesData()
        this.countries = response
      },
      numberWithCommas (num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      appendPlus (num) {
        if (num > 0) {
          return `+${this.numberWithCommas(num)}`
        } else {
          return this.numberWithCommas(num)
        }
      }
    }
  }
</script>
<style scoped>
  .table-height {
    height: 500px;
  }
</style>
