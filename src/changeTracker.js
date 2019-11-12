import paper from 'paper'
import { ChangeFlag } from './ChangeFlag'

class ChangeTracker {
  constructor() {
    this.project = null
    this.listeners = {}
  }

  begin(project) {
    this.project = project
    project._changes = []
    project._changesById = {}
    project.view.on('frame', () => this.onFrame())
  }

  onFrame() {
    const { project } = this
    const emit = []

    if (project._changes.length) {
      // While we're looping through the changes we can't emit directly, because
      // an event listener again might cause a change. If this happens while
      // we're still looping the changes, this new change will not be
      // recognised. So we first wait for the changes loop to finish and clear
      // the changes. Now a change caused by an event listener will be handled
      // in the next frame.
      for (const [id, payload] of Object.entries(project._changesById)) {
        emit.push({ id, payload })
      }

      project._changes = []
      project._changesById = {}

      for (const { id, payload } of emit) {
        this.emit(id, payload)
      }
    }
  }

  emit(id, payload) {
    for (const listener of this.listeners[id] || []) {
      listener(payload)
    }
  }

  on(item, callback) {
    const { listeners } = this
    const { id } = item
    listeners[id] = listeners[id] || []
    listeners[id].push(callback)
  }

  off(item, callback) {
    const { listeners } = this
    const itemListeners = listeners[item.id]
    if (itemListeners) {
      // Delete listener.
      const index = itemListeners.indexOf(callback)
      if (index !== -1) {
        itemListeners.splice(index, 1)
      }
      // Clean up, if there are no listeners for this item left.
      if (!itemListeners.length) {
        delete this.listeners[item.id]
      }
    }
  }
}

export const changeTracker = new ChangeTracker()
