# Reverse slot assignment mixin

A *work in progress* mixin for reversing nodes within an element. Created as an
example of manual slot assignment.

```javascript
import { ReverseSlotAssignment } from "./reverse-slot-assignment.js";

class UnoReversoElement extends ReverseSlotAssignment(HTMLElement) {
	constructor() {
		super();

		this.attachShadow({
			mode: "open",
			slotAssignment: "manual",
		});
	}
}

customElements.define("uno-reverso", UnoReversoElement);
```

```html
<uno-reverso><span>First</span><span>Second</span><span>Third</span></uno-reverso>
<uno-reverso>First<!-- -->Second<!-- -->Third</uno-reverso>
```
