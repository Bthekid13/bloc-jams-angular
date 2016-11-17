(function() {
  function PlayerBarCtrl($scope, Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
    SongPlayer.registerScope($scope);
}

  angular
    .module('blocJams')
    .controller('PlayerBarCtrl', ['$scope', 'Fixtures', 'SongPlayer', PlayerBarCtrl]);

})();
