<template>
  <div
    class="fixed w-screen h-screen z-20 top-0 flex justify-center items-center"
  >
    <div class="absolute container justify-center p-3 bg-slate-700 rounded-md">
      <h2 class="font-roboto text-2xl text-teal-600">{{ project.name }}</h2>
      <button
        class="absolute transition-all top-0 right-0 w-10 h-10 text-xl rounded-full hover:bg-teal-600"
        @click="exit"
      >
        <p class="block text-teal-50">x</p>
      </button>
      <hr />
      <div class="flex lg:flex-row flex-col">
        <carousel
          :images="project.images"
          v-if="project.images"
          class="lg:w-1/2 relative m-2"
        />
        <div class="lg:w-1/2 flex flex-col justify-between">
          <p class="text-teal-50 mt-2">
            {{ project.text || project.description }}
          </p>
          <div>
            <button
              v-for="download in project.downloadLinks"
              :href="download.url"
              class="text-center bg-teal-700 text-teal-50 p-2 pl-6 pr-4 hover:bg-teal-400 transition-all rounded-full w-full mb-2"
              :key="download.url"
              @click="click(download)"
            >
              <p v-if="download.text">{{ download.text }}</p>
              <div v-else>
                <div
                  v-if="download.platform === 'web'"
                  class="flex items-center justify-between"
                >
                  <p>Otvoriť v prehliadači</p>
                  <img src="@/assets/open-web.svg" class="w-8 h-8" />
                </div>
                <div
                  v-else-if="download.platform === 'github'"
                  class="flex items-center justify-between"
                >
                  <p v-if="download.text === undefined">Zdrojový kód</p>
                  <p v-else>{{ download.text }}</p>
                  <img src="@/assets/github.svg" class="w-8 h-8" />
                </div>
                <div
                  v-else-if="download.platform === 'linux'"
                  class="flex items-center justify-between"
                >
                  <p>Stiahnuť pre linux</p>
                  <img src="@/assets/linux.svg" class="w-8 h-8" />
                </div>
                <div
                  v-else-if="download.platform === 'windows'"
                  class="flex items-center justify-between"
                >
                  <p>Stiahnuť pre windows</p>
                  <img src="@/assets/windows.svg" class="w-8 h-8" />
                </div>
                <div
                  v-else-if="download.platform === 'android'"
                  class="flex items-center justify-between"
                >
                  <p>Stiahnuť pre android</p>
                  <img src="@/assets/android.svg" class="w-8 h-8" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DownloadOption, Project } from "@/api";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Carousel from "./Carousel.vue";

@Component({ components: { Carousel } })
export default class Overview extends Vue {
  @Prop({ required: true }) project!: Project;

  exit(): void {
    this.$emit("exit");
  }

  click(link: DownloadOption): void {
    const elem = document.createElement("a");
    elem.setAttribute("href", link.url);
    elem.setAttribute("target", "_blank");
    elem.setAttribute("download", link.url.endsWith(".zip") ? "true" : "false");
    elem.click();
  }
}
</script>
