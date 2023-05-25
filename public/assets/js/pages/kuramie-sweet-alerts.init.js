/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************************************!*\
  !*** ./resources/js/pages/kuramie-sweet-alerts.init.js ***!
  \*********************************************************/
/*
Template Name: Skote - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Sweetalert Js File
*/
!function ($) {
  "use strict";

  var SweetAlert = function SweetAlert() {}; //
  SweetAlert.prototype.init = function () {
    //製造業務 仕掛登録解除
    $('#sa-warning').click(function () {
      Swal.fire({
        title: "仕掛在庫を取り消しますか?",
        text: "「取消」をクリックして仕掛在庫をクリアします!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        cancelButtonText: "取り消しません",
        confirmButtonText: "取り消します"
      }).then(function (result) {
        if (result.value) {
          Swal.fire("取り消しました!", "仕掛在庫を取り消しました.", "success");
        }
      });
    }); //製造業務 製造指示変更
  }, //init
  $.SweetAlert = new SweetAlert(), $.SweetAlert.Constructor = SweetAlert;
}(window.jQuery), //initializing
function ($) {
  "use strict";

  $.SweetAlert.init();
}(window.jQuery);
/******/ })()
;
