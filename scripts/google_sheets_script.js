const OPENAI_API_KEY = "MY_OPENAI_KEY";  // replace with your key

function generateBusinessReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dataSheet = ss.getSheetByName("Data2");
  const reportSheet = ss.getSheetByName("Report2") || ss.insertSheet("Report2");

  const data = dataSheet.getDataRange().getValues();
  let reportPrompt = "Write a weekly business summary from this table, and suggest 1–2 chart types that would help visualize trends:\n\n";
  reportPrompt += "Date | Region | Product | Revenue | Notes\n";

  for (let i = 1; i < data.length; i++) {
    reportPrompt += `${data[i][0]} | ${data[i][1]} | ${data[i][2]} | ${data[i][3]} | ${data[i][4]}\n`;
  }

  // Call ChatGPT
  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", {
    method: "post",
    headers: {
      "Authorization": "Bearer " + OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    payload: JSON.stringify({
      model: "gpt-4o",
      messages: [{ "role": "user", "content": reportPrompt }],
      max_tokens: 500,
      temperature: 0.7
    })
  });

  const result = JSON.parse(response.getContentText());
  const summary = result.choices[0].message.content;

  // Clear and format Report sheet
  reportSheet.clear();
  reportSheet.getRange("A1").setValue("📊 Weekly AI-Powered Summary").setFontWeight("bold").setFontSize(14);
  reportSheet.getRange("A2").setValue(summary).setWrap(true);

  // Auto-fit rows
  reportSheet.autoResizeRows(1, 5);

  // Add charts
  insertCharts(dataSheet, ss);
}

function insertCharts(sourceSheet, ss) {
  const reportSheet = ss.getSheetByName("Report2");

  // === Revenue by Product ===
  const data = sourceSheet.getDataRange().getValues();
  const revenueByProduct = {};

  for (let i = 1; i < data.length; i++) {
    const product = data[i][2];
    const revenue = parseFloat(data[i][3]) || 0;
    if (product) {
      revenueByProduct[product] = (revenueByProduct[product] || 0) + revenue;
    }
  }

  const chartData1 = [["Product", "Revenue"]];
  for (let product in revenueByProduct) {
    chartData1.push([product, revenueByProduct[product]]);
  }

  let tempSheet1 = ss.getSheetByName("ChartData1");
  if (tempSheet1) ss.deleteSheet(tempSheet1); // clear old if exists
  tempSheet1 = ss.insertSheet("ChartData1");
  tempSheet1.getRange(1, 1, chartData1.length, 2).setValues(chartData1);

  const chart1 = tempSheet1.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(tempSheet1.getRange(1, 1, chartData1.length, 2))
    .setPosition(5, 2, 0, 0)
    .setOption("title", "Revenue by Product")
    .build();

  reportSheet.insertChart(chart1);

  // === Revenue by Region ===
  const revenueByRegion = {};
  for (let i = 1; i < data.length; i++) {
    const region = data[i][1];
    const revenue = parseFloat(data[i][3]) || 0;
    if (region) {
      revenueByRegion[region] = (revenueByRegion[region] || 0) + revenue;
    }
  }

  const chartData2 = [["Region", "Revenue"]];
  for (let region in revenueByRegion) {
    chartData2.push([region, revenueByRegion[region]]);
  }

  let tempSheet2 = ss.getSheetByName("ChartData2");
  if (tempSheet2) ss.deleteSheet(tempSheet2);
  tempSheet2 = ss.insertSheet("ChartData2");
  tempSheet2.getRange(1, 1, chartData2.length, 2).setValues(chartData2);

  const chart2 = tempSheet2.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(tempSheet2.getRange(1, 1, chartData2.length, 2))
    .setPosition(20, 2, 0, 0)
    .setOption("title", "Revenue by Region")
    .build();

  reportSheet.insertChart(chart2);
}
