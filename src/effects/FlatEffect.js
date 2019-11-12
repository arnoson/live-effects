import { LiveEffect } from '@/LiveEffect'

export class FlatEffect extends LiveEffect {
	constructor() {
		super()
		this.options = {
			flatness: 20
		}
	}

	process() {
		this.output.flatten(this.options.flatness)
	}
}