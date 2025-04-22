import React from "react";
import NewsSnippet from "./components/NewsSnippet";
import type { IData_SnippetNews } from "./components/types";

const mockData: IData_SnippetNews = {
  ID: 1,
  TI: "Antivirus leggero: i migliori per il tuo PC",
  AB: "Una panoramica dei migliori antivirus leggeri...",
  URL: "https://example.com/news",
  DOM: "example.com",
  DP: "2024-06-18",
  LANG: "it",
  AUTHOR: "Mario Rossi",
  REACH: 211000,
  KW: [
    { value: "AutoPilot", count: 5000 },
    { value: "Cybersecurity", count: 2400 },
    { value: "Performance", count: 1800 }
  ],
  AU: ["Mario Rossi"],
  CNTR: "Italy",
  CNTR_CODE: "IT",
  SENT: "positive",
  TRAFFIC: [
    { value: "Austria", count: 0.38 },
    { value: "USA", count: 0.12 },
    { value: "Italy", count: 0.08 }
  ],
  FAV: "https://example.com/avatar.jpg",
  HIGHLIGHTS: [
    "Il nuovo antivirus &lt;kw&gt;leggero&lt;/kw&gt; protegge senza rallentare.",
    "Ideale per PC con &lt;kw&gt;prestazioni limitate&lt;/kw&gt;."
  ],
  DUPLICATES: 192
};

function App() {
  return (
    <div style={{ padding: "24px" }}>
      <NewsSnippet data={mockData} />
    </div>
  );
}

export default App;
