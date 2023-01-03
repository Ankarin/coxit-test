<template>
  <div class="trackList">
    <TrackItem
      v-if="tracks"
      v-for="(track, key) in tracks"
      :key="key"
      :artist="track.artist"
      :title="track.title"
      :imageUrl="track.imageUrl"
      :time="track.time"
      :duration="track.duration"
      :trackStatus="track.status"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import TrackItem from "./TrackItem.vue";

const store = useStore();
const tracks = computed(() => store.getters.getTracks);
const setTracks = () => store.dispatch("setTracks");
onMounted(() => {
  setTracks()
});
</script>

<style lang="scss" scoped>
.trackList {
  margin: auto;
  max-width: 1000px;
  width: 90vh;
}
</style>
