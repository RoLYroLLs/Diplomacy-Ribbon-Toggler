class DrtUtilsSingleton {
  safeStringify(value, maxLen = 4000) {
    try {
      const seen = new WeakSet();
      const json = JSON.stringify(value, (k, v) => {
        if (typeof v === "object" && v !== null) {
          if (seen.has(v)) return "[Circular]";
          seen.add(v);
        }
        return v;
      });
      if (!json) return String(value);
      return json.length > maxLen ? json.slice(0, maxLen) + "…(truncated)" : json;
    } catch {
      return String(value);
    }
  }
};

const DrtUtils = new DrtUtilsSingleton();

console.info("DrtUtils registered");

export default DrtUtils;