import Vue from "vue";

Vue.mixin({
  methods: {
    //DataFilter: function (TempData, SearchType, AreaStr, PlaceStr) {
    //  //飲水機資料篩選
    //  if (AreaStr == "" && PlaceStr == "") {
    //    //先判斷是否有搜尋條件
    //    //如果都沒有就排序後回傳
    //    TempData.sort(function (a, b) {
    //      return a.行政區.localeCompare(b.行政區, "zh-hant");
    //    });
    //    return TempData;
    //  } else {
    //    //如果有
    //    if (SearchType == "Area") {
    //      //判斷使用哪一種篩選方式
    //      //行政區篩選
    //      const results = TempData.filter((obj) => {
    //        return obj.行政區 === AreaStr;
    //      });
    //      return results;
    //    } else if (SearchType == "Place") {
    //      //場址名稱篩選-為提供關鍵字搜尋所以用includes
    //      const results = TempData.filter((obj) => {
    //        return obj.場所名稱.includes(PlaceStr);
    //      });
    //      return results;
    //    }
    //  }
    //},
  },
});
