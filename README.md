# E2E-Testing-Playwright

使用 [Playwright](https://playwright.dev/) 針對網站進行 E2E 測試，驗證會員登入與加入商品至購物車的完整流程。


## 📦 技術棧

- [Playwright](https://playwright.dev/) + TypeScript
- 測試報告：Allure + GitHub Pages
- CI/CD：GitHub Actions 自動執行測試與部署報告

## 🚀 本機安裝與執行方式

```bash
# 安裝依賴套件
npm install

# 安裝瀏覽器環境
npx playwright install

# 執行全部測試並產生 Allure 報告
npx playwright test --reporter=line,allure-playwright

# 本機啟動報告（需先安裝 Allure CLI）
npx allure serve
```

## 🔁 CI/CD 自動化流程 
```
當你 push 至 main 分支時，GitHub Actions 會自動：
1.安裝依賴
2.執行 E2E 測試
3.產出測試報告
4.自動部署至 GitHub Pages（gh-pages 分支)
```

## Test Cases

### 🟦 登入流程測試案例
| No. | case name|case description|purpose|execute|
| -------- | -------- | -------- |--------|--------|
| 1     | 手機驗證碼登入成功並加入商品至購物車     | 透過手機取得驗證碼登入成功     | 驗證主要登入方式是否可以順利完成   |manual|
| 2     | 電子郵件驗證碼登入成功並加入商品至購物車     | 透過電子郵件取得驗證碼登入成功     | 驗證主要登入方式是否可以順利完成   |manual|
| 3     | 驗證碼錯誤登入失敗|輸入錯誤驗證碼 → 顯示錯誤提示|驗證使用者輸錯驗證碼時系統的處理與提示   |manual|
| 4     | 密碼登入成功（切換）|在輸入帳號後進入驗證碼輸入畫面按「密碼登入」→ 輸入正確密碼登入|驗證登入方式切換功能正確可用|automation|
| 5     | Facebook 快速登入流程|點選 FB 快速登入 → 完成 OAuth 流程後登入成功|驗證第三方登入串接成功|manual|
| 6     | 取消 Facebook 快速登入成功|跳轉後取消授權 → 導回原網站並顯示錯誤或無效登入|驗證 OAuth 授權取消時的回應處理|automation|
| 7     | Gamil 快速登入流程|點選 Google 快速登入 → 完成 OAuth 流程後登入成功|驗證第三方登入串接成功|manual|


### 🟩 商品加入購物車測試案例(已登入狀態)
| No. | case name|case description|purpose|execute|
| -------- | -------- | -------- |--------|--------|
| 8     | 加入購物車|從會員中心回到首頁將第一個商品加入購物車|驗證正常加入購物車流程，包含成功提示及購物車圖示數字更新|automation|
| 9| 加入購物車失敗|未選擇規格時加入購物車失敗|驗證提示訊息|automation|
| 10     | 驗證加入上限數量的商品至購物車|調整數量超過上限，並確認畫面數字有沒有跳回庫存數量|商品數量上限會根據每筆商品的 bundle 設定不同|automation|

### [測試報告連結](https://dannyjho.github.io/E2E-Testing-Playwright/)


