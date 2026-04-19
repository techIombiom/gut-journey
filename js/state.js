const GS = {
  KEY: 'gutjourney_v1',

  save(updates) {
    const current = this.get();
    const next = Object.assign({}, current, updates);
    try { localStorage.setItem(this.KEY, JSON.stringify(next)); } catch(e) {}
  },

  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '{}'); } catch(e) { return {}; }
  },

  clear() {
    try { localStorage.removeItem(this.KEY); } catch(e) {}
  },

  val(key, fallback) {
    return this.get()[key] !== undefined ? this.get()[key] : fallback;
  }
};
