<template>
  <Splitpanes class="smart-splitter" :dbl-click-splitter="false" vertical>
    <Pane class="hide-scrollbar !overflow-auto">
      <div
        class="
          divide-primaryDark divide-x
          bg-primaryLight
          flex-1
          w-full
          top-0
          sticky
          inline-flex
          relative
        "
      >
        <draggable
          v-bind="dragOptions"
          :list="tabs"
          :style="tabsWidth"
          class="flex transition overflow-x-auto hide-scrollbar"
        >
          <transition-group
            class="divide-primaryDark divide-x flex"
            name="fade"
            appear
          >
            <template v-for="tab in tabs">
              <div
                :key="tab.id"
                :class="[active(tab.id), 'tab']"
                @mousedown="changeTab(tab.id)"
              >
                <span class="truncate">{{ tab.name }}</span>
                <ButtonSecondary
                  svg="x"
                  :class="[active(tab.id), 'close']"
                  class="rounded ml-4"
                  @mousedown="beforeCloseTab($event)"
                  @click.native="closeTab(tab.id)"
                />
              </div>
            </template>
          </transition-group>
        </draggable>
        <span class="bg-primaryLight flex px-1 items-center justify-center">
          <ButtonSecondary
            svg="plus"
            class="rounded right-0 sticky"
            @click.native="addTab"
          />
        </span>
      </div>
      <Splitpanes class="smart-splitter" :dbl-click-splitter="false" horizontal>
        <Pane class="hide-scrollbar !overflow-auto">
          <div class="content">
            <template v-for="tab in tabs">
              <div :key="tab.id" :class="[active(tab.id), 'tab-content']">
                {{ tab.id }}
              </div>
            </template>
          </div>
        </Pane>
        <Pane class="hide-scrollbar !overflow-auto">
          <div class="content">
            <template v-for="tab in tabs">
              <div :key="tab.id" :class="[active(tab.id), 'tab-content']">
                {{ tab.id }}
              </div>
            </template>
          </div>
        </Pane>
      </Splitpanes>
    </Pane>
    <Pane
      max-size="35"
      size="25"
      min-size="20"
      class="hide-scrollbar !overflow-auto"
    >
      <aside>Sidebar</aside>
    </Pane>
  </Splitpanes>
</template>

<script setup lang="ts">
import draggable from "vuedraggable"
import { Splitpanes, Pane } from "splitpanes"
import "splitpanes/dist/splitpanes.css"
import { computed, ref } from "@nuxtjs/composition-api"

const currentTabId = ref(1)
const nextTabId = ref(4)
const tabs = ref([
  {
    id: 1,
    name: "Untitled request",
  },
])

const dragOptions = computed(() => ({
  group: "tabs",
  animation: 250,
  handle: ".tab",
  draggable: ".tab",
  ghostClass: "-dragging",
}))

const tabsWidth = computed(() => ({
  maxWidth: tabs.value.length * 184 + "px",
  width: "100%",
  minWidth: "0px",
  transition: "max-width 0.2s",
}))

const active = (id: number) => id === currentTabId.value && "-active"

const changeTab = (id: number) => {
  currentTabId.value = id
}

const beforeCloseTab = (e: { stopPropagation: () => void }) => {
  e.stopPropagation()
}

const addTab = () => {
  tabs.value.push({
    id: nextTabId.value,
    name: "Untitled request",
  })
  currentTabId.value = nextTabId.value
  nextTabId.value++
}

const closeTab = (id: number) => {
  if (tabs.value.length - 1)
    tabs.value.forEach((tab, index) => {
      tab.id === id &&
        tabs.value.splice(index, 1) &&
        currentTabId.value === id &&
        (currentTabId.value = tabs.value[index]
          ? tabs.value[index].id
          : tabs.value[index - 1].id)
    })
}
</script>

<style lang="scss" scoped>
.tab {
  @apply relative;
  @apply flex;
  @apply pl-4;
  @apply pr-1;
  @apply py-1;
  @apply font-semibold;
  @apply w-46;
  @apply transition;
  @apply flex-1;
  @apply items-center;
  @apply justify-between;
  @apply text-secondaryLight;
  @apply hover:bg-primaryDark;
  @apply hover:text-secondary;
  @apply before:hover:bg-primaryDark;

  &.-active {
    @apply text-secondaryDark;
    @apply bg-primary;
  }
}

.tab-content {
  @apply p-4;
  @apply hidden;

  &.-active {
    @apply flex;
  }
}

.close {
  @apply opacity-50;

  &.-active {
    @apply opacity-100;
  }
}
</style>
