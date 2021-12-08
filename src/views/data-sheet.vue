<template>
  <div id="data-sheet">
    <div class="no-print" ref="controls">
      <h1>Data Sheet</h1>
      <button type="button" @click="onSave">Save</button>
      <button type="button" @click="onRestore">Restore</button>
      <a :href="csvContent" download="download.csv">Download here</a>
    </div>

    <div style="display: flex" ref="dataSpread">
      <div id="x-spreadsheet-demo" ref="tableContainer"></div>
    </div>
  </div>
</template>

<script>
import Spreadsheet from "x-data-spreadsheet";
import zhCN from "x-data-spreadsheet/dist/locale/zh-cn";

export default {
  name: "DataSheet",
  components: {},
  data() {
    return {
      editor: null,
      internalChange: false,
      dataSheet: {},
      oldDataSheet: null,
      csvContent: "data:text/csv;charset=utf-8,",
    };
  },
  methods: {
    initTable(data = {}) {
      if (!this.editor) {
        Spreadsheet.locale("zh-cn", zhCN);
        this.editor = new Spreadsheet(this.$refs.tableContainer, {
          view: {
            height: () => document.documentElement.clientHeight,
            width: () => document.documentElement.clientWidth,
          },
          row: {
            len: 25,
          },
          col: {
            len: 20,
          },
        });
        console.log(this.editor);
        this.editor.loadData(data).change((data) => {
          if (this.editor) {
            this.internalChange = true;
            this.$emit("input", data);
            this.$nextTick(() => {
              this.internalChange = false;
              this.dataSheet = { ...data };
              const parseData = JSON.parse(JSON.stringify(data));
              let rows = [];
              for (let [row, cells] of Object.entries(parseData.rows)) {
                for (let cell of Object.values(cells)) {
                  rows[row] = Object.values(cell)
                    .map((cellItem) => cellItem.text)
                    .join(",");
                  rows[row] += "\n";
                }
              }
              console.log((this.csvContent += rows.join(",")));
              this.csvContent += rows.join(",");
            });
          }
        });
        // data validation
        this.editor.validate();
        console.log(this.editor.destroy);
        window.editor = this.editor;
      }
    },
    onSave() {
      this.oldDataSheet = JSON.stringify(this.editor.getData()[0]);
      this.editor.loadData({ ...this.editor.getData()[0] });
    },
    onRestore() {
      this.dataSheet = JSON.parse(this.oldDataSheet);

      this.editor.loadData(this.dataSheet);
    },
  },
  watch: {
    csvContent(val) {
      console.log(val);
    },
  },
  mounted() {
    this.initTable({ ...this.dataSheet });
  },
  beforeRouteLeave(to, from, next) {
    if (!this.oldDataSheet || !Object.entries(this.dataSheet).length) {
      return next();
    }
    const answer = window.confirm(
      `Are you sure to leave this page and visit to ${to.path}?`
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
};
</script>

<style>
button {
  margin: 1rem;
}
</style>
