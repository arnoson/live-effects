import { LiveEffect } from '@/LiveEffect'

export class ColorShiftEffect extends LiveEffect {
	constructor() {
		super()
		this.options = {
			amount: 50
		}
	}

  process() {
    this.output.fillColor.hue += this.options.amount
  }
}