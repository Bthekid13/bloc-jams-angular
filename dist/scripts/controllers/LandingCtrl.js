(function() {
  function LandingCtrl() {
    this.heroTitle = "Every Bloc needs its Jam"
  }

  angular
    .module('blocJams')
    .controller('LandingCtrl', LandingCtrl);

})();
