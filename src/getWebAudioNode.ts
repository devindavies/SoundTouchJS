import noop from "./noop";
/**
 * getWebAudioNode
 *
 * A wrapper to create an AudioNode and apply a filter for frame extraction
 * Copyright (c) Adrian Holovary https://github.com/adrianholovaty
 *
 * @param context - AudioContext
 * @param filter - Object containing an 'extract()' method
 * @param bufferSize - units of sample frames (256, 512, 1024, 2048, 4096, 8192, 16384)
 * @returns {ScriptProcessorNode}
 */
const getWebAudioNode = (
	context: AudioContext,
	filter: {
		extract: (samples: Float32Array, bufferSize: number) => number;
		sourcePosition: number;
		onEnd: () => void;
	},
	sourcePositionCallback: (arg?: number) => void = noop,
	bufferSize = 4096,
) => {
	const node = context.createScriptProcessor(bufferSize, 2, 2);
	const samples = new Float32Array(bufferSize * 2);

	node.onaudioprocess = (event) => {
		const left = event.outputBuffer.getChannelData(0);
		const right = event.outputBuffer.getChannelData(1);
		const framesExtracted = filter.extract(samples, bufferSize);
		sourcePositionCallback(filter.sourcePosition);
		if (framesExtracted === 0) {
			filter.onEnd();
		}
		let i = 0;
		for (; i < framesExtracted; i++) {
			left[i] = samples[i * 2];
			right[i] = samples[i * 2 + 1];
		}
	};
	return node;
};

export default getWebAudioNode;
