<template>
  <div class="table-wrapper">
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
          v-on:input="filterByLogin()"
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
      <div class="filters-btn__container">
        <button class="filters-btn" v-on:click="clearFilters()">
          Очистить фильтр
        </button>
        <button :disabled="isFiltersSaved" class="filters-btn" v-on:click="saveFilters()">
          {{ isFiltersSaved ? 'Сохранено' : 'Сохранить фильтры' }}
        </button>
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
                v-on:click="sortTable('moreToLess', 'numberOfConfirmedOrders')"
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
                    currentTypeOfSort === 'az' && currentTableCell === 'status'
                  "
                  >↓</span
                ><span
                  v-else-if="
                    currentTypeOfSort === 'za' && currentTableCell === 'status'
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
</template>

<script>
export default {
  name: 'ProgressOfUsers',
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
      isFiltersSaved: false,
      isFilterCorrect: true,
      routeParams: {},
    };
  },

  created() {
    this.currentTypeOfSort = '';
    this.currentTableCell = '';
    this.currentFilterBySelect = null;
    this.currentFilterByLogin = '';
    this.numberOfOrdersFrom = 0;
    this.numberOfOrdersBefore = 0;
    this.filtredTable = this.users;
  },

  methods: {
    sortTable(currentTypeOfSort, currentTableCell) {
      let sort =
        this.currentTypeOfSort.length > 0
          ? this.currentTypeOfSort
          : currentTypeOfSort;
      let newUsers = '';
      switch (currentTableCell) {
        case 'place':
        case 'numberOfConfirmedOrders':
          if (sort === 'lessToMore') {
            newUsers = this.filtredTable.sort(
              (prev, next) =>
                prev[`${currentTableCell}`] - next[`${currentTableCell}`]
            );
            this.currentTypeOfSort = 'moreToLess';
            this.currentTableCell = currentTableCell;
          } else {
            newUsers = this.filtredTable.sort(
              (prev, next) =>
                next[`${currentTableCell}`] - prev[`${currentTableCell}`]
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
            this.currentTypeOfSort = 'za';
            this.currentTableCell = currentTableCell;
          } else {
            newUsers = this.users.sort((prev, next) => {
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
            this.currentTypeOfSort = 'az';
            this.currentTableCell = currentTableCell;
          }
          break;
        case 'za':
          break;
        default:
          newUsers = 'default';
      }
      this.users = newUsers;
    },

    filterByLogin() {
      this.currentFilterBySelect = null;
      this.numberOfOrdersFrom = 0;
      this.numberOfOrdersBefore = 0;
      const fltredbyUser = this.users.filter((user) =>
        user.login.toLowerCase().startsWith(this.currentFilterByLogin)
      );
      if (fltredbyUser.length === 0) {
        this.isFilterCorrect = false;
      } else {
        this.isFilterCorrect = true;
        this.routeParams.currentFilterByLogin = this.currentFilterByLogin;
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
      const fltredbyStatus = this.users.filter(
        (user) => user.status === this.currentFilterBySelect
      );
      this.routeParams.currentFilterBySelect = this.currentFilterBySelect;
      if (fltredbyStatus.length > 0) {
        this.filtredTable = fltredbyStatus;
      } else {
        this.filtredTable = this.filtredTable;
      }
    },

    filtredByOder() {
      this.currentFilterBySelect = null;
      this.currentFilterByLogin = '';
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
        this.routeParams.filtredByOderStart = this.numberOfOrdersFrom;
        if (this.$refs.start.value > 0 && this.$refs.end.value > 0) {
          this.routeParams.filtredByOderEnd = this.numberOfOrdersBefore;
        }
        if (filtredByOrder.length > 0 && this.numberOfOrdersBefore) {
          this.filtredTable = filtredByOrder;
        } else {
          this.filtredTable = this.filtredTable;
        }
      }
    },

    saveFilters() {
      this.isFiltersSaved = true;
      this.routeParams.isFiltersSaved = this.isFiltersSaved;
      this.routeParams.currentTypeOfSort = this.currentTypeOfSort;
      this.routeParams.currentTableCell = this.currentTableCell;
      this.$emit('updateTableParams', this.routeParams);
    },

    clearFilters() {
      this.filtredTable = this.users;
      this.numberOfOrdersFrom = 0;
      this.numberOfOrdersBefore = 0;
      this.currentTableCell = '';
      this.currentTypeOfSort = '';
      this.currentFilterBySelect = null;
      this.currentFilterByLogin = '';
      this.isFiltersSaved = false;
    },
  },
};
</script>

<style>
table {
  border: 1px solid #69c;
}
th {
  border-bottom: 1px dashed #69c;
}
button {
  padding: 12px 17px;
  background: none;
  box-shadow: none;
  border: 0;
  font-weight: normal;
  cursor: pointer;
}
td {
  color: #669;
  padding: 7px 17px;
}
tr:hover td {
  background: #ccddff;
}

.table-filters {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 320px;
}

.table-filters__header {
  width: 100%;
  text-align: center;
}

.table-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

@media screen and (min-device-width: 700px) {
  .table-container {
    display: flex;
    justify-content: center;
  }
}

.inputByNum {
  width: 60px;
  margin-right: 20px;
}

.input-container {
  margin-bottom: 25px;
}

.input-container input {
  padding: 8px 10px;
  border-radius: 5px;
  box-shadow: none;
}

.input-container input[type='number'] {
  text-align: center;
}

select {
  height: 30px;
  border-radius: 5px;
  background: none;
}

.input-container__label {
  margin-right: 15px;
  font-size: 16px;
  font-weight: 700;
}

.filters-btn__container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
  max-width: 300px;
}

.filters-btn {
  padding: 5px 12px;
  border: 1px solid #000;
  border-radius: 5px;
  font-size: 14px;
}
</style>
