/**
 * map an object of one type to an object of another type
 *
 * @param obj 	the input object
 * @param fn  	the function to run for each entry
 * @returns   	the converted object
 */
export const mapObject = <K extends string | number | symbol, V, VResult>(obj: Record<K, V>, fn: (v: V, k: K, i: number) => VResult) =>
	Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v as V, k as K, i)]));

/**
 * converts an array of objects to record using speicified function
 *
 * @param arr the input array of objects
 * @param fn  the function to run for each entry, returning the key and value in a tuple
 * @returns   the object that the array was mapped to
 */
export const arrayToObj = <O, I>(objs: I[], fn: (obj: I) => [string, O]): Record<string, O> => Object.fromEntries(objs.map(fn));
