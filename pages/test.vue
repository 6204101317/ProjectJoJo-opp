<template>
  <div>
    <v-row justify="center"
      ><v-col v-for="(i, index) in list" :key="index" cols="3"
        ><v-card>
          <v-img
            class="white--text align-end"
            height="200px"
            :src="i.imgUrl"
            align="center"
          >
            <v-card-title>{{ i.name }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0"> {{ i.carID }} </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>
              <v-icon class="ic"> mdi-bitcoin </v-icon> ราคาเช่า
              {{ i.price }} บาท
            </div>

            <div>
              <v-icon class="ic"> mdi-car-seat </v-icon> {{ i.detail1 }}
            </div>
            <div>
              <v-icon class="ic"> mdi-treasure-chest </v-icon> {{ i.detail2 }}
            </div>
            <div>
              สถานะ <v-icon class="ic">mdi-check</v-icon> {{ i.status }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text> จองรถ </v-btn>

            <!-- <v-btn color="orange" text> Explore </v-btn> -->
          </v-card-actions>
        </v-card></v-col
      ></v-row
    >
  </div>
</template>
<script>
import { db } from '~/plugins/firebaseConfig.js'
export default {
  data() {
    return { list: '' }
  },

  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      db.collection('cardata')
        .orderBy('carID', 'asc')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.list = data
          console.log(this.list)
        })
    },
  },
}
</script>

<style>
.ic {
  margin-right: 0.4rem;
}
</style>
