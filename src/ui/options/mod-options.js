import { d as CategoryData, C as CategoryType } from '/core/ui/options/editors/index.chunk.js';
import DrtUtils from '../../helpers/drt-utils.js';

CategoryType["Mods"] = "mods";
CategoryData[CategoryType.Mods] ??= {
  title: "LOC_UI_CONTENT_MGR_SUBTITLE",
  description: "LOC_UI_CONTENT_MGR_SUBTITLE_DESCRIPTION",
};

export class ModOptionsSingleton {
  save(modID, optionID, value) {
    const optionName = `${modID}.${optionID}`;
    UI.setOption("user", "Mod", optionName, value);
    Configuration.getUser().saveCheckpoint();
    if (localStorage.length > 1) {
      console.info(`erasing storage (${localStorage.length} items)`);
      localStorage.clear();
    }
    const storage = localStorage.getItem("modSettings") || "{}";
    const options = JSON.parse(storage);
    options[modID] ??= {};
    options[modID][optionID] = value;
    localStorage.setItem("modSettings", JSON.stringify(options));
    console.info(`SAVE ${optionName}=${DrtUtils.safeStringify(value)}`);
  }
  load(modID, optionID) {
    const optionName = `${modID}.${optionID}`;
    const value = UI.getOption("user", "Mod", optionName);
    if (value != null) {
      console.info(`LOAD ${optionName}=${DrtUtils.safeStringify(value, 200000)} (saved)`);
      return value;
    }
    // const value = UI.getOption("user", "Mod", data.optionName);
    try {
      const storage = localStorage.getItem("modSettings");
      if (!storage) return null;
      const options = JSON.parse(storage);
      if (!options) return null;
      options[modID] ??= {};
      const value = options[modID][optionID];
      console.info(`LOAD ${optionName}=${DrtUtils.safeStringify(value, 200000)} (stored)`);
      return value;
    }
    catch (e) {
      console.error(`error loading options: ${e}`);
    }
    return null;
  }
}
const ModOptions = new ModOptionsSingleton();
export { ModOptions as default };
