const armstepStorage = {
    set(key, value) {
        if (value === undefined) return;
        let stringify = JSON.stringify(value);
        localStorage.setItem(key, stringify);
    },
    get(key, defaultValue = "") {
        let stringify = localStorage.getItem(key);
        if (stringify === null || stringify === "undefined") return defaultValue;
        console.log();
        return JSON.parse(stringify) ? JSON.parse(stringify) : "";
    },
    clear() {
        localStorage.clear();
    },
    remove(key) {
        localStorage.removeItem(key);
    }
}

export default armstepStorage;
