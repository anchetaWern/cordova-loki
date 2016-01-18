(function(){

  angular.module('starter')
  .service('CameraService', ['$q', CameraService]);

  function CameraService($q){

    var me = this;
    
    me.options = {
      quality: 80,
      correctOrientation: true
    };
    
    function getPicture(){

      var q = $q.defer();

      me.options.encodingType = Camera.EncodingType.JPEG;
      me.options.sourceType = Camera.PictureSourceType.CAMERA;
      

      navigator.camera.getPicture(
        function(result){
          q.resolve(result);
        }, 
        function(err){
          q.reject(err);
        }, 
        me.options
      );

      return q.promise;
    }

    return {
      getPicture: getPicture
    }
  }

})();
