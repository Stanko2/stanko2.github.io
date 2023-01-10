<template>
  <div
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    class="overflow-hidden relative"
  >
    <div class="aspect-video relative top-1/2 -translate-y-1/2">
      <img
        :src="images[shownIndex]"
        class="rounded-md object-contain w-full aspect-video"
      />
    </div>
    <transition
      enter-active-class="duration-200 ease"
      leave-active-class="duration-200 ease"
      enter-to-class="translate-x-0 opacity-100 scale-100"
      enter-class="translate-x-6 opacity-0 scale-50"
      leave-class="translate-x-0 opacity-100 scale-100"
      leave-to-class="translate-x-6 opacity-0 scale-50"
    >
      <button
        v-if="hovered && images.length > 1"
        class="controlButton right-6"
        @click="next()"
      >
        <img src="@/assets/right.svg" />
      </button>
    </transition>
    <transition
      enter-active-class="duration-200 ease"
      leave-active-class="duration-200 ease"
      enter-to-class="translate-x-0 opacity-100 scale-100"
      enter-class="-translate-x-6 opacity-0 scale-50"
      leave-class="translate-x-0 opacity-100 scale-100"
      leave-to-class="-translate-x-6 opacity-0 scale-50"
    >
      <button
        v-if="hovered && images.length > 1"
        class="controlButton left-6"
        @click="prev()"
      >
        <img src="@/assets/left.svg" />
      </button>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class Carousel extends Vue {
  @Prop() images!: string[];
  shownIndex = 0;
  hovered = false;

  prev() {
    this.shownIndex--;
    if (this.shownIndex < 0) this.shownIndex = this.images.length - 1;
  }

  next() {
    this.shownIndex++;
    if (this.shownIndex >= this.images.length) this.shownIndex = 0;
  }
}
</script>

<style lang="scss" scoped>
.controlButton {
  @apply absolute top-1/2 bg-teal-700 rounded-full h-12 w-12 p-3 hover:bg-teal-400 transition-all text-3xl hover:shadow-2xl text-teal-50 hover:text-gray-900;
}
</style>
