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
          :list="tabs"
          class="flex transition overflow-x-auto hide-scrollbar"
          v-bind="dragOptions"
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

<script>
import draggable from "vuedraggable"
import { Splitpanes, Pane } from "splitpanes"
import "splitpanes/dist/splitpanes.css"

export default {
  components: { Splitpanes, Pane, draggable },
  data() {
    return {
      currentTabId: 1,
      nextTabId: 4,
      tabs: [
        {
          id: 1,
          name: "Untitled request",
        },
      ],
    }
  },
  computed: {
    active() {
      return (id) => id === this.currentTabId && "-active"
    },
    dragOptions() {
      return {
        animation: 250,
        disabled: false,
        ghostClass: "-dragging",
      }
    },
  },
  methods: {
    changeTab(id) {
      this.currentTabId = id
    },
    beforeCloseTab(e) {
      e.stopPropagation()
    },
    addTab() {
      this.tabs.push({
        id: this.nextTabId,
        name: "Untitled request",
      })
      this.currentTabId = this.nextTabId
      this.nextTabId++
    },
    closeTab(id) {
      if (this.tabs.length - 1)
        this.tabs.forEach((tab, index) => {
          tab.id === id &&
            this.tabs.splice(index, 1) &&
            this.currentTabId === id &&
            (this.currentTabId = this.tabs[index]
              ? this.tabs[index].id
              : this.tabs[index - 1].id)
        })
    },
  },
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
  @apply max-w-46;
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

  &.-dragging {
    @apply opacity-0;
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
