<template>
  <div
    class="hover:scale-105 transition-all drop-shadow-sm to-zinc-600 from-zinc-500 p-3 shadow-xl bg-gradient-to-br rounded-xl w-full"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <img
      :src="technology.icon"
      :alt="technology.name"
      class="w-full object-contain aspect-square"
    />
    <transition
      enter-active-class="transition-all duration-500"
      leave-active-class="transition-all duration-500"
      enter-class="opacity-0 scale-60"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-60"
    >
      <div
        class="absolute -top-8 text-slate-50 text-center w-full left-0 bg-zinc-900 py-2 rounded-full drop-shadow-xl"
        v-if="hovered"
      >
        {{ technology.name }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Technology } from "@/api";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class TechnologyButton extends Vue {
  @Prop() technology!: Technology;
  hovered = false;
}
</script>
