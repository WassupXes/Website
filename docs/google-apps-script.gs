/**
 * Ternakin.ai lead capture → Google Sheets
 *
 * Setup:
 * 1. Create a Google Sheet. Extensions → Apps Script. Paste this file.
 * 2. Project Settings → Script properties → add SECRET = <same value as SHEETS_WEBHOOK_SECRET>.
 * 3. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone.
 * 4. Copy the /exec URL into SHEETS_WEBHOOK_URL on the server.
 *
 * Each form type (newsletter, waitlist, trial, kredit, kontak) gets its own tab.
 */
const COLUMNS = ["ts", "type", "lang", "name", "email", "phone", "org", "province", "herd", "species", "role", "amount", "message", "page"];

function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
  const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
  if (secret && data.secret !== secret) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "unauthorized" })).setMimeType(ContentService.MimeType.JSON);
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const name = String(data.type || "other");
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS);
  sheet.appendRow(COLUMNS.map((c) => data[c] || ""));
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
