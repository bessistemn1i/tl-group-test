<template>
    <div class="table-wrapper">
      {{$route.params}}
      {{this.usersBySelect}}
        <div class="table-filters">
            <div class="input-container">
                <label for="filterByLogin">Отфильтровать по логину</label>
                <input id="filterByLogin" v-model="usersByLogin" v-on:input="filtredByLogin()" type="text" placeholder="Введите логин" />
            </div>
            <div class="input-container">
                <input v-on:change="filtredByOder()" v-model="orderFrom" type="number" id="ordersFrom"/>
                <input v-on:change="filtredByOder()" v-model="orderBefore" type="number" id="ordersBefore"/>
            </div>
            <div class="input-container"><select v-model="usersBySelect" v-on:change="filtredByStatus()">
                <option>Ценитель красоты</option>
                <option>Поставщик аксессуаров</option>
                <option>охотник</option>
                <option>рыбак</option>
                <option>Конкурент минздрава</option> 
            </select>
            </div>
            <button v-on:click="clearFilter()">Очистить фильтр</button>
        </div>
    <table>
        <thead>
                <tr>
                    <th><button v-on:click="sortLessToMore(sortType, 'place')">Место <span v-if="sortType ==='more' && value === 'place'">↓</span><span v-else-if="sortType ==='less' && value === 'place'">↑</span><span v-else>↕</span></button></th>
                    <th><button v-on:click="sortLessToMore(sortTypeAlphabet, 'login')">Логин <span v-if="sortTypeAlphabet ==='alphabetMore' && value === 'login'">↓</span><span v-else-if="sortTypeAlphabet ==='alphabetLess' && value === 'login'">↑</span><span v-else>↕</span></button></th>
                    <th><button v-on:click="sortLessToMore(sortType, 'numberOfConfirmedOrders')">Подтвежденные заказы <span v-if="sortType ==='more' && value === 'numberOfConfirmedOrders'">↓</span><span v-else-if="sortType ==='less' && value === 'numberOfConfirmedOrders'">↑</span><span v-else>↕</span></button></th>
                    <th><button v-on:click="sortLessToMore(sortTypeAlphabet, 'status')">Статус <span v-if="sortTypeAlphabet ==='alphabetMore' && value === 'status'">↓</span><span v-else-if="sortTypeAlphabet ==='alphabetLess' && value === 'status'">↑</span><span v-else>↕</span></button></th>
                </tr>
        </thead>
        <tbody>
            <tr v-for="(user, userIndex) in filtredUsers" :key="userIndex">
                <td>{{user.place}}</td>
                <td>{{user.login}}</td>
                <td>{{user.numberOfConfirmedOrders}}</td>
                <td>{{user.status}}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
    export default {
        name: 'UserProgress',
        data() {
            return {
                users: [{
                    place: 1,
                    login: 'smith@gmail.com',
                    numberOfConfirmedOrders: 312,
                    status: 'Ценитель красоты'
                },
                {
                    place: 2,
                    login: 'lenin@gmail.com',
                    numberOfConfirmedOrders: 120,
                    status: 'Поставщик аксессуаров'
                },
                {
                    place: 3,
                    login: 'mask@gmail.com',
                    numberOfConfirmedOrders: 928,
                    status: 'Конкурент минздрава'
                },
                {
                    place: 4,
                    login: 'dog@mail.ru',
                    numberOfConfirmedOrders: 64,
                    status: 'рыбак'
                },
                {
                    place: 5,
                    login: 'nightmare@mail.ru',
                    numberOfConfirmedOrders: 34,
                    status: 'охотник'
                },
                {
                    place: 6,
                    login: 'cat@mail.ru',
                    numberOfConfirmedOrders: 1,
                    status: 'Ценитель красоты'
                }],
                sortType: 'more',
                value: '',
                sortTypeAlphabet: 'alphabetMore',
                userLogin: '',
                usersBySelect: '',
                usersByLogin: '',
                orderFrom: 0,
                orderBefore: 0,
                filtredUsers: this.users,
            }
            
        },

        created() {
          this.usersByLogin = this.$route.params.usersByLogin;
          this.usersBySelect = this.$route.params.usersBySelect;
          this.orderFrom = +this.$route.params.filtredByOderStart;
          this.orderBefore = +this.$route.params.filtredByOderEnd;
          if(this.usersByLogin && this.usersByLogin.length > 0) {
            this.filtredByLogin()
          }
          if(this.usersBySelect && this.usersBySelect.length > 0) {
            this.filtredByStatus();
          }
          if(this.orderFrom > 0 && this.orderBefore > 0) {
            this.filtredByOder();
          }
        },

        methods: {
            sortLessToMore(sortType, value) {
                let newUsers = '';
                switch(sortType) {
                    case 'less':
                        newUsers = this.filtredUsers.sort((prev, next) => prev[`${value}`] - next[`${value}`] )
                        this.sortType = 'more'
                        this.value = value;
                        break;
                    case 'more':
                        newUsers = this.filtredUsers.sort((prev, next) => next[`${value}`] - prev[`${value}`]);
                        this.sortType = 'less';
                        this.value = value;
                        break;
                    case 'alphabetMore':
                        newUsers = this.filtredUsers.sort((prev, next) => {
                            if(prev[`${value}`].toLowerCase() < next[`${value}`].toLowerCase()) return -1;
                            if(prev[`${value}`].toLowerCase() > next[`${value}`].toLowerCase()) return 1;
                        })
                        this.sortTypeAlphabet = 'alphabetLess';
                        this.value = value;
                        break;
                    case 'alphabetLess':
                        newUsers = this.users.sort((prev, next) => {
                            if(prev[`${value}`].toLowerCase() > next[`${value}`].toLowerCase()) return -1;
                            if(prev[`${value}`].toLowerCase() < next[`${value}`].toLowerCase()) return 1;
                        })
                        this.sortTypeAlphabet = 'alphabetMore';
                        this.value = value;
                        break;
                    default:
                        newUsers = 'default';
                }
                this.users = newUsers;
            },

            filtredByLogin() {
              if(this.filtredUsers === undefined) {
                  this.filtredUsers = this.users;
                }
                const fltredbyUser = this.filtredUsers.filter((user) => user.login.toLowerCase().startsWith(this.usersByLogin))
                if(fltredbyUser.length > 0) {
                    this.filtredUsers = fltredbyUser;
                }
                else {
                    this.filtredUsers = this.filtredUsers;
                }
            },

            filtredByStatus() {
                if(this.filtredUsers === undefined) {
                  this.filtredUsers = this.users;
                }
                const fltredbyStatus = this.filtredUsers.filter((user) => user.status === this.usersBySelect)
                if(fltredbyStatus.length > 0) {
                    this.filtredUsers = fltredbyStatus;
                }
                else {
                    this.filtredUsers = this.filtredUsers;
                }
            },

            filtredByOder() {
              if(this.filtredUsers === undefined) {
                  this.filtredUsers = this.users;
                }
                const filtredByOrder = this.filtredUsers.filter((user) => {
                    return user.numberOfConfirmedOrders >= this.orderFrom && user.numberOfConfirmedOrders <= this.orderBefore;
                })
                if(filtredByOrder.length > 0 && this.orderBefore) {
                    this.filtredUsers = filtredByOrder;
                }
                else {
                    this.filtredUsers = this.filtredUsers;
                }
            },

            clearFilter() {
                this.filtredUsers = this.users
                this.orderFrom = 0;
                this.orderBefore = 0;
                this.sortedType = '';
                this.value = '';
                this.sortTypeAlphabet = '';
                this.userLogin = '';
                this.usersBySelect = null;
            }
        }
    }
</script>

<style scoped>
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
    color: #039;
    cursor: pointer;
}
td {
  color: #669;
  padding: 7px 17px;
}
tr:hover td {
  background: #ccddff;
}

.table-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.table-filters {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
