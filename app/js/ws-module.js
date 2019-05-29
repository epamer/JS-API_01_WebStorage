const ws = (function() {
  const _options = {};
  const _tableHeaderNodeElement = document.querySelector("thead");
  const _tableBodyNodeElement = document.querySelector("tbody");

  const _defaults = {
    form: null,
    table: null,
    fieldsId: ["first_name", "last_name", "birthday"],
    keyPref: "myKey",
    seelctedRowClass: "row-select"
  };

  const _api = {
    //   exeption QUOTA_EXCEEDED_ERR
    get(key) {
      try {
        const data = localStorage.getItem(key);
        return JSON.parse(data);
      } catch (ex) {
        console.error(ex);
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (ex) {
        console.error(ex);
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (ex) {
        console.error(ex);
      }
    }
  };

  function _isValidInputValue(val) {
    if (!val.trim().length) {
      console.error("Save data was failed. Please, fill in ALL form fields!");
      return false;
    }
    return true;
  }

  function _getFormDataByFields(fieldsList) {
    let data = {};
    for (let fieldId of fieldsList) {
      let val = _options.form.querySelector(`#${fieldId}`).value;
      if (!_isValidInputValue(val)) return;
      data[fieldId] = val;
    }
    return data;
  }

  function _renderTable(key, data) {
    const rowNodeElement = document.createElement("tr");
    rowNodeElement.dataset.key = key;

    for (let item in data) {
      const cell = document.createElement("td");
      cell.innerText = data[item];
      rowNodeElement.appendChild(cell);
    }
    _tableBodyNodeElement.appendChild(rowNodeElement);
  }

  return Object.freeze({
    setOptions(obj) {
      Object.assign(_options, _defaults, obj);
    },

    save() {
      const data = _getFormDataByFields(_options.fieldsId);
      let key = _options.keyPref + Date.now();
      _api.set(key, data);
    },

    clearForm() {
      _options.form.reset();
    },

    refresh() {
      _tableBodyNodeElement.innerHTML = null;
      _tableHeaderNodeElement.innerHTML = _options.fieldsId
        .map(fieldId => `<th>${fieldId}</th>`)
        .join("");

      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!key.includes(_options.keyPref)) continue;

        const person = _api.get(key);
        _renderTable(key, person);
      }
    },

    select(e) {
      if (e.target.tagName !== "TD") return;
      e.target.parentNode.classList.toggle(_options.seelctedRowClass);
    },

    remove(selector) {
      const selectedRows = _tableBodyNodeElement.querySelectorAll(
        `${selector}`
      );
      for (let row of selectedRows) {
        const key = row.dataset.key;
        _api.remove(key);
      }
    }
  });
})();
