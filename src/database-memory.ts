import { randomUUID } from "node:crypto";

// Types
import type { VideoType } from "./interfaces/DatabaseTypes";

export class DatabaseMemory {
    #videos = new Map();

    list() {
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0];
            const data = videoArray[1];

            return {
                id,
                ...data
            }
        });

            
    }

    create(video: VideoType) {
        const videoId = randomUUID();

        return this.#videos.set(videoId, video);
    }

    update(id: string, video: VideoType) {
        this.#videos.set(id, video);
    }

    delete(id: string) {
        this.#videos.delete(id);
    }
};