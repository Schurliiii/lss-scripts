/*
 * Tabellen: Jede Spalte wird einmal beschrieben – Wert (für Sortierung und CSV) und
 * optional die Darstellung. Sortiert wird über alle Zeilen, gezeichnet werden zunächst
 * nur 200; „Weitere anzeigen“ blendet mehr ein.
 *
 *   { label, value: (row) => Zahl|Text|Datum, html?: (row) => HTML, csv?: (row) => Wert | false, sortable?: false }
 */

const MANAGER_TABLE = "manager-personnel";

function displayValue(value) {
  if (value === null || value === undefined || value === "") return '<span class="lssfo-muted">–</span>';
  if (typeof value === "number") return formatNumber(value);
  if (value instanceof Date) return esc(formatDateTime(value));
  return esc(value);
}

function sortRows(key, columns, rows, rank) {
  const sort = state.sorts[key];
  const column = sort ? columns[sort.column] : null;
  if (!column && !rank) return rows;
  const direction = sort?.direction === "desc" ? -1 : 1;
  return rows
    .map((row, index) => ({ row, index, rank: rank ? rank(row) : 0, value: column ? column.value(row) : null }))
    .sort((a, b) => a.rank - b.rank || (column ? direction * Core.compareValues(a.value, b.value, collator) : 0) || a.index - b.index)
    .map((entry) => entry.row);
}

function tableHead(key, columns) {
  const sort = state.sorts[key];
  return columns.map((column, index) => {
    if (column.sortable === false) return `<th>${esc(column.label)}</th>`;
    const direction = sort?.column === index ? sort.direction : "";
    const ariaSort = direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none";
    return `<th aria-sort="${ariaSort}"><button type="button" class="lssfo-sort${direction ? " is-active" : ""}" data-action="table-sort" data-table="${esc(key)}" data-column="${index}"><span>${esc(column.label)}</span>${icon(direction === "asc" ? "sort-asc" : direction === "desc" ? "sort-desc" : "sort")}</button></th>`;
  }).join("");
}

// Spalten mit hidden: true erscheinen nur im CSV-Export.
const visibleColumns = (columns) => columns.filter((column) => !column.hidden);

function renderTable(key, allColumns, rows, { empty = "Keine passenden Einträge gefunden.", rank, meta = true, className = "", rowAttributes } = {}) {
  if (!rows.length) return `<div class="lssfo-empty">${esc(empty)}</div>`;
  const columns = visibleColumns(allColumns);
  const sorted = sortRows(key, columns, rows, rank);
  const limit = state.limits[key] || PAGE_SIZE;
  const visible = sorted.length > limit ? sorted.slice(0, limit) : sorted;
  const remaining = sorted.length - visible.length;
  const body = visible.map((row) => `<tr${rowAttributes ? rowAttributes(row) : ""}>${columns.map((column) => `<td>${column.html ? column.html(row) : displayValue(column.value(row))}</td>`).join("")}</tr>`).join("");
  const more = remaining > 0
    ? `<div class="lssfo-table-more"><span>${formatNumber(visible.length)} von ${formatNumber(sorted.length)} angezeigt</span><button type="button" class="lssfo-btn" data-action="table-more" data-table="${esc(key)}">Weitere ${formatNumber(Math.min(PAGE_SIZE, remaining))} anzeigen</button><button type="button" class="lssfo-btn" data-action="table-all" data-table="${esc(key)}">Alle anzeigen</button></div>`
    : "";
  const metaLine = meta ? `<div class="lssfo-table-meta">${plural(rows.length, "Eintrag", "Einträge")} · Spaltenüberschrift anklicken zum Sortieren</div>` : "";
  return `${metaLine}<div class="lssfo-table-wrap ${className}"><table class="lssfo-table"><thead><tr>${tableHead(key, columns)}</tr></thead><tbody>${body}</tbody></table></div>${more}`;
}

const rerenderTable = (key) => (key === MANAGER_TABLE ? renderManager() : renderContent());

function changeSort(key, column) {
  const current = state.sorts[key];
  state.sorts[key] = { column, direction: current?.column === column && current.direction === "asc" ? "desc" : "asc" };
  rerenderTable(key);
}

// CSV der aktuellen Ansicht: dieselben Spalten und Zeilen wie angezeigt (Suche, Filter,
// Sortierung), aber alle Einträge statt nur der gezeichneten.
function exportCsv() {
  const table = currentView().table?.();
  if (!table?.rows.length) {
    kit.toast("In dieser Ansicht gibt es nichts zu exportieren.");
    return;
  }
  const columns = table.columns.filter((column) => column.csv !== false);
  const rows = sortRows(table.key, visibleColumns(table.columns), table.rows).map((row) => columns.map((column) => (column.csv ? column.csv(row) : column.value(row))));
  const csv = Core.toCsv(columns.map((column) => column.label), rows);
  const url = URL.createObjectURL(new Blob(["﻿", csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `lss-${state.tab}-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

kit.on({
  click: {
    "table-sort": (element) => changeSort(element.dataset.table, Number(element.dataset.column)),
    "table-more": (element) => {
      state.limits[element.dataset.table] = (state.limits[element.dataset.table] || PAGE_SIZE) + PAGE_SIZE;
      rerenderTable(element.dataset.table);
    },
    "table-all": (element) => {
      state.limits[element.dataset.table] = Infinity;
      rerenderTable(element.dataset.table);
    },
  },
});
