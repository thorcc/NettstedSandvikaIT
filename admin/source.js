const Git = require("nodegit");

module.exports = {
    cloneAllProjects: function(classId, classSufix, projectName, app) {
        const db = app.firestore();
        const projectsRef = db.collection("prosjekter").doc(projectName.type + "/" + classId);

        projectsRef.get().then(snapshot => {
            snapshot.forEach((doc) => {
                if (doc.exists) {
                    console.log(doc)
                } else {
                    console.log("No such document!");
                }
            });
        });

        //const location = "./prosjekter/" + classSufix + "/" + classId;
        //Git.Clone("https://github.com/nodegit/nodegit", location)
    }
}