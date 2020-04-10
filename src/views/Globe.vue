<template>
  <div class="body h-screen">
    <div id="globe-container"></div>
    <div id="currentInfo" class="flex flex-col">
      <span @click="handleClick(0)" class="year">Total Cases</span>
      <span @click="handleClick(1)" class="year">New Cases</span>
      <span @click="handleClick(2)" class="year">Total Deaths</span>
      <span @click="handleClick(3)" class="year">New Death</span>
      <span @click="handleClick(4)" class="year">Total Recovered</span>
      <span @click="handleClick(5)" class="year">Active Cases</span>
      <span @click="handleClick(6)" class="year">Critical</span>
    </div>

    <div id="title">
      World COVID-19 data
    </div>
    <div class="text-white text-xl hover:bg-white hover:text-black back border border-white rounded cursor-pointer p-3"
         @click="$router.push({name: 'Home'})"
    >
      Back
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Globe',
    data () {
      return {
        years: ['TC', 'NC', 'TD', 'ND', 'TR', 'AC', 'CR'],
        globeData: [["USA",[38, -97, 1, 20, 77, 0.25]]]
      }
    },
    computed: {
      ...mapState(['TC', 'NC', 'TD', 'ND', 'TR', 'AC', 'CR'])
    },
    mounted () {
      this.globeData = [["TC",this.TC],["NC",this.NC], ["TD",this.TD], ["ND",this.ND], ["TR",this.TR], ["AC",this.AC], ["CR",this.CR]]
      this.renderGlobe(0)
    },
    methods: {
      renderGlobe (c) {
        // eslint-disable-next-line no-undef
        if(!Detector.webgl){
          // eslint-disable-next-line no-undef
          Detector.addGetWebGLMessage();
        } else {
          // const years = ['1990','1995','2000'];
          const container = document.getElementById('globe-container');
          // eslint-disable-next-line no-undef
          let globe = new DAT.Globe(container);
          // eslint-disable-next-line no-undef
          TWEEN.start();

          const data = this.globeData
          for (let i=0;i<data.length;i++) {
            globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
          }
          globe.createPoints();
          this.settime(globe,c)();
          globe.animate();
        }
      },
      settime (globe, t) {
        return () => {
          // eslint-disable-next-line no-undef
          new TWEEN.Tween(globe).to({time: t/this.years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
        }
      },
      handleClick (c) {
        this.renderGlobe(c)
      }
    }
  }
</script>

<style scoped>
  /*html {*/
  /*  height: 100%;*/
  /*}*/
  .body {
    margin: 0;
    padding: 0;
    background: #000000;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 13px;
    line-height: 20px;
    /*height: 100%;*/
  }

  #currentInfo {
    width: 270px;
    position: absolute;
    left: 20px;
    top: 63px;

    background-color: rgba(0,0,0,0.2);

    border-top: 1px solid rgba(255,255,255,0.4);
    padding: 10px;
  }

  a {
    color: #aaa;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  .bull {
    padding: 0 5px;
    color: #555;
  }

  #title {
    position: absolute;
    top: 20px;
    width: 270px;
    left: 20px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 3px;
    font: 20px Georgia;
    padding: 10px;
  }

  .back {
    position: absolute;
    font-family: Georgia,serif;
    right: 20px;
    top: 20px;
  }
  .year {
    font: 16px Georgia;
    line-height: 26px;
    /*height: 30px;*/
    text-align: center;
    float: left;
    width: 90px;
    color: rgba(255, 255, 255, 0.4);

    cursor: pointer;
    -webkit-transition: all 0.1s ease-out;
  }

  /*.year:hover, .year.active {*/
  /*  font-size: 23px;*/
  /*  color: #fff;*/
  /*}*/
</style>
