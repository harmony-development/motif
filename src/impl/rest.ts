import fs from 'fs/promises';
import Router from "koa-router";

let version = "unknown";
// eslint-disable-next-line @typescript-eslint/no-floating-promises
fs.readFile(".version").then(x => version = x.toString()).catch(() => { });

const router = new Router({
	prefix: "/_harmony",
});

router.get("/about", async (ctx) => {
	ctx.body = {
		serverName: "Motif",
		version,
		aboutServer: ctx.state.config.aboutServer,
		messageOfTheDay: ctx.state.config.motd,
	};
});

export default router;
