import { Point } from 'paper'
import { LiveEffect } from '@/LiveEffect'

export class ShakeEffect extends LiveEffect {
  constructor() {
    super()
    this.options = {
      range: 50
    }
  }

  process() {
    const { range } = this.options
    for (const segment of this.output.segments) {
      segment.point = segment.point.add(
        new Point.random().multiply(range).subtract(range / 2)
      )
    }
  }
}