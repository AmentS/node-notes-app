//const validator = require('validator'); // ovako radimo ako ne podrzava es6 js
const notes = require('./notes.js');
const yargs = require('yargs');
const log = console.log;

//ovo ako mi hocemo nesto nase da pravimo bez yargs modula
// const command = process.argv[2];
// if ( command === 'add') {
//     log('Spas za nas');
// } else if (command === 'remove') {
//     log('nemaa');
// }

//customise yargs version
yargs.version('1.1.0');


//create add commnad 
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
});

//create remove commnad 
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Title for removing',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

//create list commnad 
yargs.command({
    command: 'list',
    describe: 'List a new note',
    handler() {
        notes.listNotes();
    }
});

//create read commnad 
yargs.command({
    command: 'read',
    describe: 'Read a new note',
    builder: {
        title: {
            describe: 'Title for removing',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});



yargs.parse();
//ovo je isto kao ovo iznad
//log(yargs.argv);



