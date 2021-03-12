<template>
  <div class="home">
    <div id="nav" class="nav">
      <router-link tag="button" class="nav-link" to="/">Главная</router-link> |
      <router-link
        tag="button"
        :disabled="!isFiltersSaved"
        class="nav-link"
        :to="{ name: 'UpdatedTable', params: tableParams }"
        >Таблица c фильтрами</router-link
      >
    </div>
    <ProgressOfUsers @updateTableParams="updateTableParams" />
  </div>
</template>

<script>
import ProgressOfUsers from '@/components/ProgressOfUsers.vue';

export default {
  name: 'Home',
  data() {
    return {
      tableParams: {},
      isFiltersSaved: false,
    };
  },
  components: {
    ProgressOfUsers,
  },
  methods: {
    updateTableParams(params) {
      this.tableParams = params;
      this.isFiltersSaved = params.isFiltersSaved;
    },
  },
};
</script>

<style>
.home {
  width: 100%;
}
.nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.nav-link {
  font-size: 16px;
  padding: 7px 12px;
  background: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
}
</style>
