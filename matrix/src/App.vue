<script setup>
import {ref} from "vue";

const input_day = ref(null)
const input_month = ref(null)
const input_year = ref(null)
const date = ref(null)
const additional_digits = ref('')
const fate_number = ref(null)
const obj = ref({})
for (let i = 0; i < 10; i++) {
  obj.value[i] = 0
}

function getSumDigits(string) {
  let sum = 0
  string.split('').forEach(num => {
    sum += Number(num);
  })
  return sum
}

function getCountDigits(string) {
  let obj = {}
  for (let i = 0; i < 10; i++) {
    obj[i] = 0
  }
  for (let digit of string) {
    if (obj.hasOwnProperty(digit)) {
      obj[digit] += 1
    } else obj[digit] = 1
  }
  return obj
}


function calculate() {
  // if (!date.value) return
  if (!input_day.value && !input_month.value && !input_year.value) return
  const arr = [input_day.value, input_month.value, input_year.value]
  // const arr = date.value.toString().split('-')
  // const day = array[2].toString()
  // const month = array[1].toString()
  // const year = array[0].toString()
  const array = arr.map(num => num.replaceAll('0', ''))

  const day = array[0].toString()
  const month = array[1].toString()
  const year = array[2].toString()

  let number_1 = 0
  for (let number of array) {
    number_1 += getSumDigits(number)
  }
  let number_2 = getSumDigits(number_1.toString())
  let number_3 = Math.abs(number_1 - day[0] * 2)
  let number_4 = getSumDigits(number_3.toString())
  fate_number.value = getSumDigits(number_1.toString())
  const all_digits = day + month + year + number_1.toString() + number_2.toString() + number_3.toString() + number_4.toString()
  // const all_digits = day.toString() + month.toString() + year.toString()
  obj.value = getCountDigits(all_digits)
  additional_digits.value = `${number_1}, ${number_2}, ${number_3}, ${number_4}`

}
</script>

<template>
  <div id="calc">

    <div class="wrapper">
              <v-row no-gutters
                     class="field mb-2">
                  <v-col class="pa-2"
                         :md="12/3"
                         cols="12">
                      <v-text-field
                              type="number"
                              v-model="input_day"
                              label="День"
                              :rules="[v => v <= 31 || 'Не больше 31 дня']"
                              required
                              variant="outlined"
                      ></v-text-field>
                  </v-col>
                  <v-col class="pa-2"
                         :md="12/3"
                         cols="12">
                      <v-text-field
                              type="number"
                              v-model="input_month"
                              label="Месяц"
                              :rules="[v => v <= 12 || 'В году 12 месяцев']"
                              required
                              variant="outlined"
                      ></v-text-field>
                  </v-col>
                  <v-col class="pa-2"
                         :md="12/3"
                         cols="12">
                      <v-text-field
                              type="number"
                              v-model="input_year"
                              label="Год"
                              required
                              variant="outlined"
                      ></v-text-field>
                  </v-col>

              </v-row>
              <v-btn class="my-4" @click="calculate">
                  Рассчитать
              </v-btn>
      <table>
        <thead>
        <th>
          <div>Число судьбы</div>
          <div v-if="fate_number">{{fate_number}}</div>
          <div v-else>—</div>
        </th>
        <th>
          <div>Доп. числа</div>
          <div>
            <span v-if="additional_digits">{{additional_digits}}</span>
            <span v-else>—</span>
          </div>
        </th>
        <th>
          <div></div>
        </th>
        <th>
          <div>Темперамент</div>
          <div v-if="obj[3] + obj[5] + obj[7]">{{obj[3] + obj[5] + obj[7]}}</div>
          <div v-else>—</div>
        </th>
        </thead>
        <tbody>
        <tr>
          <td>
            <div class="th-text">Характер</div>
            <div>
              <span v-if="obj[1] === 0"><b>—</b></span>
              <span v-else v-for="i in obj[1]">1</span>
            </div>
          </td>
          <td>
            <div class="th-text">Здоровье</div>
            <div>
              <span v-if="obj[4] === 0"><b>—</b></span>
              <span v-for="i in obj[4]">4</span>
            </div>
          </td>
          <td>
            <div class="th-text">Удача</div>
            <div>
              <span v-if="obj[7] === 0"><b>—</b></span>
              <span v-for="i in obj[7]">7</span>
            </div>
          </td>
          <th>
            <div>Цель</div>
            <div>
              <span v-if="obj[1] + obj[4] + obj[7]">{{obj[1] + obj[4] + obj[7]}}</span>
              <span v-else>—</span>
            </div>
          </th>
        </tr>
        <tr>
          <td>
            <div class="th-text">Энергия</div>
            <div>
              <span v-if="obj[2] === 0"><b>—</b></span>
              <span v-for="i in obj[2]">2</span>
            </div>
          </td>
          <td>
            <div class="th-text">Логика</div>
            <div>
              <span v-if="obj[5] === 0"><b>—</b></span>
              <span v-for="i in obj[5]">5</span>
            </div>
          </td>
          <td>
            <div class="th-text">Долг</div>
            <div>
              <span v-if="obj[8] === 0"><b>—</b></span>
              <span v-for="i in obj[8]">8</span>
            </div>
          </td>
          <th>
            <div>Семья</div>
            <div>
              <span v-if="obj[2] + obj[5] + obj[8]">{{obj[2] + obj[5] + obj[8]}}</span>
              <span v-else>—</span>
            </div>
          </th>
        </tr>
        <tr>
          <td>
            <div class="th-text">Интерес</div>
            <div>
              <span v-if="obj[3] === 0"><b>—</b></span>
              <span v-for="i in obj[3]">3</span>
            </div>
          </td>
          <td>
            <div class="th-text">Труд</div>
            <div>
              <span v-if="obj[6] === 0"><b>—</b></span>
              <span v-for="i in obj[6]">6</span>
            </div>
          </td>
          <td>
            <div class="th-text">Память</div>
            <div><span v-if="obj[9] === 0"><b>—</b></span>
              <span v-for="i in obj[9]">9</span>
            </div>
          </td>
          <th>
            <div>Привычки</div>
            <div>
              <span v-if="obj[3] + obj[6] + obj[9]">{{obj[3] + obj[6] + obj[9]}}</span>
              <span v-else>—</span>
            </div>
          </th>
        </tr>
        <tr>
          <td style="border: none"></td>
          <th>
            <div>Быт</div>
            <div>
              <span v-if="obj[4] + obj[5] + obj[6]">{{obj[4] + obj[5] + obj[6]}}</span>
              <span v-else>—</span>
            </div>
          </th>
          <td style="border: none"></td>
          <td style="border: none"></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
table {
  margin: auto!important;
  border-spacing: 0 !important;
}


th {
  width: 150px!important;
  height: 100px!important;
  background: antiquewhite!important;
  border-color: antiquewhite!important;
}

td {
  text-align: center!important;
  width: 150px!important;
  height: 100px!important;
  border: 1px solid #eee!important;
}

.wrapper {
  padding: 4rem!important;
}

.th-text {
  color: #00f!important;
  font-size: 12px!important;
}
</style>
