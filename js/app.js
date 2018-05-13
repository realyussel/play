
  angular.module('angularDemo', ['ngMaterial', 'angularSoundManager', 'xml']); //initialize module

  angular.module('angularDemo').config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
  });

  //can reference model instead of creating a global variable
  angular.module('angularDemo').controller('MainCtrl', ['$scope','$http','ys_DataService', function($scope, $http, ys_DataService) { 

    $scope.songs = ys_DataService.getData();
    var songs = $scope.songs;

    //create checkbox filters on the fly with dynamic data
    var filters = [];
    _.each(songs, function(product) {
      _.each(product.properties, function(property) {      
        var existingFilter = _.findWhere(filters, { name: property.name });

        if (existingFilter) {
          var existingOption = _.findWhere(existingFilter.options, { value: property.value });
          if (existingOption) {
            existingOption.count += 1;
          } else {
            existingFilter.options.push({ value: property.value, count: 1 }); 
          }   
        } else {
          var filter = {};
          filter.name = property.name;
          filter.options = [];
          filter.options.push({ value: property.value, count: 1 });
          filters.push(filter);      
        }   
      });
    });
    $scope.Filters = filters;

    this.toggleAll = function($event, includeAll) {       
      _.each(filters, function(filterCategory) {      
        _.each(filterCategory.options, function(option) {
          option.IsIncluded = includeAll;
        });
      });    
    };

    this.it_is_in_playlist = function(song) {       
      var found = $scope.playlist.find(function(item){return item.id === song});
      var index = $scope.playlist.indexOf(found)
      return index;   
    };

    var main = this;
    main.orderType = 'id';
    main.orderReverse = false;
    main.changeSortType = function(orderType) {
      if (main.orderType == orderType) {
        main.orderReverse = !main.orderReverse;
      } else {
        main.orderType = orderType;
      }
    }
      
    main.isSortType = function (orderType) {
      return (main.orderType == orderType);
    };

    main.isOrderedReverse = function () {
      return !main.orderReverse;
    }

  }]);

  angular.module('angularDemo').filter('dynamicFilter', function () {
    return function (songs, filterCategories, scope) {
      var filtered = [];

      var productFilters = _.filter(filterCategories, function(fc) {
        return  _.any(fc.options, { 'IsIncluded': true });
      });

      _.each(songs, function(prod) {
        var includeProduct = true;
        _.each(productFilters, function(filter) {
          var props = _.filter(prod.properties, { 'name': filter.name });
          if (!_.any(props, function(prop) { return _.any(filter.options, { 'value': prop.value, 'IsIncluded': true }); })) {
            includeProduct = false;
          }
        });
        if (includeProduct) {
          filtered.push(prod);
        }
      });
      return filtered;
    };
  });

  angular.module('angularDemo').service('ys_DataService', function() {
    var service = {};

    var songs = [
// Amor
{"id": "1","url": "http://yussel.com.mx/play.1/audio/mp3/strangersinthenight.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/strangersinthenight.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/sinatra2.jpg","time": "00:00","title": "Strangers In The Night","artist": "Frank Sinatra","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "2","url": "http://yussel.com.mx/play.1/audio/mp3/quandoquandoquando.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/quandoquandoquando.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/buble3.jpg","time": "00:00","title": "Quando, Quando, Quando","artist": "Michael Bublé","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "3","url": "http://yussel.com.mx/play.1/audio/mp3/killingmesoftly.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/killingmesoftly.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/sinatra.jpg","time": "00:00","title": "Killing Me Softly","artist": "Frank Sinatra","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "4","url": "http://yussel.com.mx/play.1/audio/mp3/alwaysonmymind.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/alwaysonmymind.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/buble.jpg","time": "00:00","title": "Always On My Mind","artist": "Michael Bublé","trackAlbum": "Call Me Irresponsible","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "5","url": "http://yussel.com.mx/play.1/audio/mp3/makeyoufeelmylove.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/makeyoufeelmylove.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/adele.jpg","time": "00:00","title": "Make You Feel My Love","artist": "Adele","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "6","url": "http://yussel.com.mx/play.1/audio/mp3/somewhereovertherainbow.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/somewhereovertherainbow.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/iz.jpg","time": "00:00","title": "Somewhere Over The Rainbow","artist": "Israel 'IZ'","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "7","url": "http://yussel.com.mx/play.1/audio/mp3/lavieenrose.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/lavieenrose.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/louisarmstrong.jpg","time": "00:00","title": "La Vie En Rose","artist": "Louis Armstrong","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "8","url": "http://yussel.com.mx/play.1/audio/mp3/canthelpfallinginlovewithyou.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/canthelpfallinginlovewithyou.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/elvis.jpg","time": "00:00","title": "Can't Help Falling In Love With You","artist": "Elvis Presley","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "9","url": "http://yussel.com.mx/play.1/audio/mp3/morethanwords.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/morethanwords.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/morethanwords.jpg","time": "00:00","title": "More Than Words","artist": "Extreme","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "10","url": "http://yussel.com.mx/play.1/audio/mp3/rude.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/rude.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/magic.jpg","time": "00:00","title": "Rude","artist": "MAGIC!","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "11","url": "http://yussel.com.mx/play.1/audio/mp3/onelove.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/onelove.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/marley.jpg","time": "00:00","title": "One Love","artist": "Bob Marley","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "12","url": "http://yussel.com.mx/play.1/audio/mp3/laseine.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/laseine.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/vanessa.jpg","time": "00:00","title": "La Seine","artist": "Vanessa Paradis & -M-","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "13","url": "http://yussel.com.mx/play.1/audio/mp3/ghoststhatweknew.mp3","lyric": "http://yussel.com.mx/play.1/audio/lyric/ghoststhatweknew.lrc","thumb": "http://yussel.com.mx/play.1/audio/img/babel.jpg","time": "00:00","title": "Ghosts That We Knew","artist": "Mumford & Sons","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "14","url": "http://yussel.com.mx/play.1/audio/mp3/theone.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/kodaline2.jpg","time": "00:00","title": "The One","artist": "Kodaline","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "15","url": "http://yussel.com.mx/play.1/audio/mp3/youandme.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/lifehouse.jpg","time": "00:00","title": "You and Me","artist": "Lifehouse","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "16","url": "http://yussel.com.mx/play.1/audio/mp3/iwontgiveup.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/mraz.jpg","time": "00:00","title": "I Won't Give Up","artist": "Jason Mraz","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "17","url": "http://yussel.com.mx/play.1/audio/mp3/loveisforever.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/muse.jpg","time": "00:00","title": "Love Is Forever","artist": "Muse","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "18","url": "http://yussel.com.mx/play.1/audio/mp3/earnedit.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/weehnd.jpg","time": "00:00","title": "Earned It","artist": "The Weehnd","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "19","url": "http://yussel.com.mx/play.1/audio/mp3/iamyourman.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/buble4.jpg","time": "00:00","title": "I'm Your Man","artist": "Michael Bublé","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "20","url": "http://yussel.com.mx/play.1/audio/mp3/staywithme.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/samsmith.jpg","time": "00:00","title": "Stay With Me","artist": "Sam Smith","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "21","url": "http://yussel.com.mx/play.1/audio/mp3/thinkingoutloud.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/edsheeran2.jpg","time": "00:00","title": "Thinking Out Loud","artist": "Ed Sheeran","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "22","url": "http://yussel.com.mx/play.1/audio/mp3/L-O-V-E.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/L-O-V-E.jpg","time": "00:00","title": "L-O-V-E","artist": "Nat King Cole","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "23","url": "http://yussel.com.mx/play.1/audio/mp3/howdeepisyourlove.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/beegees.jpg","time": "00:00","title": "How Deep Is Your Love","artist": "Bee Gees","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "24","url": "http://yussel.com.mx/play.1/audio/mp3/whenineedyou.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/leosayer.jpg","time": "00:00","title": "When I Need You","artist": "Leo Sayer","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "25","url": "http://yussel.com.mx/play.1/audio/mp3/ohprettywoman.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/royorbison.jpg","time": "00:00","title": "Oh, Pretty Woman","artist": "Roy Orbison","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "26","url": "http://yussel.com.mx/play.1/audio/mp3/teamarepormilanios.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/perri.jpg","time": "00:00","title": "A Thousand Tears (español)","artist": "Chistina Perri","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "27","url": "http://yussel.com.mx/play.1/audio/mp3/compartir.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/morrison.jpg","time": "00:00","title": "Compartir","artist": "Carla Morrison","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "28","url": "http://yussel.com.mx/play.1/audio/mp3/creoenti.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/reik2.jpg","time": "00:00","title": "Creo En Ti","artist": "Reik","properties": [{ "name":"list", "value":"Amor" },{ "name":"list", "value":"De mi amor" }]}
, {"id": "29","url": "http://yussel.com.mx/play.1/audio/mp3/mibendicion.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/luisguerra.jpg","time": "00:00","title": "Mi Bendición","artist": "Juan Luis Guerra","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "30","url": "http://yussel.com.mx/play.1/audio/mp3/sonie.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/zoe.jpg","time": "00:00","title": "Soñe","artist": "Zoé","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "31","url": "http://yussel.com.mx/play.1/audio/mp3/coincidir.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/macaco.jpg","time": "00:00","title": "Coincidir","artist": "Macaco","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "32","url": "http://yussel.com.mx/play.1/audio/mp3/noteapartesdemi.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/vicentico.jpg","time": "00:00","title": "No Te Apartes De Mí","artist": "Vicentico","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "33","url": "http://yussel.com.mx/play.1/audio/mp3/robarletiempoaltiempo.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/cafequijano2.jpg","time": "00:00","title": "Robarle Tiempo Al Tiempo","artist": "Café Quijano","properties": [{ "name":"list", "value":"Amor" }]}
, {"id": "34","url": "http://yussel.com.mx/play.1/audio/mp3/meenamorascontodo.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/cafequijano.jpg","time": "00:00","title": "Me Enamoras Con Todo","artist": "Café Quijano", "properties": [{ "name":"list", "value":"Amor" }]}
// Reggaeton
, {"id": "35","url": "http://yussel.com.mx/play.1/audio/mp3/felices_los_4.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/maluma_2.jpg","time": "00:00","title": "Felices los 4","artist": "Maluma","properties": [{ "name":"list", "value":"Reggaeton" }]}
, {"id": "36","url": "http://yussel.com.mx/play.1/audio/mp3/ay_mi_dios.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/ay_mi_dios.jpg","time": "00:00","title": "Ay Mi Dios","artist": "IAmChino ft. Pitbull, Yandel","properties": [{ "name":"list", "value":"Reggaeton" }]}
, {"id": "37","url": "http://yussel.com.mx/play.1/audio/mp3/vente_pa_ca.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/ricky_martin.jpg","time": "00:00","title": "Vente Pa Ca","artist": "Ricky Martin ft. Maluma","properties": [{ "name":"list", "value":"Reggaeton" }]}
, {"id": "38","url": "http://yussel.com.mx/play.1/audio/mp3/el_amante.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/nicky_jam.jpg","time": "00:00","title": "El amante","artist": "Nicky Jam","properties": [{ "name":"list", "value":"Reggaeton" }]}
, {"id": "39","url": "http://yussel.com.mx/play.1/audio/mp3/chillax.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/farruko.jpg","time": "00:00","title": "Chillax","artist": "Farruko ft. Ky-Mani Marley","properties": [{ "name":"list", "value":"Reggaeton" }]}
, {"id": "40","url": "http://yussel.com.mx/play.1/audio/mp3/la_rompe_corazones.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/daddy_yankee.jpg","time": "00:00","title": "La rompe corazones","artist": "Daddy Yankee ft. Ozuna","properties": [{ "name":"list", "value":"Reggaeton" }]}
, {"id": "41","url": "http://yussel.com.mx/play.1/audio/mp3/despacito.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/despacito.jpg","time": "00:00","title": "Despacito","artist": "Luis Fonsi ft. Daddy Yankee","properties": [{ "name":"list", "value":"Reggaeton" }]}
, {"id": "42","url": "http://yussel.com.mx/play.1/audio/mp3/el_perdedor.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/maluma.jpg","time": "00:00","title": "El perdedor","artist": "Maluma","properties": [{ "name":"list", "value":"Reggaeton" }]}
, {"id": "43","url": "http://yussel.com.mx/play.1/audio/mp3/ya_me_entere.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/nicky_jam_2.jpg","time": "00:00","title": "Ya me enteré","artist": "Nicky Jan ft. Reik","properties": [{ "name":"list", "value":"Reggaeton" }]}
, {"id": "44","url": "http://yussel.com.mx/play.1/audio/mp3/chantaje.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/chantaje.jpg","time": "00:00","title": "Chantaje","artist": "Shakira ft. Maluma","properties": [{ "name":"list", "value":"Reggaeton" }]}
, {"id": "45","url": "http://yussel.com.mx/play.1/audio/mp3/reggaeton_lento.mp3","lyric": "","thumb": "","time": "00:00","title": "Reggaetón Lento (Bailemos)","artist": "CNCO","properties": [{ "name":"list", "value":"Reggaeton" }]}
, {"id": "46","url": "http://yussel.com.mx/play.1/audio/mp3/traicionera.mp3","lyric": "","thumb": "","time": "00:00","title": "Traicionera","artist": "Sebastián Yatra","properties": [{ "name":"list", "value":"Reggaeton" }]}
// Electrónica y Dance
, {"id": "47","url": "http://yussel.com.mx/play.1/audio/mp3/desde_esa_noche.mp3","lyric": "","thumb": "","time": "00:00","title": "Desde Esa Noche","artist": "Thalía ft. Maluma","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "48","url": "http://yussel.com.mx/play.1/audio/mp3/the_nights.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/PRDM.jpg","time": "00:00","title": "The Nights","artist": "Avicii","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "49","url": "http://yussel.com.mx/play.1/audio/mp3/Lose_Yourself_To_Dance.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/random_access_memories.jpg","time": "00:00","title": "Lose Yourself To Dance","artist": "Daft Punk Feat. Pharrell Williams","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "50","url": "http://yussel.com.mx/play.1/audio/mp3/Sweet_Lovin.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/sweet_lovin.jpg","time": "00:00","title": "Sweet Lovin","artist": "Sigala Feat. Bryn Christopher","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "51","url": "http://yussel.com.mx/play.1/audio/mp3/Selfie.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/the_chainsmokers.jpg","time": "00:00","title": "Selfie","artist": "The Chainsmokers","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "52","url": "http://yussel.com.mx/play.1/audio/mp3/Sexy_And_I_Know_It.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/LMFAO.jpg","time": "00:00","title": "Sexy And I Know It","artist": "LMFAO","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "53","url": "http://yussel.com.mx/play.1/audio/mp3/i_love_it.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/icona_pop.jpg","time": "00:00","title": "I Love It","artist": "Icona Pop Feat. Charli XCX","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "54","url": "http://yussel.com.mx/play.1/audio/mp3/Better_Off_Alone.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/alice_deejay.jpg","time": "00:00","title": "Better Off Alone","artist": "Alice DeeJay","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "55","url": "http://yussel.com.mx/play.1/audio/mp3/Let_Me_Think_About_It.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/ida_corr.jpg","time": "00:00","title": "Let Me Think About It","artist": "Ida Corr","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "56","url": "http://yussel.com.mx/play.1/audio/mp3/red_lights.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/a_town_called_paradise.jpg","time": "00:00","title": "Red Lights","artist": "Tiësto","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "57","url": "http://yussel.com.mx/play.1/audio/mp3/easy_love.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/sigala.jpg","time": "00:00","title": "Easy Love","artist": "Sigala","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "58","url": "http://yussel.com.mx/play.1/audio/mp3/my_way.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/calvin_harris.jpg","time": "00:00","title": "My Way","artist": "Calvin Harris","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "59","url": "http://yussel.com.mx/play.1/audio/mp3/Waiting_For_Love.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/avicii.jpg","time": "00:00","title": "Waiting For Love","artist": "Avicii","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "60","url": "http://yussel.com.mx/play.1/audio/mp3/heroes.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/forever.jpg","time": "00:00","title": "Heroes (We Could Be)","artist": "Alesso, Tove Lo","trackAlbum": "Forever","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "61","url": "http://yussel.com.mx/play.1/audio/mp3/Beautiful_Now.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/true_colors.jpg","time": "00:00","title": "Beautiful Now","artist": "Zedd Feat. Jon Bellion","trackAlbum": "True Colors","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "62","url": "http://yussel.com.mx/play.1/audio/mp3/Titanium.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/Nothing_But_The_Beat.jpg","time": "00:00","title": "Titanium","artist": "David Guetta Feat. Sia","trackAlbum": "Nothing But The Beat","properties": [{ "name":"list", "value":"Electrónica y Dance" }]}
// Me gusta
, {"id": "63","url": "http://yussel.com.mx/play.1/audio/mp3/101.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/the_kids_are_alright.jpg","time": "00:00","title": "101","artist": "Walla","trackAlbum": "The Kids Are Alright","properties": [{ "name":"list", "value":"Me gusta" }]}
, {"id": "64","url": "http://yussel.com.mx/play.1/audio/mp3/enamorate.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/dvicio.jpg","time": "00:00","title": "Enamorate","artist": "Dvicio","properties": [{ "name":"list", "value":"Me gusta" }]}
, {"id": "65","url": "http://yussel.com.mx/play.1/audio/mp3/ese_camino.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/algo_sucede.jpg","time": "00:00","title": "Ese Camino","artist": "Julieta Venegas","trackAlbum": "Algo Sucede","properties": [{ "name":"list", "value":"Me gusta" }]}
// Corazón roto
, {"id": "66","url": "http://yussel.com.mx/play.1/audio/mp3/Laura_No_Esta.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/nek.jpg","time": "00:00","title": "Laura No Está","artist": "Nek","trackAlbum": "Nek","properties": [{ "name":"list", "value":"Corazón roto" }]}
, {"id": "67","url": "http://yussel.com.mx/play.1/audio/mp3/prometiste.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/pepe_aguilar.jpg","time": "00:00","title": "Prometiste","artist": "Pepe Aguilar ft. Angela Aguilar, Melissa, La Marisoul","properties": [{ "name":"list", "value":"Corazón roto" }]}
, {"id": "68","url": "http://yussel.com.mx/play.1/audio/mp3/triste_recuerdo.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/majo_aguilar.jpg","time": "00:00","title": "Triste recuerdo","artist": "Majo Aguilar","properties": [{ "name":"list", "value":"Corazón roto" }]}
, {"id": "69","url": "http://yussel.com.mx/play.1/audio/mp3/no_se_vivir.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/carlos_rivera_2.jpg","time": "00:00","title": "No Sé Vivir","artist": "Carlos Rivera","properties": [{ "name":"list", "value":"Corazón roto" }]}
, {"id": "70","url": "http://yussel.com.mx/play.1/audio/mp3/que_lloro.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/leonel_garcia.jpg","time": "00:00","title": "Que Lloro","artist": "Leonel García ft. Carla Morrison","properties": [{ "name":"list", "value":"Corazón roto" }]}
// Banda
, {"id": "71","url": "http://yussel.com.mx/play.1/audio/mp3/cabecita_dura.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/b734957856198964962dc97133bac840c0e74808.jpg","time": "00:00","title": "Cabecita Dura","artist": "La Arrolladora Banda El Limón","properties": [{ "name":"list", "value":"Banda" }]}
, {"id": "72","url": "http://yussel.com.mx/play.1/audio/mp3/comparame.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/5ea9562e9f6da11cdecd985a886dc73e58bb911f.jpg","time": "00:00","title": "Compárame","artist": "La Arrolladora Banda El Limón","properties": [{ "name":"list", "value":"Banda" }]}
, {"id": "73","url": "http://yussel.com.mx/play.1/audio/mp3/cosas_que_nunca_te_dije.mp3","lyric": "","thumb": "http://yussel.com.mx/play.1/audio/img/1c4c372255e1a9c0bfd7a3dcd5d1b9224365a7bd.jpg","time": "00:00","title": "Cosas que nunca te dije","artist": "La Arrolladora Banda El Limón","properties": [{ "name":"list", "value":"Banda" }]}
// De mi amor
, {"id": "74","url": "https://www.dropbox.com/s/n48n0g5whu8ephi/Aerosmith%20-%20I%20Dont%20Wanna%20Miss%20a%20Thing.mp3?dl=1","lyric": "","thumb": "","time": "04:57","title": "I dont wanna miss a thing","artist": "Aerosmith","properties": [{ "name":"list", "value":"De mi amor" }]}
, {"id": "75","url": "https://www.dropbox.com/s/zm1tf2ddlyl7x0o/Bon%20jovi%20-Thank%20you%20for%20loving%20me.mp3?dl=1","lyric": "","thumb": "","time": "04:42","title": "Thank you for loving me","artist": "Bon Jovi","properties": [{ "name":"list", "value":"De mi amor" }]}
, {"id": "76","url": "https://www.dropbox.com/s/ua9ojz3za55ow06/Camila%20-%20Todo%20Cambio%20%28Official%20Video%29.mp3?dl=1","lyric": "","thumb": "","time": "03:22","title": "Todo cambio","artist": "Camila","properties": [{ "name":"list", "value":"De mi amor" }]}
, {"id": "77","url": "https://www.dropbox.com/s/b9tfj36malt5rhr/Chino%20%20Nacho%20-%20Me%20Voy%20Enamorando%20%28Remix%29%20ft.%20Farruko.mp3?dl=1","lyric": "","thumb": "","time": "05:49","title": "Me voy enamorando (Remix)","artist": "Chino Nacho ft. Farruko","properties": [{ "name":"list", "value":"De mi amor" }]}
, {"id": "78","url": "https://www.dropbox.com/s/it2njktybiob6vi/Franco%20De%20Vita%20feat.%20India%20Mart%C3%ADnez%20-%20Cuando%20Tus%20Ojos%20Me%20Miran.mp3?dl=1","lyric": "","thumb": "","time": "05:07","title": "Cuando tus ojos me miran","artist": "Franco De Vita feat. India Martínez","properties": [{ "name":"list", "value":"De mi amor" }]}
, {"id": "79","url": "https://www.dropbox.com/s/p5koni5fs0uzqm6/Franco%20De%20Vita%20feat.%20Vanesa%20Martin%20-%20Ay%20Dios.mp3?dl=1","lyric": "","thumb": "","time": "05:01","title": "Ay Dios","artist": "Franco De Vita feat. Vanesa Martin","properties": [{ "name":"list", "value":"De mi amor" }]}
, {"id": "80","url": "https://www.dropbox.com/s/bh88dh560wfxasa/From%20this%20moment%20Shania%20Twain.avi.mp3?dl=1","lyric": "","thumb": "","time": "03:57","title": "From this moment","artist": "Shania Twain","properties": [{ "name":"list", "value":"De mi amor" }]}
, {"id": "81","url": "https://www.dropbox.com/s/bihk5z8fas6qs44/Paul%20McCarney%20-%20My%20Valentine.mp3?dl=1","lyric": "","thumb": "","time": "03:13","title": "My valentine","artist": "Paul McCarney","properties": [{ "name":"list", "value":"De mi amor" }]}
, {"id": "82","url": "https://www.dropbox.com/s/68v8xcc38n4suk2/R%C3%ADo%20Roma%20-%20Al%20Fin%20Te%20Encontr%C3%A9.mp3?dl=1","lyric": "","thumb": "","time": "03:31","title": "Al fin te encontré","artist": "Río Roma ","properties": [{ "name":"list", "value":"De mi amor" }]}
, {"id": "83","url": "https://www.dropbox.com/s/x5kdgcdeeh9maip/R%C3%ADo%20Roma%20-%20Contigo.mp3?dl=1","lyric": "","thumb": "","time": "04:14","title": "Contigo","artist": "Río Roma","properties": [{ "name":"list", "value":"De mi amor" }]}
, {"id": "84","url": "https://www.dropbox.com/s/mnrcw3e7zepbtje/R%C3%ADo%20Roma%20-%20Por%20Eso%20Te%20Amo.mp3?dl=1","lyric": "","thumb": "","time": "03:23","title": "Por eso te amo","artist": "Río Roma","properties": [{ "name":"list", "value":"De mi amor" }]}
// The Beatles
, {"id": "85","url": "https://www.dropbox.com/s/2hyqicdol5vlmvm/01%20A%20Hard%20Day%27s%20Night.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "A Hard Day's Night","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "86","url": "https://www.dropbox.com/s/4cpoud1mm8xr2x2/02%20I%20Should%20Have%20Known%20Better.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "I Should Have Known Better","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "87","url": "https://www.dropbox.com/s/olou4yngewf59zu/03%20If%20I%20Fell.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "If I Fell","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "88","url": "https://www.dropbox.com/s/elijrgoey4sc2bl/08%20Any%20Time%20At%20All.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "Any Time At All","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "89","url": "https://www.dropbox.com/s/nt28t38gzbu2sin/09%20I%27ll%20Cry%20Instead.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "I'll Cry Instead","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "90","url": "https://www.dropbox.com/s/f7wb97lly6hfgr9/10%20Things%20We%20Said%20Today.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "Things We Said Today","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "91","url": "https://www.dropbox.com/s/nsn49ln96zprroi/04%20I%27m%20Happy%20Just%20To%20Dance%20With%20You.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "I'm Happy Just To Dance With You","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "92","url": "https://www.dropbox.com/s/z0hxwos8iptwpc3/05%20And%20I%20Love%20Her.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "And I Love Her","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "93","url": "https://www.dropbox.com/s/k2ztsl8csob5ub9/06%20Tell%20Me%20Why.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "Tell Me Why","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "94","url": "https://www.dropbox.com/s/zqf6y7s2slyso6q/07%20Can%27t%20Buy%20Me%20Love.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "Can't Buy Me Love","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "95","url": "https://www.dropbox.com/s/pv3e2duhfus669r/11%20When%20I%20Get%20Home.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "When I Get Home","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "96","url": "https://www.dropbox.com/s/aafnobj81mav6gl/12%20You%20Can%27t%20Do%20That.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "You Can't Do That","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "97","url": "https://www.dropbox.com/s/l5f1aht5km2z140/13%20I%27ll%20Be%20Back.mp3?dl=1","lyric": "","thumb": "","time": "00:00","title": "I'll Be Back","artist": "The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
// The Beatles
, {"id": "98","url": "https://www.dropbox.com/s/s4ra4ntgpv7dsjj/01%20Come%20Together.mp3?dl=1","lyric":"","thumb": "","time":"04:20","title": "Come Together","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "99","url": "https://www.dropbox.com/s/ii1br6gzdq8c85l/02%20Something.mp3?dl=1","lyric":"","thumb": "","time":"03:02","title": "Something","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "100","url": "https://www.dropbox.com/s/ovyv9eb6fyvgouy/03%20Maxwell%27s%20Silver%20Hammer.mp3?dl=1","lyric":"","thumb": "","time":"03:27","title": "Maxwell's Silver Hammer","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "101","url": "https://www.dropbox.com/s/x202gp1yh1oe7x4/04%20Oh%21%20Darling.mp3?dl=1","lyric":"","thumb": "","time":"03:27","title": "Oh! Darling","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "102","url": "https://www.dropbox.com/s/pcjmyrcyxrpub0f/05%20Octopus%27s%20Garden.mp3?dl=1","lyric":"","thumb": "","time":"02:50","title": "Octopus's Garden","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "103","url": "https://www.dropbox.com/s/pi4c0i29qj5m1hc/06%20I%20Want%20You%20%28She%27s%20So%20Heavy%29.mp3?dl=1","lyric":"","thumb": "","time":"07:47","title": "I Want You (She's So Heavy)","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "104","url": "https://www.dropbox.com/s/spu5w6somrjy4qu/07%20Here%20Comes%20The%20Sun.mp3?dl=1","lyric":"","thumb": "","time":"03:50","title": "Here Comes The Sun","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "105","url": "https://www.dropbox.com/s/3n2gp3zt21duzdh/08%20Because.mp3?dl=1","lyric":"","thumb": "","time":"02:45","title": "Because","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "106","url": "https://www.dropbox.com/s/otdv4wgt7lvztza/09%20You%20Never%20Give%20Me%20Your%20Money.mp3?dl=1","lyric":"","thumb": "","time":"04:03","title": "You Never Give Me Your Money","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "107","url": "https://www.dropbox.com/s/4fhhac51c88dums/10%20Sun%20King.mp3?dl=1","lyric":"","thumb": "","time":"02:26","title": "Sun King","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "108","url": "https://www.dropbox.com/s/pdett3oidr1bw5d/11%20Mean%20Mr.%20Mustard.mp3?dl=1","lyric":"","thumb": "","time":"01:06","title": "Mean Mr. Mustard","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "109","url": "https://www.dropbox.com/s/yd01yyjdrfltozx/12%20Polythene%20Pam.mp3?dl=1","lyric":"","thumb": "","time":"01:12","title": "Polythene Pam","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "110","url": "https://www.dropbox.com/s/r2krglun8ewa1iv/13%20She%20Came%20In%20Through%20The%20Bathroom%20Window.mp3?dl=1","lyric":"","thumb": "","time":"01:58","title": "She Came In Through The Bathroom Window","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "111","url": "https://www.dropbox.com/s/6ndeysdbp3bpzd3/14%20Golden%20Slumbers.mp3?dl=1","lyric":"","thumb": "","time":"01:31","title": "Golden Slumbers","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "112","url": "https://www.dropbox.com/s/q695crazdvwgyme/15%20Carry%20That%20Weight.mp3?dl=1","lyric":"","thumb": "","time":"01:36","title": "Carry That Weight","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "113","url": "https://www.dropbox.com/s/ijg66zrbymcbepz/16%20The%20End.mp3?dl=1","lyric":"","thumb": "","time":"02:21","title": "The End","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
, {"id": "114","url": "https://www.dropbox.com/s/d8c5xd3z34qji38/17%20Her%20Majesty.mp3?dl=1","lyric":"","thumb": "","time":"00:26","title": "Her Majesty","artist":"The Beatles","properties": [{ "name":"artist", "value":"The Beatles" }]}
// Coldplay
, {"id": "115","url": "https://www.dropbox.com/s/0dg1aiqdfqcdwqe/01%20-%20Hymn%20For%20The%20Weekend.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:18","title": "Hymn For The Weekend","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "116","url": "https://www.dropbox.com/s/e884wktzd11vyte/02%20-%20Viva%20La%20Vida.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:01","title": "Viva La Vida","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "117","url": "https://www.dropbox.com/s/pbi5izzim6sb3j8/03%20-%20A%20Sky%20Full%20of%20Stars.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:28","title": "A Sky Full of Stars","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "118","url": "https://www.dropbox.com/s/n8u9d8c779gbz0w/04%20-%20Violet%20Hill.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"03:42","title": "Violet Hill","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "119","url": "https://www.dropbox.com/s/woq9cwr04uqudd9/05%20-%20Princess%20of%20China.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"03:59","title": "Princess of China","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "120","url": "https://www.dropbox.com/s/h9kl7ngh2zyi3sx/06%20-%20Charlie%20Brown.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:45","title": "Charlie Brown","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "121","url": "https://www.dropbox.com/s/n7sjs552emnsk54/07%20-%20Adventure%20Of%20A%20Lifetime.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:23","title": "Adventure Of A Lifetime","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "122","url": "https://www.dropbox.com/s/7hahgtepzqlihoq/08%20-%20In%20My%20Place.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"03:46","title": "In My Place","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "123","url": "https://www.dropbox.com/s/srdncdbxirlpjo3/09%20-%20The%20Scientist.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"05:09","title": "The Scientist","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "124","url": "https://www.dropbox.com/s/85kwojdgtfuyuye/10%20-%20Something%20Just%20Like%20This.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:07","title": "Something Just Like This","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "125","url": "https://www.dropbox.com/s/hb1kbtwkpgauwca/11%20-%20Magic.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:45","title": "Magic","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "126","url": "https://www.dropbox.com/s/ed72ccsqa1avy1n/12%20-%20Paradise.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:37","title": "Paradise","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "127","url": "https://www.dropbox.com/s/lkl6zxog3h5pkm8/13%20-%20Don%27t%20Panic.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"02:17","title": "Don't Panic","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "128","url": "https://www.dropbox.com/s/apgfss7wq3ycnly/14%20-%20Fix%20You.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:55","title": "Fix You","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "129","url": "https://www.dropbox.com/s/cn8fvx01zyjnse8/15%20-%20Up%26Up.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"06:45","title": "Up&Up","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "130","url": "https://www.dropbox.com/s/yq81ar148vwrxt0/16%20-%20Clocks.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"05:07","title": "Clocks","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "131","url": "https://www.dropbox.com/s/82ux0drfom65d81/17%20-%20Yellow.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:29","title": "Yellow","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "132","url": "https://www.dropbox.com/s/lr55mzkvq7udqsb/18%20-%20Everglow.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:42","title": "Everglow","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "133","url": "https://www.dropbox.com/s/4pr8k2xc6ox0yzo/19%20-%20Every%20Teardrop%20Is%20A%20Waterfall.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:00","title": "Every Teardrop Is A Waterfall","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
, {"id": "134","url": "https://www.dropbox.com/s/7n86x2idavmu6yi/20%20-%20Speed%20Of%20Sound.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/eamx7fi24kzuv6g/Cover.jpg?dl=1","time":"04:48","title": "Speed Of Sound","artist":"Coldplay","properties": [{ "name":"artist", "value":"Coldplay" }]}
// Bruno Mars
, {"id": "135","url": "https://www.dropbox.com/s/53u18zmemem6fmu/01%20-%20It%20Will%20Rain.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"04:17","title": "It Will Rain","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "136","url": "https://www.dropbox.com/s/tas9zm1babpz856/02%20-%20When%20I%20Was%20Your%20Man.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:33","title": "When I Was Your Man","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "137","url": "https://www.dropbox.com/s/p5vzcrdbc2vrep8/03%20-%20Runaway%20Baby.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"02:28","title": "Runaway Baby","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "138","url": "https://www.dropbox.com/s/13m9s4b2i76pc6c/04%20-%2024K%20Magic.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:47","title": "24K Magic","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "139","url": "https://www.dropbox.com/s/74volkm4e2e1hmt/05%20-%20Grenade.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:42","title": "Grenade","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "140","url": "https://www.dropbox.com/s/mg4x3igluk3cazz/06%20-%20Talking%20To%20The%20Moon.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:37","title": "Talking To The Moon","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "141","url": "https://www.dropbox.com/s/ietuly1debzby56/07%20-%20Locked%20Out%20Of%20Heaven.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:53","title": "Locked Out Of Heaven","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "142","url": "https://www.dropbox.com/s/bffqt9rftl33vij/08%20-%20Marry%20You.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:50","title": "Marry You","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "143","url": "https://www.dropbox.com/s/redhqu6rrlqfiik/09%20-%20Gorilla.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"04:04","title": "Gorilla","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "144","url": "https://www.dropbox.com/s/vcy5n22ao87pr1n/10%20-%20Treasure.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"02:58","title": "Treasure","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "145","url": "https://www.dropbox.com/s/geja678mbvea8tl/11%20-%20Young%20Girls.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:48","title": "Young Girls","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "146","url": "https://www.dropbox.com/s/fat9fmm347vhpnk/12%20-%20Thats%20What%20I%20Like.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:26","title": "Thats What I Like","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "147","url": "https://www.dropbox.com/s/zphfsdsjbh2o08s/13%20-%20Perm.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:30","title": "Perm","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "148","url": "https://www.dropbox.com/s/1m1rg1ym4cwat9z/14%20-%20Versace%20On%20The%20Floor.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"04:21","title": "Versace On The Floor","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "149","url": "https://www.dropbox.com/s/ert1wph069ehazc/15%20-%20Liquor%20Store%20Blues%20%28Ft.%20Damian%20Marley%29.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:49","title": "Liquor Store Blues (Ft. Damian Marley)","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "150","url": "https://www.dropbox.com/s/kwdwdwtigfuuyw4/16%20-%20Finesse.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:11","title": "Finesse","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "151","url": "https://www.dropbox.com/s/orkv6xmfbgwyunq/17%20-%20Chunky.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:07","title": "Chunky","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "152","url": "https://www.dropbox.com/s/zuh1jm5a4wh3f67/18%20-%20The%20Lazy%20Song.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:16","title": "The Lazy Song","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "153","url": "https://www.dropbox.com/s/zqvfry9zfuria7n/19%20-%20Count%20On%20Me.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:17","title": "Count On Me","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
, {"id": "154","url": "https://www.dropbox.com/s/s1hck8r87ea94kz/20%20-%20Just%20The%20Way%20You%20Are.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/h9hcsh0qpo2usfg/Cover.jpg?dl=1","time":"03:40","title": "Just The Way You Are","artist":"Bruno Mars","properties": [{ "name":"artist", "value":"Bruno Mars" }]}
// Daft Punk
, {"id": "155","url": "https://www.dropbox.com/s/v62ixcragigjq7t/01%20-%20Get%20Lucky.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"06:09","title": "Get Lucky","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "156","url": "https://www.dropbox.com/s/q6pxhzfwk4yeahc/02%20-%20One%20More%20Time.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"05:20","title": "One More Time","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "157","url": "https://www.dropbox.com/s/v58oa1xsjozkj07/03%20-%20Around%20The%20World.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"07:09","title": "Around The World","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "158","url": "https://www.dropbox.com/s/9i982dnzda8knem/04%20-%20Harder%20Better%20Faster%20Stronger.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"03:44","title": "Harder Better Faster Stronger","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "159","url": "https://www.dropbox.com/s/agy6slqud4txq76/05%20-%20Da%20Funk.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"05:28","title": "Da Funk","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "160","url": "https://www.dropbox.com/s/w600jktd87ccc6g/06%20-%20Starboy.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"03:50","title": "Starboy","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "161","url": "https://www.dropbox.com/s/u2ogoqnsrbo17lj/07%20-%20Instant%20Crush.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"05:37","title": "Instant Crush","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "162","url": "https://www.dropbox.com/s/ofstb4baw7wyt4q/08%20-%20Technologic.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"04:44","title": "Technologic","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "163","url": "https://www.dropbox.com/s/bcwcejmriiv1ai6/09%20-%20Robot%20Rock.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"04:47","title": "Robot Rock","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "164","url": "https://www.dropbox.com/s/knpw64fl193cc2l/10%20-%20Lose%20Yourself%20to%20Dance.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"05:53","title": "Lose Yourself to Dance","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "165","url": "https://www.dropbox.com/s/nq7nnoagdhgy0mu/11%20-%20Digital%20Love.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"05:01","title": "Digital Love","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "166","url": "https://www.dropbox.com/s/du4z1h03iicxivo/12%20-%20Revolution%20909.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"05:35","title": "Revolution 909","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "167","url": "https://www.dropbox.com/s/wpzl62nno597ahx/13%20-%20Give%20Life%20Back%20to%20Music.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"04:35","title": "Give Life Back to Music","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "168","url": "https://www.dropbox.com/s/tpdk3tll6tvhrfe/14%20-%20Something%20About%20Us.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"03:52","title": "Something About Us","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
, {"id": "169","url": "https://www.dropbox.com/s/z9org0rgm3mnlvi/15%20-%20Doin%27%20it%20Right.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/oj98zy6u8ntoe55/Cover.jpg?dl=1","time":"04:11","title": "Doin' it Right","artist":"Daft Punk","properties": [{ "name":"artist", "value":"Daft Punk" }, { "name":"list", "value":"Electrónica y Dance" }]}
// Mumford And Sons, Babel
, {"id": "170","url": "https://www.dropbox.com/s/a4ccof3qzpmpegl/01.%20Babel.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"03:29","title": "Babel","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "171","url": "https://www.dropbox.com/s/jq1fc4450ljwvjh/02.%20Whispers%20In%20The%20Dark.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"03:15","title": "Whispers In The Dark","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "172","url": "https://www.dropbox.com/s/o65iy1frla6of05/03.%20I%20Will%20Wait.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"04:36","title": "I Will Wait","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "173","url": "https://www.dropbox.com/s/suzpyoi4ccguf6h/04.%20Holland%20Road.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"04:13","title": "Holland Road","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "174","url": "https://www.dropbox.com/s/sxiodm3fu93vx4r/05.%20Ghosts%20That%20We%20Knew.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"05:39","title": "Ghosts That We Knew","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "175","url": "https://www.dropbox.com/s/0gu97gdis4zrkoq/06.%20Lover%20Of%20The%20Light.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"05:14","title": "Lover Of The Light","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "176","url": "https://www.dropbox.com/s/uyg3jwxrhph35uz/07.%20Lovers%27%20Eyes.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"05:21","title": "Lovers' Eyes","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "177","url": "https://www.dropbox.com/s/fxorlws8pwpjkfb/08.%20Reminder.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"02:04","title": "Reminder","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "178","url": "https://www.dropbox.com/s/cm7y4f7urm5mfyz/09.%20Hopeless%20Wanderer.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"05:07","title": "Hopeless Wanderer","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "179","url": "https://www.dropbox.com/s/uh5easo7nsf6y2r/10.%20Broken%20Crown.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"04:16","title": "Broken Crown","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "180","url": "https://www.dropbox.com/s/nb9s5ys0lrvsst8/11.%20Below%20My%20Feet.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"04:52","title": "Below My Feet","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "181","url": "https://www.dropbox.com/s/f5mwkt7jphqdcob/12.%20Not%20With%20Haste.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"04:09","title": "Not With Haste","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "182","url": "https://www.dropbox.com/s/n1xcbxmwbkwovts/13.%20For%20Those%20Below.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"03:35","title": "For Those Below","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "183","url": "https://www.dropbox.com/s/j0gijdfub05kvby/14.%20The%20Boxer.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"04:05","title": "The Boxer","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
, {"id": "184","url": "https://www.dropbox.com/s/lk8wegg3q2djeoi/15.%20Where%20Are%20You%20Now.mp3?dl=1","lyric":"","thumb": "https://www.dropbox.com/s/03kud1ekkpaxecp/cover.jpeg?dl=1","time":"03:39","title": "Where Are You Now","artist":"Mumford And Sons","properties": [{ "name":"artist", "value":"Mumford And Sons" }, { "name":"album", "value":"Babel" }]}
      ];

    service.getData = function() {
      return songs;
    };

    return service;
  });
