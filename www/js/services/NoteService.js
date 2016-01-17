(function(){

    angular.module('starter')
    .service('NoteService', ['$q', 'Loki', NoteService]);

    function NoteService($q, Loki){  
        
        var db;
        var notes;

        function initialize(){    
            var adapter = new LokiCordovaFSAdapter({"prefix": "loki"});      
            db = new Loki('notes_db', {
                autosave: true,
                autosaveInterval: 1000,
                adapter: adapter
            });
        }

        function getNotes(){

            return $q(function(resolve, reject){
                
                db.loadDatabase({}, function(){
                    notes = db.getCollection('notes');

                    if(!notes){
                        notes = db.addCollection('notes');
                    }

                    resolve(notes.data);
                });
            });

        }

        function addNote(note){
            notes.insert(note);
        }

        function updateNote(note){
            notes.update(note);
        }

        function deleteNote(note){
            notes.remove(note);
        }

        return {
            initialize: initialize,
            getNotes: getNotes,
            addNote: addNote,
            updateNote: updateNote,
            deleteNote: deleteNote
        };
    }

})();
