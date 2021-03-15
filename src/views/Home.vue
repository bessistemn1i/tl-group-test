<template>
  <div class="home">
    <div id="nav" class="nav">
      <router-link tag="button" class="nav-link" to="/">Главная</router-link>
      <a class="nav-link" :class="!isFiltersSaved ? 'nav-link__disabled' : ''" :href="'/sorted-table/?' + this.href">Таблица c фильтрами</a>
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
      href: '',
    };
  },
  components: {
    ProgressOfUsers,
  },
  methods: {
    updateTableParams(params) {
      this.tableParams = params;
      for (const key in this.tableParams) {
        if (Object.hasOwnProperty.call(this.tableParams, key)) {
          const element = this.tableParams[key];
          if (element !== undefined) {
            this.href += `${key}=${element}&`;
          }
        }
      }
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

.nav-link__disabled {
  cursor: pointer;
  pointer-events: none;
  color: #ccc;
}
</style>
