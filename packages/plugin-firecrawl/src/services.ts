import { elizaLogger } from "@elizaos/core";
import { CrawlResponse, ScrapeResponse } from "./types";

const BASE_URL = "https://api.firecrawl.dev/v1";

export const createFirecrawlService = (apiKey: string) => {
    const getScrapeData = async (url: string): Promise<ScrapeResponse> => {
        if (!apiKey || !url) {
            throw new Error("Invalid parameters: API key and URL are required");
        }

        try {
            const response = await fetch(`${BASE_URL}/scrape`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url,
                }),
            });

            elizaLogger.info("response: ", response);

            console.log("data: ", response);

            const data = await response.json();
            return data
        } catch (error: any) {
            console.error("FireCrawl API Error:", error.message);
            throw error;
        }
    };

    const getCrawlData = async (url: string): Promise<CrawlResponse> => {
        if (!apiKey || !url) {
            throw new Error("Invalid parameters: API key and URL are required");
        }

        try {
            const response = await fetch(`${BASE_URL}/crawl`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url,
                }),
            });

            elizaLogger.info("response: ", response);

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("FireCrawl API Error:", error.message);
            throw error;
        }
    };

    return { getCrawlData, getScrapeData };
};
