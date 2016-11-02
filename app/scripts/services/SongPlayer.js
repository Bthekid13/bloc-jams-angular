(function() {
  function SongPlayer() {
    var SongPlayer = {};

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentSong = null;

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */

    var currentBuzzObject= null;

    /**
    * @function setSong
    * @desc Stops currently playing song and lets new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        reload: true
      });
      currentSong = song;
    };

    /**
    * @function playSong
    * @desc DRYs code that involves playing the currentBuzzObject
    */

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function SongPlayer.play
    * @desc Plays the currentBuzzs Object
    * @param {Object} song
    */

    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong();
      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };


    /**
    * @function SongPlayer.pause
    * @desc pauses the currentBuzzObject
    * @param {Object} song
    */

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }

    return SongPlayer;
  }

  angular
  .module('blocJams')
  .factory('SongPlayer', SongPlayer);

})();
