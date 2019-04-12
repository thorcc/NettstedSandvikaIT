const firebase = require("firebase");
const fs = require("fs");
const inquirer = require('inquirer');

// Local classes
const localUtils = require("./utils");
const Source = require("./source");

// Init firebase
var app = localUtils.initFirebase(firebase);

const mainMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'type',
        message: 'Velg hva du ønsker å gjøre:',
        choices: [
          'Hent ut prosjekter (prosjektbasert)',
          'Hent ut ett prosjekt',
          'Når commited folk sist',
          new inquirer.Separator()
        ]
    }).then(function(action) {
        submenu(action);
    });
}


const submenu = (action) => {

    switch(action.type) {
        case 'Hent ut prosjekter (prosjektbasert)':
            classTypeMenu();
            break;
        case 'Hent ut ett prosjekt':
            break;
        case 'Når commited folk sist':
            break;
    }
}

const classTypeMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'type',
        message: 'Hvilken klasse ønsker du å hente fra?',
        choices: [
            'Informasjons Teknologi 1',
            'Informasjons Teknologi 2',
            new inquirer.Separator()
        ]
    }).then(function(classType) {
        selectClassMenu(classType);
    })
}

const selectClassMenu = (classType) => {
    // Hent ut alle hvilke klasser du ønsker
   const classSufix = (classType === "Informasjons Teknologi 1") ? "IT1" : "IT2";

   const db = app.firestore();
   const classesRef = db.collection("klasser").doc(classSufix);

   classesRef.get().then(function(doc) {
        if (doc.exists) {
            var classIds = doc.data()['klasser'];

            inquirer.prompt({
                type: 'list',
                name: 'type',
                message: 'Hvilken klasse ønsker du å hente fra?',
                choices: classIds
            }).then(function(classId) {
                getAllProjects(classId.type, classSufix);
            })
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

const getAllProjects = (classId, classSufix) => {
    const db = app.firestore();
    const projectsRef = db.collection("prosjekter");

    projectsRef.get().then(snapshot => {
        var projects = [];
        snapshot.forEach((doc) => {
            if (doc.exists) {
                projects.push(doc.id);
            } else {
                console.log("No such document!");
            }
        });

        inquirer.prompt({
            type: 'list',
            name: 'type',
            message: 'Hvilket prosjekt?',
            choices: projects
        }).then(function(projectName) {
            // Get all projects to a location
            let location = "./prosjekter/" + classSufix + "/" + classId;
            inquirer.prompt({
                type: 'confirm',
                name: 'default',
                message: 'Alle filene kommer til å komme her: (' + location + ')'
            }).then(function (defaultLocation) {
                if (defaultLocation) {
                    Source.cloneAllProjects(classId, classSufix, projectName, app);
                } else {
                    
                }
            });
        })
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}



mainMenu();