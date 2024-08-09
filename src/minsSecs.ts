const pad = (nParam: number, width: number, zParam?: string) => {
	const z = zParam || "0";
	const n = `${nParam}`;
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const minsSecs = (secs: number) => {
	const mins = Math.floor(secs / 60);
	const seconds = secs - mins * 60;
	return `${mins}:${pad(seconds, 2)}`;
};

export default minsSecs;
