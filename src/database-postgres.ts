import { randomUUID } from "crypto";
import sql from "./db.js";

// Types
import type { VideoType } from "./interfaces/DatabaseTypes";

export class DatabasePostgres {

    async list(search = "") {
        let videos: any;

        if (search) {
            videos = await sql`SELECT * FROM videos WHERE title ILIKE ${'%' + search + '%'}`
        }else {
            videos = await sql`SELECT * FROM videos`
        }

        return videos;
    }

    async create(video: VideoType) {
        const videoId = randomUUID();
        const { title, description, duration } = video;

        await sql`
            INSERT INTO videos (id, title, description, duration)
            VALUES (${videoId}, ${title}, ${description}, ${duration})
        `;

        return { id: videoId, ...video };
    }

    async update(id: string, video: VideoType) {
        const { title, description, duration } = video;

        await sql`
        UPDATE videos
        SET title = ${title},
            description = ${description},
            duration = ${duration}
        WHERE id = ${id}
        `;

        return video;
    }

    async delete(id: string) {
        await sql`DELETE FROM videos WHERE id = ${id}`
    }
};