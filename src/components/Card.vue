<template>
  <div
    class="flex-1 transition-all card hover:scale-105 m-2 overflow-hidden text-teal-50 p-0 rounded-lg"
    @mousemove="onMouseMove"
    @mouseout="relativeMouse = { x: 0, y: 0 }"
    style="min-width: 20vw"
  >
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-delay="100"
      class="bg-gradient-to-tl to-slate-700 from-slate-600 shadow-lg h-full flex flex-col justify-between"
    >
      <div class="overflow-hidden aspect-video">
        <div class="scale transition-all delay-100 flex-grow">
          <img
            :src="image"
            v-if="image"
            class="mx-auto relative top-0 object-contain aspect-video w-full"
          />
          <!-- :style="{
              transform: `translate(${
                (relativeMouse.x - $el.clientWidth) / 100
              }px, ${(relativeMouse.y - $el.clientWidth) / 100}px)`,
            }" -->
        </div>
      </div>
      <h1 class="text-4xl font-bold text-left mx-4 mb-5 mt-2">{{ title }}</h1>
      <slot class="text-left"></slot>
      <button
        class="w-full bg-teal-500 rounded-b-lg p-1 hover:bg-teal-700 hover:text-blue-200 transition-all text-lg relative bottom-0"
        @click="$emit('showMore')"
      >
        Zobraziť viac
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop({ required: false }) image!: string;
  @Prop({ required: true }) title!: string;
  relativeMouse = { x: 0, y: 0 };

  onMouseMove(e: MouseEvent): void {
    const rect = this.$el.getBoundingClientRect();
    this.relativeMouse = {
      x: e.clientX - rect.top - rect.width / 2,
      y: e.clientY - rect.left - rect.height / 2,
    };
  }
}
</script>

<style lang="scss">
.card {
  min-width: 30vw;
  padding: 0;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 25px 50px -12px;
    perspective: 600px;
    .scale {
      transform: scale(105%);
    }
  }
}
</style>
