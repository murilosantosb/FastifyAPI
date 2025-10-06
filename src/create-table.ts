import sql from "./db.js";


// sql`DROP TABLE videos`
// .then(() => {
//     console.log("Tabela apagada")
// })

sql`
    CREATE TABLE videos (
        id          TEXT PRIMARY KEY,
        title       TEXT,
        description TEXT,
        duration    INTEGER
    );
`
.then(() => {
    console.log("Tabela criada!")
})


// sql`
//     ALTER TABLE videos ADD COLUMN id TEXT NOT NULL
// `
// .then(() => {
//     console.log("Tabela atualizada!")
// })