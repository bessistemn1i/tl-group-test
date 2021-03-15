<template>
  <div class="table-wrapper">
    <router-link class="nav-link" to="/">Назад</router-link>
    <div class="container-centered" v-if="isFiltersSaved">
      <div class="table-filters">
        <header class="table-filters__header">
          <h1>Фильтры</h1>
        </header>
        <div class="input-container">
          <label class="input-container__label" for="filterByLogin"
            >по логину:</label
          >
          <input
            id="filterByLogin"
            v-model="currentFilterByLogin"
            v-on:input="filtredByLogin()"
            type="text"
            placeholder="Введите логин"
          />
        </div>
        <div class="input-container">
          <label class="input-container__label" for="ordersFrom">от:</label>
          <input
            ref="start"
            v-on:change="filtredByOder()"
            v-model="numberOfOrdersFrom"
            type="number"
            id="ordersFrom"
            class="inputByNum"
          />
          <label class="input-container__label" for="ordersBefore">до:</label>
          <input
            ref="end"
            v-on:change="filtredByOder()"
            v-model="numberOfOrdersBefore"
            type="number"
            id="ordersBefore"
            class="inputByNum"
          />
        </div>
        <div class="input-container">
          <label class="input-container__label" for="selectByStatus"
            >по статусу:</label
          >
          <select
            id="selectByStatus"
            v-model="currentFilterBySelect"
            v-on:change="filtredByStatus()"
          >
            <option value="" disabled selected>Выберите статус</option>
            <option value="Ценитель красоты">Ценитель красоты</option>
            <option value="Поставщик аксессуаров">Поставщик аксессуаров</option>
            <option value="охотник">охотник</option>
            <option value="рыбак">рыбак</option>
            <option value="Конкурент минздрава">Конкурент минздрава</option>
          </select>
        </div>
      </div>
      <div class="table-container">
        <h2 v-if="!isFilterCorrect">По вашему запросы данные не найдены.</h2>
        <table v-else>
          <thead>
            <tr class="table-tr">
              <th>
                <button v-on:click="sortTable('moreToLess', 'place')">
                  Место
                  <span
                    v-if="
                      currentTypeOfSort === 'moreToLess' &&
                        currentTableCell === 'place'
                    "
                    >↓</span
                  ><span
                    v-else-if="
                      currentTypeOfSort === 'lessToMore' &&
                        currentTableCell === 'place'
                    "
                    >↑</span
                  ><span v-else>↕</span>
                </button>
              </th>
              <th>
                <button v-on:click="sortTable('az', 'login')">
                  Логин
                  <span
                    v-if="
                      currentTypeOfSort === 'az' && currentTableCell === 'login'
                    "
                    >↓</span
                  ><span
                    v-else-if="
                      currentTypeOfSort === 'za' && currentTableCell === 'login'
                    "
                    >↑</span
                  ><span v-else>↕</span>
                </button>
              </th>
              <th>
                <button
                  v-on:click="
                    sortTable('moreToLess', 'numberOfConfirmedOrders')
                  "
                >
                  Подтвежденные заказы
                  <span
                    v-if="
                      currentTypeOfSort === 'moreToLess' &&
                        currentTableCell === 'numberOfConfirmedOrders'
                    "
                    >↓</span
                  ><span
                    v-else-if="
                      currentTypeOfSort === 'lessToMore' &&
                        currentTableCell === 'numberOfConfirmedOrders'
                    "
                    >↑</span
                  ><span v-else>↕</span>
                </button>
              </th>
              <th>
                <button v-on:click="sortTable('az', 'status')">
                  Статус
                  <span
                    v-if="
                      currentTypeOfSort === 'az' &&
                        currentTableCell === 'status'
                    "
                    >↓</span
                  ><span
                    v-else-if="
                      currentTypeOfSort === 'za' &&
                        currentTableCell === 'status'
                    "
                    >↑</span
                  ><span v-else>↕</span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="table-tr"
              v-for="(user, userIndex) in filtredTable"
              :key="userIndex"
            >
              <td>{{ user.place }}</td>
              <td>{{ user.login }}</td>
              <td>{{ user.numberOfConfirmedOrders }}</td>
              <td>{{ user.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h2 v-else>Не выбраны фильтры или сортировка</h2>
  </div>
</template>

<script>
export default {
  name: 'UpdatedTable',
  data() {
    return {
      users: [
        {
          place: 1,
          login: 'smith@gmail.com',
          numberOfConfirmedOrders: 312,
          status: 'Ценитель красоты',
        },
        {
          place: 2,
          login: 'lenin@gmail.com',
          numberOfConfirmedOrders: 120,
          status: 'Поставщик аксессуаров',
        },
        {
          place: 3,
          login: 'mask@gmail.com',
          numberOfConfirmedOrders: 928,
          status: 'Конкурент минздрава',
        },
        {
          place: 4,
          login: 'dog@mail.ru',
          numberOfConfirmedOrders: 64,
          status: 'рыбак',
        },
        {
          place: 5,
          login: 'nightmare@mail.ru',
          numberOfConfirmedOrders: 34,
          status: 'охотник',
        },
        {
          place: 6,
          login: 'cat@mail.ru',
          numberOfConfirmedOrders: 1,
          status: 'Ценитель красоты',
        },
      ],
      currentTypeOfSort: '',
      currentTableCell: '',
      currentFilterBySelect: '',
      currentFilterByLogin: '',
      numberOfOrdersFrom: 0,
      numberOfOrdersBefore: 0,
      filtredTable: this.users,
      isFilterCorrect: true,
      isFiltersSaved: false
    };
  },

  created() {
    this.currentTableCell = this.$route.query.currentTableCell;
    this.isFiltersSaved = this.$route.query.isFiltersSaved;
    this.currentTypeOfSort = this.$route.currentTypeOfSort;
    this.currentFilterByLogin = this.$route.query.currentFilterByLogin;
    this.currentFilterBySelect = this.$route.query.currentFilterBySelect;
    this.numberOfOrdersFrom = +this.$route.query.filtredByOderStart;
    this.numberOfOrdersBefore = +this.$route.query.filtredByOderEnd;
    if (this.currentFilterByLogin && this.currentFilterByLogin.length > 0) {
      this.filtredByLogin();
    }
    if (this.currentFilterBySelect && this.currentFilterBySelect.length > 0) {
      this.filtredByStatus();
    }
    if (this.numberOfOrdersFrom > 0 && this.numberOfOrdersBefore > 0) {
      this.filtredByOder();
    }
    this.sortTable(
      this.$route.query.currentTypeOfSort,
      this.$route.query.currentTableCell
    );
  },

  methods: {
    sortTable(currentTypeOfSort, currentTableCell) {
      let sort = this.currentTypeOfSort
        ? this.currentTypeOfSort
        : currentTypeOfSort;
      let newUsers = '';
      switch (currentTableCell) {
        case 'place':
        case 'numberOfConfirmedOrders':
          if (sort === 'lessToMore') {
            newUsers = this.filtredTable.sort(
              (prev, next) =>
                next[`${currentTableCell}`] - prev[`${currentTableCell}`]
            );
            this.currentTypeOfSort = 'moreToLess';
            this.currentTableCell = currentTableCell;
          } else if (sort === 'moreToLess') {
            newUsers = this.filtredTable.sort(
              (prev, next) =>
                prev[`${currentTableCell}`] - next[`${currentTableCell}`]
            );
            this.currentTypeOfSort = 'lessToMore';
            this.currentTableCell = currentTableCell;
          }
          break;
        case 'login':
        case 'status':
          if (sort === 'az') {
            newUsers = this.filtredTable.sort((prev, next) => {
              if (
                prev[`${currentTableCell}`].toLowerCase() >
                next[`${currentTableCell}`].toLowerCase()
              )
                return -1;
              if (
                prev[`${currentTableCell}`].toLowerCase() <
                next[`${currentTableCell}`].toLowerCase()
              )
                return 1;
            });
            if (!this.currentTypeOfSort) {
              this.currentTypeOfSort = 'az';
            } else {
              this.currentTypeOfSort = 'za';
            }

            this.currentTableCell = currentTableCell;
          } else if (sort === 'za') {
            newUsers = this.filtredTable.sort((prev, next) => {
              if (
                prev[`${currentTableCell}`].toLowerCase() <
                next[`${currentTableCell}`].toLowerCase()
              )
                return -1;
              if (
                prev[`${currentTableCell}`].toLowerCase() >
                next[`${currentTableCell}`].toLowerCase()
              )
                return 1;
            });
            if (!this.currentTypeOfSort) {
              this.currentTypeOfSort = 'za';
            } else {
              this.currentTypeOfSort = 'az';
            }
            this.currentTableCell = currentTableCell;
          }
          break;
        default:
          newUsers = 'default';
      }
      this.users = newUsers;
    },

    filtredByLogin() {
      this.currentFilterBySelect = null;
      this.numberOfOrdersFrom = 0;
      this.numberOfOrdersBefore = 0;
      const fltredbyUser = this.users.filter((user) =>
        user.login.toLowerCase().startsWith(this.currentFilterByLogin)
      );
      if (fltredbyUser.length === 0) {
        this.isFilterCorrect = false;
      } else {
        if (fltredbyUser.length > 0) {
          this.filtredTable = fltredbyUser;
        } else {
          this.filtredTable = this.filtredTable;
        }
      }
    },

    filtredByStatus() {
      this.numberOfOrdersFrom = 0;
      this.numberOfOrdersBefore = 0;
      this.currentFilterByLogin = '';
      if (this.filtredTable === undefined) {
        this.filtredTable = this.users;
      }
      const fltredbyStatus = this.users.filter(
        (user) => user.status === this.currentFilterBySelect
      );
      if (fltredbyStatus.length > 0) {
        this.filtredTable = fltredbyStatus;
      } else {
        this.filtredTable = this.filtredTable;
      }
    },

    filtredByOder() {
      this.currentFilterBySelect = null;
      this.currentFilterByLogin = '';
      if (this.filtredTable === undefined) {
        this.filtredTable = this.users;
      }
      const filtredByOrder = this.users.filter((user) => {
        return (
          user.numberOfConfirmedOrders >= this.numberOfOrdersFrom &&
          user.numberOfConfirmedOrders <= this.numberOfOrdersBefore
        );
      });

      if (filtredByOrder.length === 0) {
        this.isFilterCorrect = false;
      } else {
        this.isFilterCorrect = true;
        if (filtredByOrder.length > 0 && this.numberOfOrdersBefore) {
          this.filtredTable = filtredByOrder;
        } else {
          this.filtredTable = this.filtredTable;
        }
      }
    },

    clearFilter() {
      this.filtredTable = this.users;
      this.numberOfOrdersFrom = 0;
      this.numberOfOrdersBefore = 0;
      this.sortedType = '';
      this.currentTableCell = '';
      this.currentTypeOfSort = '';
      this.currentFilterBySelect = null;
    },
  },
};
</script>
