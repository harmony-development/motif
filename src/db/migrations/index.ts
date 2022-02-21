import type { Pool } from "pg";
import * as migration0 from "./0";

export interface migration {
	up: (arg0: Pool) => Promise<any>
	down: (arg0: Pool) => Promise<any>
}

const migrations: migration[] = [migration0];

export default migrations;
