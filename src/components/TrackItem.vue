<template>
  <div class="itemWrapper" :class="{ playing: isPlaying }">
    <div class="trackItem">
      <img class="trackImg" :src="imageUrl" alt="cover" />
      <div class="trackData">
        <div>
          <p class="bold">{{ title }}</p>
          <p>{{ artist }}</p>
        </div>
        <div class="trackTime">
          <p>started {{ formattedTime }}</p>
          <p>
            <span v-if="isPlaying">{{ progress }} - </span>
            {{ formattedDuration }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="isPlaying" class="progressBar">
      <div class="playTime" :style="{width: `${progressBar}%`}"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { defineProps, onMounted, computed, ref } from "vue";
interface PropsInterface {
  artist: string;
  title: string;
  imageUrl: string;
  time: string;
  duration: string;
  trackStatus: string;
}
const props = defineProps<PropsInterface>();

//data
const progress = ref("");
const progressBar = ref(0)


//computed
const computedDuration = computed(() => {
  return moment.duration(props.duration).asMilliseconds();
});
const formattedDuration = computed(() => {
  return moment.utc(computedDuration.value).format("mm:ss");
});

const formattedTime = computed(() => {
  return moment(props.time).local().format("h:mm:ss a");
});

const isPlaying = computed(() => {
  return props.trackStatus === "playing";
});
// functions
const timerLoop = () => {
  const progressed = calcProgress();
  if( progressed > computedDuration.value) {
    progress.value = moment.utc(computedDuration.value).format("mm:ss").toString();
    progressBar.value = 100

  } else {
    progress.value = moment.utc(progressed).format("mm:ss").toString();
    progressBar.value = progressed / computedDuration.value * 100
    setInterval(timerLoop, 1000);
  }
};

const calcProgress = () => {
  const start = moment(props.time);
  const now = moment();
  const diff = now.diff(start);
  return moment.duration(diff).asMilliseconds();
};

//
onMounted(() => {
  if(isPlaying.value) {
    timerLoop();
  }
});
</script>

<style lang="scss" scoped>
.playing {
  background-color: rgba(255, 255, 255, 0.1);
}
.itemWrapper {
  position: relative;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  .trackItem {
    height: 100%;
    display: flex;
    flex-direction: row;

    .trackData {
      width: 100%;
      padding-left: 30px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      .trackTime {
        text-align: right;
      }
      .bold {
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
  .progressBar {
    height: 7px;
    background-color: rgba(255, 255, 255, 0.4);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .playTime {
      height: 100%;
      background-color: red;
    }
  }
}
</style>
