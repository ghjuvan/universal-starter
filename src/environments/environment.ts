// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyCMP3OoCBxYgxIrMaVTpdDDySnpSAkk1XU",
        authDomain: "actuuniversal.firebaseapp.com",
        databaseURL: "https://actuuniversal.firebaseio.com",
        projectId: "actuuniversal",
        storageBucket: "actuuniversal.appspot.com",
        messagingSenderId: "556513955151"
    },
    apiBase: "http://localhost:5001/actuuniversal/us-central1/"
};
