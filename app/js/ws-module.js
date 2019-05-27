const ws = (function() {
  const _defaults = {
    form: null,
    table: null,
    fieldsId: ["first_name", "last_name", "birthday"],
    keyPref: "myKey",
    seelctedRowClass: "row-select"
  };

  const _options = {};

  return {
    setOptions(obj) {
      Object.assign(_options, _defaults, obj);
    },

    save() {
      let data = {},
        key;

      for (let fieldId of _options.fieldsId) {
        let val = _options.form.querySelector(`#${fieldId}`).value;
        if (!val.trim().length) {
          console.error("Save data was failed. Please, fill in ALL form fields!");
          return;
        }
        data[fieldId] = val;
      }

      try {
        key = _options.keyPref + Date.now();
        localStorage.setItem(key, JSON.stringify(data));
      } catch (ex) {
        console.log(ex);
      }
    },

    clearFields() {
      _options.form.reset();
    },

    refresh() {
      let tableHeaderNodeElement = _options.table.querySelector("thead");

      tableHeaderNodeElement.innerHTML = _options.fieldsId
        .map(fieldId => `<th>${fieldId}</th>`)
        .join("");
    }
  };
})();
