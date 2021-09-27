<template>
  <SmartModal
    v-if="show"
    :title="$t('import.openapi')"
    max-width="sm:max-w-md"
    dialog
    @close="hideModal"
  >
    <template #body>
      <div class="flex flex-col px-2">
        <div class="flex relative pb-4">
          <input
            id="baseUrl"
            v-model="serverURL"
            v-focus
            class="input floating-input"
            placeholder=" "
            type="text"
            autocomplete="off"
          />
          <label for="baseUrl">{{ $t("request.base_url") }}</label>
        </div>
        <div
          v-for="(request, index) in imported.requests"
          :key="`${request.name}_${index}`"
          class="flex items-center group"
        >
          <span
            class="
              cursor-pointer
              flex
              px-2
              w-16
              justify-center
              items-center
              truncate
            "
            @click="toggleEnabled(index)"
          >
            <ButtonSecondary
              v-tippy="{ theme: 'tooltip' }"
              :svg="
                importedRequests[index] === true ? 'check-square' : 'square'
              "
              :title="
                importedRequests[index] === true
                  ? $t('action.turn_off')
                  : $t('action.turn_on')
              "
              class="rounded"
            />
          </span>
          <span
            class="
              cursor-pointer
              flex flex-1
              min-w-0
              py-2
              pr-2
              transition
              items-center
              group-hover:text-secondaryDark
            "
            @click="toggleEnabled(index)"
          >
            <span class="truncate"> {{ request.name }} </span>
          </span>
        </div>
      </div>
    </template>
    <template #footer>
      <span>
        <ButtonPrimary
          :label="$t('action.save')"
          @click.native="importCollection"
        />
        <ButtonSecondary
          :label="$t('action.cancel')"
          @click.native="hideModal"
        />
      </span>
    </template>
  </SmartModal>
</template>

<script>
import cloneDeep from "lodash/cloneDeep"
import { appendRESTCollections } from "~/newstore/collections"

export default {
  props: {
    show: Boolean,
    imported: {
      type: Object,
      default: () => ({
        requests: [],
      }),
    },
  },
  data() {
    return {
      importedRequests: this.imported.requests.map((_) => true),
      serverURL: "",
    }
  },
  watch: {
    imported(newVal, oldVal) {
      if (newVal.requests.length !== oldVal.requests.length)
        this.importedRequests = newVal.requests.map((_) => true)
    },
  },
  methods: {
    hideModal() {
      this.serverURL = ""
      this.$emit("hide-modal")
    },
    toggleEnabled(ind) {
      this.importedRequests = this.importedRequests.map((val, index) =>
        ind === index ? !val : val
      )
    },
    importCollection() {
      const collectionAdded = cloneDeep(this.imported)
      collectionAdded.requests = collectionAdded.requests
        .filter((_, i) => this.importedRequests[i])
        .map((req) => ({
          ...req,
          url: this.serverURL,
        }))
      console.log({ collectionAdded })
      appendRESTCollections([collectionAdded])
      this.hideModal()
    },
  },
}
</script>
