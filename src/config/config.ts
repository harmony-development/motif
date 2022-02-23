import { readFile, writeFile } from "fs/promises";
import YAML from "yaml";

export interface IConfig {
	port: number
	useLocalCORS: boolean
	postgres: string
	redis: string
	auth: {
		tokenLength: number
		disableRegistration: boolean
	}
}

// eslint-disable

const defaultConfig = `
port: 2289
useLocalCORS: false
postgres: ""
redis: ""
auth:
  disableRegistration: false
  tokenLength: 32
`;

// In the future this will be able to read from more sources
export async function readConfig(): Promise<IConfig> {
	const filePath = process.env.CONFIG_PATH || "./config.yaml";
	try {
		const cfg = YAML.parse((await readFile(filePath)).toString("utf8"));
		return cfg;
	}
	catch (e) {
		if (e.code !== "ENOENT") throw e;
		await writeFile(filePath, defaultConfig);
		throw new Error(
			"default config file has been written, please edit and rerun the program.",
		);
	}
}
