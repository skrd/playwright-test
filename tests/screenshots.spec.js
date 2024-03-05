// @ts-check
import { test } from '@playwright/test';

// テスト対象のURLを定義
const targetUrl = 'https://playwright.dev/';

// ページへの移動と撮影準備用
const setupPage = async (page, testInfo) => {
  await page.goto(targetUrl);
  // ネットワークアクティビティが静かになるまで待つ（load や domcontentloaded の場合、レンダリング完了前にスクショが撮影されるため、非推奨ではあるがnetworkidleを使用）
  await page.waitForLoadState('networkidle');
  // プロジェクト名がデスクトップ版を示している場合にのみビューポートを設定
  if (testInfo.project.name.includes('Desktop')) {
    // fullPage撮影が前提だが、エラー回避のためheightも指定
    await page.setViewportSize({ width: 1920, height: 1080 });
  }
};

// スクショ撮影ファイル名指定のため、TestInfoオブジェクト(https://playwright.dev/docs/api/class-testinfo)を使ってテストを実行。
test('ページのスクリーンショットを撮影', async ({ page }, testInfo) => {
  try {
    await setupPage(page, testInfo);
    // プロジェクト名とブラウザ名を小文字にしてスペースをハイフンに置換
    const formattedProjectName = testInfo.project.name.replace(/\s+/g, '-').toLowerCase();
    // プロジェクト名をファイル名に含める
    const screenshotPath = `test-results/screenshot-${formattedProjectName}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
  } catch (error) {
    console.error('スクリーンショット撮影中にエラーが発生しました', error);
  }
});