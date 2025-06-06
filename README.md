# 📊 داشبورد مدیریت محتوا

یک سیستم مدیریت محتوا مدرن و ریسپانسیو که با Next.js 15، React 19، TypeScript و Tailwind CSS ساخته شده است. این پلتفرم برای مدیریت محتوا و نمایش آمار در محیطی زیبا و کاربرپسند طراحی شده است.

## 🌐 مشاهده پروژه

🚀 **(https://artan-company-task.vercel.app/)**

پروژه روی Vercel در دسترس است و می‌توانید تمام ویژگی‌ها را آزمایش کنید.

## ✨ ویژگی‌های کلیدی

### 🎯 صفحه اصلی (مدیریت محتوا)

- **افزودن محتوا**: ایجاد محتوای جدید با فرم ولیدیشن شده
- **ویرایش محتوا**: امکان ویرایش محتوای موجود
- **حذف محتوا**: حذف ایمن با تأیید کاربر
- **جستجو**: جستجوی سریع در محتواها
- **فیلتر**: فیلتر بر اساس وضعیت (منتشر شده/پیش‌نویس)

### 📈 داشبورد آماری

- **آمار کلی**: نمایش تعداد کل پست‌ها، فایل‌ها و کاربران
- **نمودار خطی**: نمایش روند افزایش پست‌ها در طول زمان
- **نمودار میله‌ای**: آمار آپلود فایل‌ها در روزهای مختلف
- **تاریخ شمسی**: نمایش تاریخ جاری به شمسی
- **به‌روزرسانی آنی**: امکان رفرش اطلاعات

### 🎨 طراحی و رابط کاربری

- **ریسپانسیو**: سازگار با تمام اندازه‌های صفحه
- **دارک تم**: طراحی مدرن با رنگ‌بندی بنفش
- **نوتیفیکیشن**: نمایش پیام‌های موفقیت و خطا
- **انیمیشن**: انیمیشن‌های نرم و چشم‌نواز
- **آیکون‌ها**: استفاده از آیکون‌های Lucide React

## 🛠️ تکنولوژی‌های استفاده شده

### Frontend

- **Next.js 15** - React Framework
- **React 19** - کتابخانه رابط کاربری
- **TypeScript** - JavaScript with Types
- **Tailwind CSS 4** - CSS Framework

### کتابخانه‌های کمکی

- **Lucide React** - آیکون‌ها
- **Recharts** - نمودارها
- **Formik + Yup** - مدیریت فرم‌ها و ولیدیشن
- **Moment.js + Moment Jalaali** - مدیریت تاریخ شمسی
- **Date-fns** - کار با تاریخ

## 🚀 نحوه اجرا

### پیش‌نیازها

- Node.js (نسخه 18 یا بالاتر)
- pnpm (توصیه می‌شود) یا npm

### مراحل نصب و اجرا

1. **کلون کردن پروژه**

```bash
git clone <repository-url>
cd artan-company-task
```

2. **نصب dependencies**

```bash
# با pnpm (توصیه می‌شود)
pnpm install

# یا با npm
npm install
```

3. **اجرای سرور توسعه**

```bash
# با pnpm
pnpm dev

# یا با npm
npm run dev
```

4. **مشاهده پروژه**
   مرورگر خود را باز کرده و به آدرس زیر بروید:

```
http://localhost:3000
```

### 📜 اسکریپت‌های موجود

```bash
# اجرای سرور توسعه
pnpm dev

# بیلد پروژه برای پروداکشن
pnpm build

# اجرای نسخه پروداکشن
pnpm start

# بررسی کیفیت کد
pnpm lint
```

## 📁 ساختار پروژه

```
src/
├── app/
│   ├── components/          # کامپوننت‌های قابل استفاده مجدد
│   │   ├── ChartComponents.tsx
│   │   ├── ContentCard.tsx
│   │   ├── ContentModal.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── StatsCards.tsx
│   ├── context/             # Context Providers
│   │   ├── ContentContext.tsx
│   │   └── NotificationContext.tsx
│   ├── dashboard/           # صفحه داشبورد
│   │   └── page.tsx
│   ├── types/               # تعریف انواع TypeScript
│   │   ├── content.ts
│   │   └── dashboard.ts
│   ├── utils/               # توابع کمکی
│   │   ├── mockApi.ts
│   │   └── persianCalendar.ts
│   ├── layout.tsx           # لایوت اصلی
│   ├── page.tsx             # صفحه اصلی
│   └── globals.css          # استایل‌های سراسری
public/                      # فایل‌های استاتیک
```

### مدیریت محتوا

1. در صفحه اصلی، روی دکمه "افزودن محتوا" کلیک کنید
2. فرم را پر کرده و محتوا را ذخیره کنید
3. برای ویرایش، روی آیکون مداد کلیک کنید
4. برای حذف، روی آیکون سطل زباله کلیک کنید
5. از نوار جستجو برای یافتن محتوا استفاده کنید

### مشاهده آمار

1. روی منوی "داشبورد" در سایدبار کلیک کنید
2. آمار کلی در بالای صفحه نمایش داده می‌شود
3. نمودارها روند تغییرات را نشان می‌دهند
4. با دکمه رفرش، اطلاعات به‌روزرسانی می‌شود

## 🌐 پشتیبانی از زبان فارسی

- تمام متون به زبان فارسی
- تاریخ شمسی
- راست‌چین (RTL) در بخش‌های مورد نیاز
- فونت‌های مناسب برای متون فارسی
