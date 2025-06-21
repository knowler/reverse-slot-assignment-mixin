// TODO: handle insertions at the start or between nodes
export const ReverseSlotAssignment = superclass => class extends superclass {
	#slotsBySlotted = new Map();

	constructor() {
		super();

		const mo = new MutationObserver((entries) => {
			for (const entry of entries) {
				for (const node of entry.addedNodes) this.#assignNodeToSlot(node);
				for (const node of entry.removedNodes) {
					if (
						node.nodeType !== Node.ELEMENT_NODE &&
						node.nodeType !== Node.TEXT_NODE
					) continue;
					const slot = this.#slotsBySlotted.get(node);
					this.#slotsBySlotted.delete(node);
					slot.remove();
				}
			}
		});

		mo.observe(this, { childList: true });
	}

	#assignNodeToSlot(node) {
		if (
			node.nodeType !== Node.ELEMENT_NODE &&
			node.nodeType !== Node.TEXT_NODE
		) return;
		if (this.#slotsBySlotted.has(node)) return;
		const slot = this.ownerDocument.createElement("slot");
		this.shadowRoot.prepend(slot);
		slot.assign(node);
		this.#slotsBySlotted.set(node, slot);
	}

	connectedCallback() {
		if (!this.shadowRoot) return console.warn("ReverseSlotAssignment: missing shadow root");
		if (this.shadowRoot.slotAssignment !== "manual") return console.warn("ReverseSlotAssignment: must use manual slot assignment");

		for (const node of this.childNodes) this.#assignNodeToSlot(node);
	}
}
