import { errors } from '../errors';

export const generateQuery = (table: string, id: string, toUpdate: Record<string, any>): [string, any[]] => {
    const params: any[] = [];
    const querystring: string[] = [];

    let currentArg = 0;

    if (Object.keys(toUpdate).length === 0)
        throw errors["h.nothing-to-update"];

    for (const key of Object.keys(toUpdate)) {
        if (toUpdate[key] === undefined) continue;
        currentArg++;
        params.push(toUpdate[key]);
        querystring.push(`${key} = $${currentArg}`);
    }

    params.push(id);

    return [`update ${table} set ${querystring.join(", ")} where id = $${currentArg + 1}`, params];
};
