(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    // Private Functions

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject= null;


    /**
    *@desc pulls the index of the songs given
    *@type private function
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };


    /**
    * @function setSong
    * @desc Stops currently playing song and lets new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        if (SongPlayer.currentSong) {
          SongPlayer.currentSong.playing = null;
        }
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        reload: true
      });
      SongPlayer.currentSong = song;
    };

    /**
    * @function stopSong
    * @desc Stops the currently playing song (currentSong). DRYs public functions
    */

    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
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


    // Public Functions

    /**
    * @desc holds the information for the Picasso Album
    * @type {Object}
    */
    SongPlayer.currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    SongPlayer.currentSong = null;


    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    /**
    * @desc Cycles Forward through the song index. Plays the next song in the album's index.
    * @type Public Function
    */

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      var lastSongIndex = currentAlbum.songs.length - 1;

      if (currentSongIndex > lastSongIndex) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @desc cycles backward through the song index. Plays previous song in the album's index.
    * @type Public Function
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }

    };

    return SongPlayer;
  }

  angular
  .module('blocJams')
  .factory('SongPlayer', SongPlayer);

})();
