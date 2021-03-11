<template>
  <div class="contalner">
    <ul id="OrderCar"></ul>
    <h1>สั่งจองรถ</h1>
    <v-row>
      <v-col cols="6" sm="6">
        <v-menu
          ref="menu"
          v-model="menu2"
          :dateout-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="DateStart"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="DateStart"
              label="วันที่"
              prepend-icon="mdi-table-large"
              readonly
              required
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-if="menu2"
            v-model="DateStart"
            full-width
            @click:date="$refs.menu.save(DateStart)"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="6" sm="6">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :dateout-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="DateEnd"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="DateEnd"
              label="ถึงวันที่"
              prepend-icon="mdi-table-large"
              readonly
              required
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-if="menu1"
            v-model="DateEnd"
            full-width
            @click:date="$refs.menu1.save(DateEnd)"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-container>
        <h1>ชำระเงิน</h1>
        <h1>{{ radios || 'null' }}</h1>

        <v-radio-group v-model="radios" mandatory
          ><div class="text-right">
            <v-text-field
              v-model="Slip"
              type="text"
              required
              :rules="nameRules"
              label="กรุณาส่งสลีปเพื่อยืนยันการจอง"
              cols="10"
              sm="2"
            ></v-text-field>
          </div>
          <div class="text">
            <v-row>
              <v-col cols="10" sm="6">
                <v-radio
                  label="Select to promptpay"
                  value="Select to promptpay"
                >
                </v-radio
                ><img src="@/pages/QR.jpg" height="max" width="max" /></v-col
            ></v-row>
          </div>
        </v-radio-group>
      </v-container>
    </v-row>

    <div class="text-right">
      <br /><br />
      <v-card-text v-model="Totail"><h1>: Totail</h1> </v-card-text>
    </div>
    <div class="text-right">
      <v-btn color="bulbul" @click="addData"> Submit </v-btn>
    </div>
  </div>
</template>
<script>
// import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data() {
    return {
      DateStart: '',
      DateEnd: '',
      // NameCar: '',
      Totail: '',
      Slip: '',
      radios: '',
      menu1: '',
      menu2: '',
      // valid: true,
      nameRules: [(v) => !!v || 'please required'],
      data: [],
    }
  },
  // mounted() {
  //   this.getdata()
  // },
  methods: {
    addData() {
      // เก็บข้อมูล Form ใน collection MyForm ( มี 1 document แต่จะ update ข้อมูลเรื่อย ๆ )
      const data = {
        DateStart: this.DateStart,
        DateEnd: this.DateEnd,
        Slip: this.Slip,
        Totail: this.Totail,
      }
      db.collection('Oders')
        .doc()
        .set(data)
        .then(function () {
          console.log('Document successfully written! -> MyForm')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
  },
}
</script>
