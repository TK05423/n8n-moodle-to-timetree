# Moodle-to-Calendar Automation Hub (via n8n)

![n8n](https://img.shields.io/badge/Automation-n8n-FF6C37?style=flat-square&logo=n8n)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🚀 專案簡介
本專案為政大學生開發的自動化解決方案，旨在解決 Moodle 系統作業截止日期通知不直觀的問題。透過 **n8n** 整合 **Google Calendar** 與 **TimeTree**，將分散的課程資訊轉化為精準的行動提醒。

## 🛠 技術棧
- **核心工具**：n8n (Workflow Automation)
- **開發語言**：JavaScript (Node.js) — 用於處理複雜的 ETL 數據清洗。
- **整合平台**：
  - Moodle Calendar (ICS Feed)
  - Google Calendar API
  - TimeTree App (Via Calendar Sync)

---

## 🔄 系統架構與自動化邏輯 (System Architecture)

本專案建立了一個端到端的自動化流程，實現從學校系統到個人裝置的無縫同步：



### Step 1：資料擷取與 ETL 轉化
- **定期觸發**：每 4 小時透過 Cron Node 抓取 **NCCU Moodle** 的 `ics` 檔案。
- **數據處理**：透過 [JavaScript 腳本](./scripts/moodle-parser.js) 進行以下轉換：
    - **Regex 提取**：從混亂的標題中精準分離課程名稱與作業項目。
    - **時區校正**：將 UTC 時間格式化為台北標準時間 (+08:00)。
    - **ID 規範化**：自定義 Google API 規格的唯一識別碼 (UID)，防止事件重複寫入。

### Step 2：雲端中心同步 (Centralized Hub)
- 將處理後的資料寫入 **Google Calendar**。此處作為「主要資料源」，確保所有排程變更即時儲存於雲端系統。

### Step 3：多端終端同步 (Endpoint Sync)
- **手機原生日曆**：透過 Google 帳號與行動裝置 (iOS/Android) 系統層級連結，自動接收作業提醒。
- **TimeTree 整合**：利用 TimeTree 內建的「外部日曆匯入」功能掛載 Google 日曆，將課程資訊同步至手機中的 TimeTree App，方便與社群、朋友共享。

---

## 💡 技術亮點 (Technical Highlights)
- **資安意識**：工作流導出檔已進行脫敏處理，保護個人隱私資訊。
- **資料一致性**：自定義 ID 邏輯確保每次同步為「冪等操作 (Idempotent)」，避免產生重複事件。
- **異地處理能力**：加入錯誤觸發節點，確保在 API 或伺服器異常時能及時獲取通知。

## 📂 目錄結構
- `/workflows`: 存放脫敏後的 n8n 工作流 JSON 檔。
- `/scripts`: 存放核心資料處理邏輯 `moodle-parser.js`。
- `/assets`: 存放專案相關截圖與架構圖（如 n8n 流程圖）。
- `README.md`: 專案說明文件。

------------------------------------------------------------------

# Moodle-to-Calendar Automation Hub (via n8n)

![n8n](https://img.shields.io/badge/Automation-n8n-FF6C37?style=flat-square&logo=n8n)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🚀 Project Overview
This project is an automated solution developed for NCCU students to address the lack of intuitive assignment notifications in the Moodle system. By utilizing **n8n** to integrate **Google Calendar** and **TimeTree**, it transforms fragmented course data into precise, cross-platform mobile reminders.

## 🛠 Tech Stack
- **Core Engine**: n8n (Workflow Automation)
- **Language**: JavaScript (Node.js) — Used for complex ETL data cleaning.
- **Platforms**:
  - Moodle Calendar (ICS Feed)
  - Google Calendar API
  - TimeTree App (via Calendar Sync)

---

## 🔄 System Architecture & Data Flow

This project establishes an end-to-end automation pipeline to ensure seamless synchronization from university systems to personal devices:



### Step 1: Data Acquisition & ETL Transformation
- **Scheduled Trigger**: Fetches the **NCCU Moodle** `ics` file every 4 hours via Cron Node.
- **Data Processing**: A [custom JavaScript script](./scripts/moodle-parser.js) performs the following:
    - **Regex Extraction**: Precisely separates course names from assignment titles.
    - **Timezone Correction**: Converts UTC timestamps to Taipei Standard Time (+08:00).
    - **UID Normalization**: Generates unique identifiers compatible with Google API to prevent duplicate events.

### Step 2: Cloud Hub Synchronization
- Processes data into **Google Calendar**, which serves as the "Master Source" to ensure all schedule changes are centrally stored in the cloud.

### Step 3: Multi-Endpoint Sync
- **Native Mobile Calendar**: Links via Google account to iOS/Android for system-level notifications.
- **TimeTree Integration**: Utilizes TimeTree's "External Calendar Import" to sync the Google Calendar data, allowing for easy schedule sharing with friends and community.

---

## 💡 Technical Highlights
- **Security Awareness**: The exported workflow JSON is masked to protect personal `userid` and `authtoken`.
- **Data Consistency**: Implements **Idempotent Operations** via custom UID logic, ensuring multiple runs do not create duplicate entries.
- **Robustness**: Includes error-trigger nodes to provide instant notifications in case of API or server failures.
- **Hybrid Approach**: Balances the visual efficiency of low-code tools (n8n) with the power of custom scripts for complex ICS parsing logic.

## 📂 Project Structure
- `/workflows`: Contains the sanitized n8n workflow JSON file.
- `/scripts`: Houses the core data processing logic (`moodle-parser.js`).
- `/assets`: Stores project screenshots and architecture diagrams.
- `README.md`: Project documentation.

**Author**: 許庭愷 (Hsu, Ting-Kai)  
**Education**: 國立政治大學 管理資訊學系 (NCCU MIS)
