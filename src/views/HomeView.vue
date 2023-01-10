<template>
  <div class="home">
    <section
      class="w-screen h-screen m-0 p-0 bg-slate-700 text-slate-100 flex justify-center items-center"
    >
      <h1
        class="text-9xl font-roboto z-10"
        data-aos="zoom-in"
        data-aos-delay="0"
        data-aos-duration="500"
      >
        Vitaj
      </h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        class="absolute bottom-1/4 left-0"
      >
        <path
          class="fill-teal-700 z-0"
          fill-opacity="1"
          d="M0,160L60,149.3C120,139,240,117,360,112C480,107,600,117,720,133.3C840,149,960,171,1080,170.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <div class="absolute bg-teal-700 w-full h-1/4 bottom-0 left-0">
        <p data-aos="fade-up" data-aos-delay="600" data-aos-duration="300">
          Na tejto krásnej stránke vieš nájsť všetky "projekty" (respektíve skôr
          tú dokončenejšiu časť z nich), ktoré som naprogramoval. Všetko okrem
          grafiky v špongiových hrách je čisto moje.
        </p>
      </div>
    </section>
    <section class="bg-gradient-to-b to-teal-600 from-teal-700 z-0">
      <h2 class="font-roboto text-6xl mb-5 text-teal-50">Moje projekty</h2>
      <div class="absolute h-screen w-28 opacity-0"></div>
      <div
        class="container mx-auto flex md:flex-row flex-col md:flex-wrap justify-center"
      >
        <card
          :image="project.titleImage || '/logo.png'"
          :title="project.name"
          v-for="project in projects"
          :key="project.name"
          @showMore="selectProject(project)"
        >
          <p>{{ project.description }}</p>
        </card>
      </div>
    </section>
    <img src="@/assets/wave-top.svg" class="w-full" />
    <section class="from-indigo-900 to-indigo-700 bg-gradient-to-b">
      <h2 class="font-roboto font-light text-5xl text-red-50 mb-12 pt-20">
        Mnou používané technológie
      </h2>
      <p class="text-indigo-50">
        Alebo, čo bolo použité pri vytváraní vecí, čo vidíš hore a čomu sa aspoň
        trochu rozumiem
      </p>
      <div class="container mx-auto flex flex-wrap justify-center">
        <div
          class="lg:w-1/12 sm:w-1/6 w-1/4 m-4"
          v-for="technology in technologies"
          :key="technology.name"
        >
          <technology-button :technology="technology" />
        </div>
      </div>
      <div class="text-center text-indigo-200">© 2023 | Stanko</div>
    </section>
    <transition
      enter-active-class="modal-active"
      leave-active-class="modal-active"
      enter-class="modal-enter"
      enter-to-class="modal-enter-to"
      leave-class="modal-enter-to"
      leave-to-class="modal-enter"
    >
      <overview
        v-if="selectedProject !== null"
        :project="selectedProject"
        @exit="selectedProject = null"
      />
    </transition>
    <transition
      enter-active-class="transition-all duration-1000"
      leave-active-class="transition-all duration-1000"
      enter-class="backdrop-enter"
      enter-to-class="backdrop-enter-to"
      leave-class="backdrop-leave"
      leave-to-class="backdrop-leave-to"
    >
      <div
        class="w-screen h-screen fixed top-0 bg-opacity-50 bg-black z-0 backdrop-blur-md"
        v-if="selectedProject !== null"
      ></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Card from "@/components/Card.vue";
import Overview from "@/components/Overview.vue";
import { FetchProjects, FetchTechnologies, Project, Technology } from "@/api";
import TechnologyButton from "@/components/TechnologyButton.vue";

@Component({
  components: {
    HelloWorld,
    Card,
    Overview,
    TechnologyButton,
  },
})
export default class HomeView extends Vue {
  projects: Project[] = [];
  technologies: Technology[] = [];
  selectedProject: Project | null = null;
  mounted(): void {
    FetchProjects().then((p) => (this.projects = p));
    FetchTechnologies().then((t) => (this.technologies = t));
  }

  selectProject(project: Project) {
    this.selectedProject = project;
  }
}
</script>

<style lang="scss">
.modal {
  &-active {
    transition: all;
    transition-duration: 250ms;
    transition-delay: 250ms;
  }
  &-enter {
    opacity: 0.1;
    transform: scale(0.2);
  }
  &-enter-to {
    opacity: 1;
    transform: scale(1);
  }
}

.backdrop {
  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
  }
}
</style>
