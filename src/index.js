import paper, { Path } from 'paper'
import { FlatEffect, ShakeEffect, ColorShiftEffect } from './effects'
import { LiveEffects } from './LiveEffects'
import { changeTracker } from './changeTracker'
import { ChangeFlag } from './ChangeFlag'

paper.setup(document.querySelector('canvas'))
changeTracker.begin(paper.project)

const circle = new Path.Circle({
	fillColor: 'red',
	radius: 100,
	center: paper.view.center,
	selected: true,
	name: 'circle'
})

const effects = new LiveEffects(circle)
const flat = new FlatEffect()
const colorShift = new ColorShiftEffect()
const shake = new ShakeEffect()
effects.add([flat, colorShift, shake])

document.querySelector('#item-color').addEventListener('input', function() {
	circle.fillColor = this.value
})

document.querySelector('#flatness').addEventListener('input', function() {
	flat.options.flatness = this.value
	flat.apply()
})

document.querySelector('#color-shift').addEventListener('input', function() {
	colorShift.options.amount = this.value
	colorShift.apply()
})

document.querySelector('#shake').addEventListener('input', function() {
	shake.options.range = this.value
	shake.apply()
})