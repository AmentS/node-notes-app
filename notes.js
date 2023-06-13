const fs = require('fs');
const log = console.log;
const chalk = require('chalk');

const readNote = title => {
    const notes = loadNotes();
    const noteToRead = notes.find(note => note.title === title); //stane

    if(noteToRead) {
        log(chalk.green(noteToRead.title) + '\n' + chalk.blue(noteToRead.body));
    }else {
        log(chalk.red("There is no note with title: " + title));
    }
}


const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title); //stane

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        log(chalk.green('New note added'));
    } else {
        log(chalk.red("Duplicate note for: " + title));
    }

}


const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const removeNote = title => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if(notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        log(chalk.green.inverse("Removed: " + title));
    } else {
        log(chalk.red.inverse("No note with title: " + title));
    }
    
 }

 const listNotes = () => {
    const notes = loadNotes();
    log(chalk.green('Your notes:'));
     notes.forEach(note => log(note.title));
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }

}




module.exports = {
    readNote: readNote,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes
} //sa ovom linijom eksporutujemo ovaj fajl da mozemo da ga zovemo u drugi fajs preko require