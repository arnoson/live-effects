import paper from 'paper'
import { changeTracker } from './changeTracker'
import { ChangeFlag } from './ChangeFlag'

let effectId = 0

export class LiveEffect {
	constructor() {
		this.prev = null
		this.next = null
		this.output = null
		this.index = null
		this.id = effectId++
	}

	get input() {
		return this.prev?.output || this.original
	}

	init() {
		this.output = this.input.clone()
		this.output.visible = true
		this.input.visible = false
	}

	apply() {
		// Mirror the style and segments of the input.
		this.output.segments = this.input.segments
		this.output.copyAttributes(this.input)
		if (!this.next) {
			this.output.visible = true
		}

		// Process and trigger the next effect.
		this.process()
		this.next?.apply()
	}
}