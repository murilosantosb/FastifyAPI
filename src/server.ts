import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory";
import type { VideoType } from "./interfaces/DatabaseTypes";

const server = fastify();

const database = new DatabaseMemory();

server.post("/videos", (req, res) => {
    const { title, description, duration } = req.body as VideoType;

    database.create({
        title,
        description,
        duration,
    });

    return res.status(201).send();
});

server.get("/videos", (req, res) => {
    const videos = database.list();

    return videos;
})

server.put("/videos/:id", (req, res) => {
    const { id: videoId } = req.params as {id: string};
    const { title, description, duration } = req.body as VideoType;

    database.update(videoId, {
        title,
        description,
        duration,
    });

    return res.status(204).send();
})

server.delete("/videos/:id", (req, res) => {
    const { id: videoId } = req.params as { id: string };
    
    database.delete(videoId);

    return res.send("Vídeo excluído com sucesso!");
})


server.listen({
    port: 3333
})