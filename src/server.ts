import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres";
import type { VideoType } from "./interfaces/DatabaseTypes";

const server = fastify();

const database = new DatabasePostgres();

server.post("/videos", async (req, res) => {
    const { title, description, duration} = req.body as VideoType;

    database.create({
        title,
        description,
        duration,
    });

    return res.status(201).send();
});

server.get("/videos", async (req, res) => {
    const { search } = req.query as { search: string };

    const videos = await database.list(search);

    return videos;
})

server.put("/videos/:id", async (req, res) => {
    const { id: videoId } = req.params as {id: string};
    const { title, description, duration } = req.body as VideoType;

   await database.update(videoId, {
        title,
        description,
        duration,
    });

    return res.status(204).send();
})

server.delete("/videos/:id", async (req, res) => {
    const { id: videoId } = req.params as { id: string };
    
    await database.delete(videoId);

    return res.send("Vídeo excluído com sucesso!");
})


server.listen({
    port: 3333
});