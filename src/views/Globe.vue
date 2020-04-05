<template>
  <div class="body h-screen">
    <div id="globe-container"></div>

    <div id="currentInfo">
      <span id="year1990" @click="handleClick" class="year">1990</span>
      <span id="year1995" class="year">1995</span>
      <span id="year2000" class="year">2000</span>
    </div>

    <div id="title">
      World Population
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Globe',
    data () {
      return {
        years: ['1990','1995','2000'],
        globeData: [["USA",[38, -97, 1, 20, 77, 0.25]]]
      }
    },
    mounted () {
      this.renderGlobe()
    },
    methods: {
      renderGlobe () {
        if(!Detector.webgl){
          Detector.addGetWebGLMessage();
        } else {
          // const years = ['1990','1995','2000'];
          const container = document.getElementById('globe-container');
          let globe = new DAT.Globe(container);
          TWEEN.start();

          const data = this.globeData
          for (let i=0;i<data.length;i++) {
            globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
          }
          globe.createPoints();
          this.settime(globe,0)();
          globe.animate();
        }
      },
      settime (globe, t) {
        return () => {
          new TWEEN.Tween(globe).to({time: t/this.years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
        }
      },
      handleClick () {
        this.globeData = [["USA",[42.8333, 12.8333, 1, 20, 77, 0.25]]]
        this.renderGlobe()
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

  .year {
    font: 16px Georgia;
    line-height: 26px;
    height: 30px;
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
