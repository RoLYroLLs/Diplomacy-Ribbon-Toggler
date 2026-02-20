import '/core/ui/options/screen-options.js';  // make sure this loads first
import DrtGlobals from '../../helpers/drt-globals.js';
// set up mod options tab
import ModOptions from './mod-options.js';

const DrtOptions = new class {
  modID = DrtGlobals.modId;
  defaults = {
    DiploRibbonHidden: false,
  };
  data = {};
  load(optionID) {
    const value = ModOptions.load(this.modID, optionID);
    if (value == null) {
      const value = this.defaults[optionID];
      console.warn(`${this.modID}: LOAD ${this.modID}.${optionID}=${value} (default)`);
      return value;
    }
    return value;
  }
  save(optionID) {
    const value = this.data[optionID];

    // numbers / booleans for checkboxes
    if (typeof value === "boolean") {
      ModOptions.save(this.modID, optionID, Number(value));
      return;
    }

    // objects/arrays/strings (JSON-safe)
    ModOptions.save(this.modID, optionID, value);
  }
  get DiploRibbonHidden() {
    this.data.DiploRibbonHidden ??= Boolean(this.load(DrtGlobals.hiddenKey));
    return this.data.DiploRibbonHidden;
  }
  set DiploRibbonHidden(value) {
    this.data.DiploRibbonHidden = Boolean(value);
    this.save(DrtGlobals.hiddenKey);
  }
};

// log stored values
DrtOptions.DiploRibbonHidden;

export { DrtOptions as default };
