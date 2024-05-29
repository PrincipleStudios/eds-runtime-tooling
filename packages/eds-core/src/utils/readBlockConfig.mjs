import { toClassName } from './toClassName.mjs';

/**
 * Extracts the config from a block.
 * @param {Element} block The block element
 * @returns {object} The block config
 */
export function readBlockConfig(block) {
	const config = {};
	block.querySelectorAll(':scope > div').forEach((row) => {
		if (row.children) {
			const cols = [...row.children];
			if (cols[1]) {
				const col = cols[1];
				const name = toClassName(cols[0].textContent);
				let value = '';
				if (col.querySelector('a')) {
					const as = [...col.querySelectorAll('a')];
					if (as.length === 1) {
						value = as[0].href;
					} else {
						value = as.map((a) => a.href);
					}
				} else if (col.querySelector('img')) {
					const imgs = [...col.querySelectorAll('img')];
					if (imgs.length === 1) {
						value = imgs[0].src;
					} else {
						value = imgs.map((img) => img.src);
					}
				} else if (col.querySelector('p')) {
					const ps = [...col.querySelectorAll('p')];
					if (ps.length === 1) {
						value = ps[0].textContent;
					} else {
						value = ps.map((p) => p.textContent);
					}
				} else value = row.children[1].textContent;
				config[name] = value;
			}
		}
	});
	return config;
}
