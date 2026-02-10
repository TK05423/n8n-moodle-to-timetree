// 取得原始資料
const icsData = items[0].json.data;
const events = icsData.split('BEGIN:VEVENT');
events.shift();

const results = events.map(event => {
    // 1. 處理標題
    let summary = event.match(/SUMMARY:(.*)/)?.[1] || '無標題';
    const categories = event.match(/CATEGORIES:(.*)/)?.[1] || '';
    let courseName = '';
    if (categories) {
        const parts = categories.split('_');
        courseName = (parts.length >= 3) ? parts[2] : parts[0];
    }
    const finalSummary = courseName ? `${courseName} ${summary.trim()}` : summary.trim();

    // 2. 處理 Google ID (關鍵修正！)
    // A. 抓取原始 UID
    let uid = event.match(/UID:(.*)/)?.[1] || '';
    uid = uid.trim();
    // B. 清洗：只保留小寫 a-v 和 0-9
    let cleanUid = uid.toLowerCase().replace(/[^a-v0-9]/g, '');
    // C. 加前綴：確保由字母開頭，且產生一個全新的 ID 以避開舊資料衝突
    const googleId = `moodle${cleanUid}`; 

    // 3. 處理時間 (關鍵修正！)
    // 我們將時間強制轉換為台北時間，並加上 +08:00 的標準尾綴
    const startRaw = event.match(/DTSTART:(\d+T\d+Z)/)?.[1] || '';
    let formattedDate = '';
    
    if (startRaw) {
        // 先轉成標準 UTC 格式
        const isoString = startRaw.replace(
            /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,
            '$1-$2-$3T$4:$5:$6Z'
        );
        const dateObj = new Date(isoString);
        
        // 轉成: 2026-01-01 00:00:00 (台北時間)
        const localString = dateObj.toLocaleString('sv-SE', { timeZone: 'Asia/Taipei' });
        
        // 組合出 Google 最愛的格式: 2026-01-01T00:00:00+08:00
        // 把中間的空白換成 T，後面加上 +08:00
        formattedDate = localString.replace(' ', 'T') + '+08:00';
    }

    return {
        summary: finalSummary,
        start: formattedDate,   // 現在是: 2026-01-01T00:00:00+08:00
        googleId: googleId      // 現在是: moodle45284...
    };
});

return results;