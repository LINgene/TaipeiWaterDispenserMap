<template>
  <div>
    <div class="mb-2">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="Area"
          v-model="SearchType"
          checked
        />
        <label class="form-check-label" for="inlineRadio1"
          >依照行政區搜尋</label
        >
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="Place"
          v-model="SearchType"
        />
        <label class="form-check-label" for="inlineRadio2"
          >依照場所名稱搜尋</label
        >
      </div>
      <button type="button" class="btn btn-dark" v-on:click="GoSearch()">
        搜尋
      </button>
    </div>
    <div v-show="AreaSearch" class="mb-2">
      <div class="d-flex justify-content-center">
        <div class="col-3">
          <select class="form-control" v-model="AreaStr">
            <option value="">請選擇行政區</option>
            <option value="士林">士林</option>
            <option value="大同">大同</option>
            <option value="大安">大安</option>
            <option value="中山">中山</option>
            <option value="中正">中正</option>
            <option value="內湖">內湖</option>
            <option value="文山">文山</option>
            <option value="北投">北投</option>
            <option value="松山">松山</option>
            <option value="信義">信義</option>
            <option value="南港">南港</option>
            <option value="萬華">萬華</option>
          </select>
        </div>
      </div>
    </div>
    <div v-show="PlaceSearch" class="mb-2">
      <div class="d-flex justify-content-center">
        <div class="col-3">
          <input
            class="form-control"
            placeholder="請輸入場所關鍵字"
            value=""
            v-model="PlaceStr"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data: function () {
    return {
      SearchType: "Area",
      AreaSearch: true,
      PlaceSearch: false,
      AreaStr: "",
      PlaceStr: "",
      TPEWater: "",
    };
  },
  props: {},
  methods: {
    GoSearch: function () {
      //搜尋

      //從Vuex取得飲水機資料
      const TempData = this.$store.state.TPEWater;

      //用Mixin篩選出符合搜尋條件的資料
      this.TPEWater = this.DataFilter(
        TempData,
        this.SearchType,
        this.AreaStr,
        this.PlaceStr
      );
    },
    DataFilter: function (TempData, SearchType, AreaStr, PlaceStr) {
      //飲水機資料篩選
      if (AreaStr == "" && PlaceStr == "") {
        //先判斷是否有搜尋條件
        //如果都沒有就排序後回傳
        TempData.sort(function (a, b) {
          return a.行政區.localeCompare(b.行政區, "zh-hant");
        });

        return TempData;
      } else {
        //如果有
        if (SearchType == "Area") {
          //判斷使用哪一種篩選方式
          //行政區篩選
          const results = TempData.filter((obj) => {
            return obj.行政區 === AreaStr;
          });
          return results;
        } else if (SearchType == "Place") {
          //場址名稱篩選-為提供關鍵字搜尋所以用includes
          const results = TempData.filter((obj) => {
            return obj.場所名稱.includes(PlaceStr);
          });

          return results;
        }
      }
    },
  },
  watch: {
    SearchType: function (data) {
      //切換搜尋方式
      if (data == "Area") {
        this.AreaSearch = true;
        this.PlaceSearch = false;
        this.PlaceStr = "";
      } else if (data == "Place") {
        this.AreaSearch = false;
        this.PlaceSearch = true;
        this.AreaStr = "";
      }
    },
    TPEWater: function (data) {
      this.$emit("RefreshData", data);
    },
  },
};
</script>
