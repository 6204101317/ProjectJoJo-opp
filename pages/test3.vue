<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="6" sm="6">
          <v-menu
            ref="menu"
            v-model="menu2"
            :dateout-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="datein"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="datein"
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
              v-model="datein"
              full-width
              @click:date="$refs.menu.save(datein)"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="6" sm="6">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :dateout-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="dateout"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateout"
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
              v-model="dateout"
              full-width
              @click:date="$refs.menu1.save(dateout)"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row> </v-row>
      <v-divider></v-divider>
      <v-text-field
        v-model="Slip"
        :rules="nameRules"
        label="กรุนากรอกเลขอ้างอิงบนสลิป"
        required
      >
      </v-text-field>

      <v-row>
        <v-col cols="10"> </v-col>
        <v-col cols="2">
          <div class="text-center">
            <v-dialog v-model="dialog" width="800">
              <template #activator="{ on, attrs }">
                <v-btn
                  depressed
                  color="#712E1E"
                  class="white--text"
                  :disabled="!valid"
                  v-bind="attrs"
                  v-on="on"
                  @click="validate"
                >
                  SUMMIT
                </v-btn>
              </template>

              <v-card class="pa-4" elevation="11">
                <v-row>
                  <v-col cols="12"> ยืนยันข้อมูล </v-col>
                </v-row>

                <v-divider></v-divider>
                <v-card-text></v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    แก้ไข
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click=";(dialog = false), set(), reset(), update(id)"
                  >
                    ตกลง
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
// import ThailandAutoComplete from 'vue-thailand-address-autocomplete'
// import firebase from 'firebase/app'
import { db } from '~/plugins/firebaseConfig.js'
// import { AutoProvince } from '~/plugins/AutoProvince'
export default {
  //   components: {
  //     ThailandAutoComplete,
  //   },
  data() {
    return {
      //   id: this.$route.params.id.roomNo,
      arr: {},
      Slip: '',
      description: '',
      datein: '',
      dateout: '',
      menu1: false,
      menu2: false,
      district: '',
      //   cost: this.$route.params.id.cost,
      // state: 'wait check in',
      nameRules: [(v) => !!v || 'please required'],
      dialog: false,
      valid: true,
      sum: '',
    }
  },
  computed: {
    day() {
      const dateIn = new Date(this.datein)
      const dateOut = new Date(this.dateout)
      const age = Math.abs(
        Math.floor((dateOut - dateIn) / (24 * 60 * 60 * 1000)) + 1
      )
      return age
    },
  },
  methods: {
    reset() {
      this.$router.replace('/room')
    },
    validate() {
      this.$refs.form.validate()
    },
    select(address) {
      this.district = address.district
      this.amphoe = address.amphoe
      this.province = address.province
      this.zipcode = address.zipcode
    },
    set() {
      const day = Math.abs(this.datein, this.dateout)
      this.sum = day / (1000 * 60 * 60)
      console.log('DAY ' + this.day)
      // เก็บข้อมูล Form ใน collection MyForm ( มี 1 document แต่จะ update ข้อมูลเรื่อย ๆ )
      const data = {
        cost: this.cost * this.day,
        date_in: this.datein,
        date_out: this.dateout,
        day: this.day,
        state: 'wait check in',
      }
      db.collection('data')
        .doc(this.id)
        .set(data)
        .then(() => {
          console.log('Document successfully written! -> data')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    },
    // รอการเช็คอิน
    update(id) {
      const update = db.collection('room').doc(id)
      return update.update({ state: 'wait check in' }).then(function () {
        console.log('Update!' + id)
      })
    },
  },
}
</script>
<style>
.box {
  background-color: rgb(255, 255, 255);
}
</style>
