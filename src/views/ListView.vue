<template>
  <div>
    <SearchBar @RefreshData="RefreshData" />
    <p class="text-primary">{{ CountSearchResult }}</p>
    <!--飲水機資料清單-->
    <table
      v-show="WaterTableShow"
      id="WaterTable"
      class="table table-striped table-sm table-hover"
    >
      <thead>
        <tr>
          <th scope="col">場所名稱</th>
          <th scope="col">場所地址</th>
          <th scope="col">場所開放時間</th>
          <th scope="col">管理單位</th>
          <th scope="col">行政區</th>
          <th scope="col">設置地點</th>
          <th scope="col">連絡電話</th>
          <th scope="col">飲水台數</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in TPEWater" :key="key">
          <td>{{ item.場所名稱 }}</td>
          <td>{{ item.場所地址 }}</td>
          <td>{{ item.場所開放時間 }}</td>
          <td>{{ item.管理單位 }}</td>
          <td>{{ item.行政區 }}</td>
          <td>{{ item.設置地點 }}</td>
          <td>{{ item.連絡電話 }}</td>
          <td>{{ item.飲水台數 }}</td>
        </tr>
      </tbody>
    </table>
    <!------------------->
  </div>
</template>
<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "ListView",
  data: function () {
    return {
      TPEWater: "",
      WaterTableShow: false,
    };
  },
  components: {
    SearchBar,
  },
  mounted: function () {},
  methods: {
    RefreshData: function (TPEWater) {
      ////刷新清單

      ////設定清單顯示
      this.WaterTableShow = true;

      //帶入篩選出的資料
      this.TPEWater = TPEWater;
    },
  },
  computed: {
    CountSearchResult: function () {
      //計算篩選結果資料筆數
      const Count = this.TPEWater.length;

      if (Count == 0) {
        return "請點擊搜尋按鈕進行搜尋";
      } else {
        return "搜尋結果共" + this.TPEWater.length + "筆資料";
      }
    },
  },
};
</script>

<style lang="scss">
#WaterTable {
  margin-left: auto;
  margin-right: auto;
  width: auto;

  thead {
    th {
      background-color: #363636;
      color: #ffffff;
    }
  }
}
</style>
