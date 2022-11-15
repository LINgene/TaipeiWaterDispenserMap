<template>
  <div>
    <SearchBar @RefreshData="RefreshData" />
    <p class="text-primary">{{ CountSearchResult }}</p>
    <div class="d-flex justify-content-center">
      <!--地圖-->
      <div id="MyMap" class="col-12"></div>
      <!-------->
    </div>
  </div>
</template>
<script>
//載入Leaflet JS
import L from "leaflet";

import SearchBar from "@/components/SearchBar.vue";

//先定義Map和layerGroup的變數讓Leaflet使用
let MyMap = {};

let PointGroup = null;
///////////////////////////

export default {
  name: "MapView",
  data: function () {
    return {
      TPEWater: "",
    };
  },
  components: {
    SearchBar,
  },
  mounted: function () {
    //設定圖台
    MyMap = L.map("MyMap", {
      center: [25.0729448, 121.55329599],
      zoom: 12,
      minZoom: 8,
      zoomControl: false,
    });

    //設定底圖
    L.tileLayer(
      "https://wmts.nlsc.gov.tw/wmts/EMAP5/default/EPSG:3857/{z}/{y}/{x}",
      { maxZoom: 18, minZoom: 7, zIndex: 0 }
    ).addTo(MyMap);

    //設定layerGroup
    PointGroup = new L.layerGroup().addTo(MyMap);
  },
  methods: {
    RefreshData: function (TPEWater) {
      //刷新圖資資料

      //帶入篩選出的資料
      this.TPEWater = TPEWater;

      //清空圖層資料
      PointGroup.clearLayers();

      //設定點的樣式
      const PointStyle = L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${this.markerHtmlStyle("#eeb412")}" />`,
      });

      //把篩選出的結果塞進圖層裡
      this.TPEWater.forEach((obj) => {
        //
        L.marker([obj.緯度, obj.經度], { icon: PointStyle })
          .bindPopup(this.markerPopupSytle(obj))
          .addTo(PointGroup);
      });
    },
    markerHtmlStyle: function (Color) {
      //點Icon
      var markerHtmlStyles = `
      background-color: ${Color};
      width: 2rem;
      height: 2rem;
      display: block;
      left: -1.0rem;
      top: -1.0rem;
      position: relative;
      border-radius: 2rem 2rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF`;

      return markerHtmlStyles;
    },
    markerPopupSytle: function (Data) {
      //設定彈出視窗內容
      const markerPopupHTML = ` 
      <p><strong style="font-size: 20px;">${Data.場所名稱}</strong></p>
      行政區: ${Data.行政區}<br>
      場所地址: ${Data.場所地址}<br>
      場所開放時間: ${Data.場所開放時間}<br>
      管理單位: ${Data.管理單位}<br>
      連絡電話: ${Data.連絡電話}<br>
      飲水台數: ${Data.飲水台數}`;

      return markerPopupHTML;
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

<style>
#MyMap {
  width: 750px;
  height: 750px;
}
</style>
