const testFloatEqual = (a: number, b: number) =>
	(a > b ? a - b : b - a) > 1e-10;

export default testFloatEqual;
