# Moodle-to-Calendar 自动化中心 (透過 n8n)

![n8n](https://img.shields.io/badge/Automation-n8n-FF6C37?style=flat-square&logo=n8n)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🚀 專案簡介
本專案為政大學生開發的自動化解決方案，旨在解決 Moodle 系統作業截止日期通知不直觀的問題。透過 **n8n** 整合 **Google Calendar**，並以手機系統行事曆作為橋接，將分散的課程資訊轉化為跨平台的精準行動提醒。

## 🛠 技術棧
- **核心引擎**：n8n (Workflow Automation)
- **開發語言**：JavaScript (Node.js) — 用於處理複雜的 ETL 資料清洗邏輯。
- **整合平台**：
  - Moodle Calendar (ICS Feed)
  - Google Calendar API
  - TimeTree App (透過系統行事曆橋接)

---

## 🔄 系統架構與資料流 (System Architecture)

本專案建立了一個多層次的同步管線，確保資料從學校系統準確傳遞至個人裝置：

![n8n 工作流架構](assets/n8n-flow.png)

### Step 1：資料擷取與 ETL 轉化
- **定期觸發**：每 4 小時透過 Cron Node 抓取 **NCCU Moodle** 的 `ics` 檔案。
- **數據處理**：透過自定義 [JavaScript 腳本](./scripts/moodle-parser.js) 進行以下轉換：
    - **正則表達式 (Regex) 提取**：從原始資料中精準分離課程名稱與作業標題。
    - **時區校正**：將 UTC 時間格式化為台北標準時間 (+08:00)。
    - **唯一 ID 規範化**：生成符合 Google API 規範的 ID，防止重複寫入事件。

### Step 2：雲端同步中心 (Cloud Hub)
- 將處理後的資料寫入 **Google Calendar**。此處作為「主要資料源 (Master Source)」，確保所有變更皆能即時儲存在雲端。

### Step 3：多平台橋接同步 (Multi-Platform Bridge)
- **原生系統同步**：Google Calendar 與 **手機原生行事曆 App** (iOS/Android) 透過系統帳號設定進行同步。
- **TimeTree 整合**：由於 TimeTree 技術限制，透過「讀取手機本地行事曆」的功能，從系統行事曆中抓取 Moodle 事件。藉由手機 OS 的橋接，成功將課表整合進 TimeTree 以便進行社群共享。

---

## 💡 技術亮點
- **資安意識**：導出的工作流 JSON 已進行脫敏處理，保護個人 `userid` 與 `authtoken`。
- **資料一致性**：透過自定義 ID 邏輯實現 **冪等性操作 (Idempotent)**，確保多次運行也不會產生重複事件。
- **穩健性設計**：包含錯誤觸發節點，在 Moodle 伺服器或 API 異常時能及時獲取通知。
- **混合開發模式**：結合低程式碼工具 (n8n) 的開發效率與自定義腳本 (JavaScript) 的靈活性。

## 📂 目錄結構
- `/workflows`: 存放脫敏後的 n8n 工作流 JSON 檔。
- `/scripts`: 存放核心資料處理邏輯 `moodle-parser.js`。
- `/assets`: 存放專案架構圖與 n8n 流程截圖。
- `README.md`: 專案說明文件。

## 📜 免責聲明
本專案僅供個人學習與作品集展示之用，並非國立政治大學 (NCCU) 官方提供之服務。本工具所同步之資訊僅供參考，使用者須自行承擔自動化腳本可能產生的風險（如：系統延遲導致的行程遺漏）。開發者不對因使用本工具而產生的任何資料錯誤或損失負責。此外，使用者須妥善保管個人 Moodle Token 與 API 憑證，以維護個人資安。

------------------------------------------------------------------

# Moodle-to-Calendar Automation Hub (via n8n)

![n8n](https://img.shields.io/badge/Automation-n8n-FF6C37?style=flat-square&logo=n8n)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🚀 Project Overview
This project is an automated solution developed for NCCU students to address the lack of intuitive assignment notifications in the Moodle system. By utilizing **n8n** to integrate **Google Calendar** and bridging through mobile system calendars, it transforms fragmented course data into precise, cross-platform reminders.

## 🛠 Tech Stack
- **Core Engine**: n8n (Workflow Automation)
- **Language**: JavaScript (Node.js) — Used for complex ETL data cleaning.
- **Platforms**:
  - Moodle Calendar (ICS Feed)
  - Google Calendar API
  - TimeTree App (via System Calendar Bridge)

---

## 🔄 System Architecture & Data Flow

This project establishes a multi-layered synchronization pipeline to ensure seamless data delivery from university systems to personal devices:

![n8n Workflow Architecture](assets/n8n-flow.png)

### Step 1: Data Acquisition & ETL Transformation
- **Scheduled Trigger**: Fetches the **NCCU Moodle** `ics` file every 4 hours via Cron Node.
- **Data Processing**: A [custom JavaScript script](./scripts/moodle-parser.js) performs the following:
    - **Regex Extraction**: Precisely separates course names from assignment titles.
    - **Timezone Correction**: Converts UTC timestamps to Taipei Standard Time (+08:00).
    - **UID Normalization**: Generates unique identifiers compatible with Google API to prevent duplicate events.

### Step 2: Cloud Hub Synchronization
- Processes data into **Google Calendar**, which serves as the "Master Source" to ensure all schedule changes are centrally stored in the cloud.

### Step 3: Multi-Platform Synchronization Bridge
- **Native System Sync**: Google Calendar synchronizes with the **mobile device's native calendar app** (iOS/Android) via the system's account settings.
- **TimeTree Integration**: TimeTree pulls data from the **local system calendar**. By bridging through the mobile OS, Moodle events are successfully imported into TimeTree, enabling unified scheduling and social sharing.

---

## 💡 Technical Highlights
- **Security Awareness**: The exported workflow JSON is masked to protect personal `userid` and `authtoken`.
- **Data Consistency**: Implements **Idempotent Operations** via custom UID logic, ensuring multiple runs do not create duplicate entries.
- **Robustness**: Includes error-trigger nodes to provide instant notifications in case of API or server failures.
- **Hybrid Approach**: Balances the visual efficiency of low-code tools (n8n) with the power of custom scripts for complex data parsing.

## 📂 Project Structure
- `/workflows`: Contains the sanitized n8n workflow JSON file.
- `/scripts`: Houses the core data processing logic (`moodle-parser.js`).
- `/assets`: Stores project screenshots and architecture diagrams.
- `README.md`: Project documentation.

## 📜 Disclaimer
This project is developed for personal educational and portfolio purposes only. It is not an official service provided by National Chengchi University (NCCU). The data synchronized via this automation is for reference only; the developer is not liable for any schedule misses or data inaccuracies resulting from system latency or script errors. Users are solely responsible for the security of their own Moodle tokens and API credentials.


