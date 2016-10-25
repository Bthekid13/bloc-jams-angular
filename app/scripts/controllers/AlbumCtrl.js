(function() {
  function AlbumCtrl() {
    this.albumdata = angular.copy(albumPicasso);
    this.songs = this.albumdata.songs;
  }


  angular
  .module('blocJams')
  .controller('AlbumCtrl', AlbumCtrl)

})();
