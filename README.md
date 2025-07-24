# 📊 ChatGPT-Powered Business Report Assistant

Automatically generate executive-style summaries and visualizations from business data in Google Sheets — powered by ChatGPT and Google Apps Script.

---

## ✨ Features

- 🧠 Converts tabular sales/operations data into natural-language reports
- 📊 Auto-creates bar and pie charts by Product and Region
- 🧾 Clean summary pasted directly into a "Report" tab
- 📥 One-click setup inside Google Sheets — no local software needed

---

## 📂 Folder Structure

ChatGPT_Report_Assistant/
├── scripts/
│ └── google_sheets_script.js # Google Apps Script code
├── assets/
│ ├── sample_data.jpg # Screenshot of Data2 sheet
│ ├── report_summary.jpg # Screenshot of Report2 summary
│ └── report_charts.jpg # Screenshot of generated charts
└── README.md # This file


---

## ⚙️ How to Set Up

### 1. Create a Google Sheet

- Rename first sheet as **`Data2`**
- Add columns: `Date`, `Region`, `Product`, `Revenue`, `Notes`
- Fill it with your weekly data

### 2. Add the Script

- Go to **Extensions → Apps Script**
- Replace default code with the contents of `scripts/google_sheets_script.js`
- Replace `OPENAI_API_KEY` with your own [OpenAI API key](https://platform.openai.com/account/api-keys)
- Save the script

### 3. Run the Report

- In the Apps Script editor, click **Run > generateBusinessReport**
- A new sheet called `Report2` will be created with:
  - 🧠 ChatGPT-generated summary
  - 📊 Automatically inserted revenue charts

---

## 🔁 Optional Add-ons

- 🕒 **Auto-schedule**: Trigger weekly summaries via `Triggers → Add Trigger`
- ✉️ **Email summary PDF** to a distribution list
- 💾 **Export charts** to Drive or PDF (add-on code available)

---

## 🧪 Sample Output

**Data Sample (Data2):**

| Date       | Region | Product  | Revenue | Notes                  |
|------------|--------|----------|---------|-------------------------|
| 2025-07-01 | West   | WidgetA  | 4200    | New launch              |
| 2025-07-01 | East   | WidgetB  | 3900    | Promo campaign          |
| 2025-07-02 | North  | WidgetA  | 5100    | Client upsell           |
| 2025-07-03 | South  | WidgetC  | 3300    | Supply issue resolved   |

**Generated Summary (Report2):**

> "This week's business summary shows strong performance in the West and North regions, with WidgetA leading revenue generation. WidgetB saw success in the East due to a promotion, while WidgetC recovered in the South following resolution of supply issues..."

**Generated Charts:**

- 📊 Revenue by Product (Bar Chart)
- 🥧 Revenue by Region (Pie Chart)

---

## 🛡 Requirements

- A free Google account
- OpenAI API Key (Free tier available)
- Google Sheets + Apps Script (browser-based)

---

## 👨‍💻 Author

**Arvind Thyagarajan**  
Bachelor of Science in Managerial Economics, UC Davis  
🔗 [github.com/arvindthy](https://github.com/arvindthy) | 📧 arvindthy@gmail.com

---

## 📜 License

MIT — use, modify, and share freely.
