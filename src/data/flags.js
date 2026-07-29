// فایل: utils/flagHelper.js
const countryToFlagMap = {
  ایران: "ir.png",
  آلمان: "de.png",
  انگلستان: "gb.png",
  آمریکا: "us.png",
  فرانسه: "fr.png",
  کانادا: "ca.png",
};

// آدرس پایه تصاویر استاتیک
const BASE_URL = "/static/flags/";

export function getFlagUrl(countryName) {
  if (!countryName) return null;

  // ۱. تلاش کن نام دقیق کشور رو پیدا کنی
  let fileName = countryToFlagMap[countryName];

  // ۲. اگر پیدا نشد، سعی کن با کد ISO یا نام انگلیسی پیدا کنی (اختیاری)
  if (!fileName) {
    // اینجا می‌تونی منطق پیچیده‌تری اضافه کنی
    // مثلاً تبدیل "ایران" به "IR" و جستجو در لیست دیگر
    fileName = "default.png";
  }

  // ۳. آدرس کامل رو برگردون
  return `${BASE_URL}${fileName}`;
}
