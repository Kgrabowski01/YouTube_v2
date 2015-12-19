(function(){
  'use strict';
  angular.module('youTubeV2App')

  .factory('localStorageService', localStorageService);
  localStorageService.$inject = [];

  function localStorageService () {

    var localStorageArray = [];
    var videoStorage = 'videoStorage';
    var filesArray;

    function toDataUlrArray (dataUrl) {
      var tempUrl = dataUrl;
      var tempArray = [];
      tempArray.push(tempUrl);
      localStorageArray.push(tempArray);
      localStorage.setItem(videoStorage, JSON.stringify(localStorageArray));
      localStorageArray = [];
    }

    if (localStorage.videoStorage) {
      var tempJson = localStorage.videoStorage;
      var clearedStorage = tempJson.slice(2,-2);
      filesArray = angular.fromJson(clearedStorage);
    }

    return {
      toDataUlrArray: toDataUlrArray,
      filesArray: filesArray
    };

  }
})();
