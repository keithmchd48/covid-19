<template>
  <div class="flex justify-center">
    <div class="lg:w-2/3 md:w-full mt-5">
      <div class="flex items-center pb-2">
        <div class="w-full">
          <input id="search" type="text"
                 class="border w-full border-blue-300 rounded p-2 outline-none focus:shadow-outline focus:bg-gray-100"
                 placeholder="Search country"
                 v-model="countryName"
          />
        </div>
      </div>
      <!--TABLE TITLES-->
      <div class="border border-gray-500 grid grid-cols-8 cursor-pointer text-xs sm:text-sm md:text-base">
        <!--TITLE COUNTRY-->
        <div class="border-r border-gray-500 font-bold flex justify-center items-center p-1"
             @click="sortMe('country')"
        >
          Country
          <i v-if="iconUpDown('country') === 'asc'" class="fas fa-sort-amount-down-alt text-gray-600 pl-1"/>
          <i v-if="iconUpDown('country') === 'dsc'" class="fas fa-sort-amount-up-alt text-gray-600 pl-1"/>
        </div>
        <!--TITLE TOTAL CASES-->
        <div class="border-r border-gray-500 font-bold flex justify-center items-center p-1"
             @click="sortMe('cases')">
          Total Cases
          <i v-if="iconUpDown('cases') === 'asc'" class="fas fa-sort-amount-down-alt text-gray-600 pl-1"/>
          <i v-if="iconUpDown('cases') === 'dsc'" class="fas fa-sort-amount-up-alt text-gray-600 pl-1"/>
        </div>
        <!--TITLE NEW CASES-->
        <div class="border-r border-gray-500 font-bold flex justify-center items-center p-1"
             @click="sortMe('todayCases')">
          New Cases
          <i v-if="iconUpDown('todayCases') === 'asc'" class="fas fa-sort-amount-down-alt text-gray-600 pl-1"/>
          <i v-if="iconUpDown('todayCases') === 'dsc'" class="fas fa-sort-amount-up-alt text-gray-600 pl-1"/>
        </div>
        <!--TITLE TOTAL DEATHS-->
        <div class="border-r border-gray-500 font-bold flex justify-center items-center p-1"
             @click="sortMe('deaths')">
          Total Deaths
          <i v-if="iconUpDown('deaths') === 'asc'" class="fas fa-sort-amount-down-alt text-gray-600 pl-1"/>
          <i v-if="iconUpDown('deaths') === 'dsc'" class="fas fa-sort-amount-up-alt text-gray-600 pl-1"/>
        </div>
        <!--TITLE NEW DEATHS-->
        <div class="border-r border-gray-500 font-bold flex justify-center items-center p-1"
             @click="sortMe('todayDeaths')">
          New Deaths
          <i v-if="iconUpDown('todayDeaths') === 'asc'" class="fas fa-sort-amount-down-alt text-gray-600 pl-1"/>
          <i v-if="iconUpDown('todayDeaths') === 'dsc'" class="fas fa-sort-amount-up-alt text-gray-600 pl-1"/>
        </div>
        <!--TITLE TOTAL RECOVERED-->
        <div class="border-r border-gray-500 font-bold flex justify-center items-center p-1 text-center"
             @click="sortMe('recovered')">
          Total Recovered
          <i v-if="iconUpDown('recovered') === 'asc'" class="fas fa-sort-amount-down-alt text-gray-600 pl-1"/>
          <i v-if="iconUpDown('recovered') === 'dsc'" class="fas fa-sort-amount-up-alt text-gray-600 pl-1"/>
        </div>
        <!--TITLE ACTIVE CASES-->
        <div class="border-r border-gray-500 font-bold flex justify-center items-center p-1"
             @click="sortMe('active')">
          Active Cases
          <i v-if="iconUpDown('active') === 'asc'" class="fas fa-sort-amount-down-alt text-gray-600 pl-1"/>
          <i v-if="iconUpDown('active') === 'dsc'" class="fas fa-sort-amount-up-alt text-gray-600 pl-1"/>
        </div>
        <!--TITLE CRITICAL-->
        <div class="border-r border-gray-500 font-bold flex justify-center items-center p-1"
             @click="sortMe('critical')">
          Critical
          <i v-if="iconUpDown('critical') === 'asc'" class="fas fa-sort-amount-down-alt text-gray-600 pl-1"/>
          <i v-if="iconUpDown('critical') === 'dsc'" class="fas fa-sort-amount-up-alt text-gray-600 pl-1"/>
        </div>
      </div>
      <!--WORLD-->
      <div class="border border-gray-500 grid grid-cols-8 text-xs sm:text-sm">
        <div class="bg-gray-300 border-r border-gray-500 flex items-center p-1 cursor-pointer"
             @click="showGlobe">
          World
        </div>
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
      <div v-if="loading" class="border border-gray-500 table-height items-center text-xl flex justify-center">
        Loading...
      </div>
      <div v-else class="overflow-y-scroll table-height border-b text-xs sm:text-sm">
        <div class="border border-gray-500 grid grid-cols-8 hover:bg-gray-200"
             v-for="(country, index) in sortedAndSearchedData" :key="index"
        >
          <!--COUNTRY-->
          <div class="border-r border-gray-500 flex justify-between items-center cursor-pointer p-1 tooltip">
            <div>{{country.country | shortCountryName}}</div>
            <i class="tooltiptext">
              {{country.country}}
            </i>
            <div>
              <img :src="country.countryInfo.flag" class="object-scale-down h-5 border border-blue-500"/>
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
  import {mapActions} from 'vuex'
  export default {
    name: 'Home',
    filters: {
      shortCountryName (value) {
        if (value.length > 10) {
          return `${value.slice(0, 8)}...`
        }
        return value
      }
    },
    data () {
      return {
        loading: false,
        countryName: '',
        countries: [],
        sortedAndSearchedData: [],
        sortby: [
          {
            column: 'country',
            active: false,
            asc: true
          },
          {
            column: 'cases',
            active: true,
            asc: true
          },
          {
            column: 'todayCases',
            active: false,
            asc: true
          },
          {
            column: 'deaths',
            active: false,
            asc: true
          },
          {
            column: 'todayDeaths',
            active: false,
            asc: true
          },
          {
            column: 'recovered',
            active: false,
            asc: true
          },
          {
            column: 'active',
            active: false,
            asc: true
          },
          {
            column: 'critical',
            active: false,
            asc: true
          },
        ]
      }
    },
    watch: {
      countryName: {
        handler() {
          this.sortedAndSearchedData = this.countries.filter((d) => {
            return d.country.toLowerCase().includes(this.countryName.toLowerCase())
          })
        }
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
      ...mapActions(['SET_TC_ACTION', 'SET_NC_ACTION', 'SET_TD_ACTION', 'SET_ND_ACTION', 'SET_TR_ACTION', 'SET_AC_ACTION', 'SET_CR_ACTION']),
      async getCountriesData () {
        this.loading = true
        const response = await apiService.countriesData()
        this.loading = false
        this.countries = response
        // filter out the "World" Data
        this.countries = this.sortedAndSearchedData = response.filter(data => {
          return data.country.toLowerCase() !== 'world'
        })
      },
      sortMe (column) {
        const findColumn = this.sortby.find(ele => {
          return ele.column === column
        })
        this.sortby = this.sortby.map(s => {
          if (s.column === column) {
            return {
              ...s,
              active: true,
              asc: !s.asc
            }
          } else {
            return {
              ...s,
              active: false
            }
          }
        });
        function compare(a, b) {
          if (findColumn.asc) {
            if (a[findColumn.column] > b[findColumn.column]) return 1;
            if (b[findColumn.column] > a[findColumn.column]) return -1;
          } else {
            if (a[findColumn.column] > b[findColumn.column]) return -1;
            if (b[findColumn.column] > a[findColumn.column]) return 1;
          }
          return 0;
        }
        this.sortedAndSearchedData.sort(compare)
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
      },
      iconUpDown (column) {
        const findColumn = this.sortby.find(ele => {
          return ele.column === column
        });
        if (findColumn.active && findColumn.asc) {
          return 'asc'
        } else if (findColumn.active && !findColumn.asc) {
          return 'dsc'
        } else {
          return false
        }
      },
      populateArray (column, total) {
        let arr = []
        const len = this.countries.length
        for (let i = 0; i < len; i++) {
          const fraction = (this.countries[i][column]/total).toFixed(2)
          arr = [...arr, ...[this.countries[i].countryInfo.lat, this.countries[i].countryInfo.long, Number(fraction)*10]]
        }
        return arr
      },
      showGlobe () {
        this.SET_TC_ACTION(this.populateArray('cases', this.worldTotalCases));
        this.SET_NC_ACTION(this.populateArray('todayCases', this.worldNewCases));
        this.SET_TD_ACTION(this.populateArray('deaths', this.worldTotalDeaths));
        this.SET_ND_ACTION(this.populateArray('todayDeaths', this.worldNewDeaths));
        this.SET_TR_ACTION(this.populateArray('recovered', this.worldTotalRecovered));
        this.SET_AC_ACTION(this.populateArray('active', this.worldActiveCases));
        this.SET_CR_ACTION(this.populateArray('critical', this.worldCritical));
        this.$router.push({name: 'Globe'})
      }
    }
  }
</script>
<style scoped>
  .table-height {
    height: 500px;
  }
</style>
