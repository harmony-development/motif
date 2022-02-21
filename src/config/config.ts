import { readFile, writeFile } from "fs/promises";
import YAML from "yaml";

export interface IConfig {
	port: number
	postgres: string
	redis: string
	auth: {
		disableRegistration: boolean
	}
}

const defaultConfig = `
port: 2289
postgres: ""
redis: ""
auth:
  disableRegistration: false
`;

// In the future this will be able to read from more sources
export async function readConfig(): Promise<IConfig> {
	const filePath = process.env.CONFIG_PATH || "./config.yaml";
	try {
		const cfg = YAML.parse((await readFile(filePath)).toString("utf8"));
		return cfg;
	}
	catch {
		await writeFile(filePath, defaultConfig);
		throw new Error(
			"default config file has been written, please edit and rerun the program.",
		);
	}
}
