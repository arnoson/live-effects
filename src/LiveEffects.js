import paper from 'paper'
import { isArray } from '@ditojs/utils'
import { changeTracker } from './changeTracker'

export class LiveEffects {
	constructor(item) {
		this.item = item
		this.effects = []

		// Trigger the first effect if something changes on the item. Each effect
		// will call the next effect.
		changeTracker.on(item, () => {
			this.effects[0].apply()
		})
	}

	addEffect(effect) {
		const { item, effects } = this
		const index = effects.length

		const prevEffect = effects[index - 1]
		if (prevEffect) {
			prevEffect.next = effect
			effect.prev = prevEffect
		}
		effect.original = item
		effect.index = index
		effect.init()
		effect.apply()

		effects.push(effect)
	}

	add(arg) {
		if (isArray(arg)) {
			arg.forEach(item => this.add(item))
		} else {
			this.addEffect(arg)
		}
	}
}