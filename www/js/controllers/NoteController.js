(function(){
	angular.module('starter')
	.controller('NoteController', ['$scope', '$state', '$ionicModal', '$ionicPlatform', 'CameraService', 'NoteService', NoteController]);
	
	function NoteController($scope, $state, $ionicModal, $ionicPlatform, CameraService, NoteService){

		var me = this;

		me.notes = [];

		$ionicPlatform.ready(function(){
			NoteService.initialize();

			NoteService.getNotes().then(function(notes){
				me.notes = notes;
			});
		});

	
		$ionicModal.fromTemplateUrl('new-note.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		}).then(function(modal){
			$scope.new_note_modal = modal;
		});

		$ionicModal.fromTemplateUrl('image-modal.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		}).then(function(modal){
			$scope.image_modal = modal;
		});


		me.truncate = function(string){

			return _.truncate(string, {length: 35});
		};

		$scope.deleteNote = function(note){
			
			NoteService.deleteNote(note);
		};

		
		$scope.newNote = function(){
			$scope.note = {};
			$scope.isUpdate = false;
			$scope.new_note_modal.show();
		};


		$scope.viewNote = function(note){
			$scope.note = {};
			$scope.note = note;
			$scope.isUpdate = true;
			$scope.new_note_modal.show();
		};


		$scope.takePicture = function(){

			CameraService.getPicture().then(function(photo){
				$scope.note.photo = photo;
			});

		};


		$scope.saveNote = function(){
			
			if($scope.isUpdate){
				NoteService.updateNote($scope.note);
			}else{
				NoteService.addNote($scope.note);
			}

			$scope.note = {
				title: '',
				text: '',
				photo: null 
			};

			$scope.new_note_modal.hide();
			
		};


		$scope.viewImage = function(image){
			$scope.note.photo = image;
			$scope.image_modal.show();
		};


		$scope.closeModal = function(modal){
			$scope[modal + '_modal'].hide();
		};


	}

})();