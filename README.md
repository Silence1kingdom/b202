# b202 — Team Portfolio

برتفوليو لفريق **b202** المتخصص في بناء المواقع والمنتجات الرقمية.
مبني بـ **Next.js (App Router)** + **Tailwind CSS**، بيانات التواصل محفوظة في **Supabase**، ومستعد للرفع على **Vercel**.

## المميزات
- ⚡ تصميم داكن عصري مع حركات وحُلقات نيون
- 📱 متجاوب بالكامل (RTL عربي)
- 📩 فورم تواصل محفوظ في Supabase
- 🚀 جاهز للـ deploy على Vercel بضغطة زر

## التشغيل محلياً
```bash
npm install
cp .env.example .env.local   # املأ بيانات Supabase
npm run dev
```

## إعداد Supabase
1. أنشئ مشروعاً على [supabase.com](https://supabase.com).
2. من `SQL Editor` نفّذ محتوى ملف `supabase/schema.sql` (ينشئ جدول `leads` وسياسات RLS).
3. من `Project Settings > API` انسخ:
   - `Project URL` ← `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` ← `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## النشر على Vercel
1. ارفع المشروع على GitHub.
2. من [vercel.com](https://vercel.com) اربط الريبو واضغط Deploy.
3. في إعدادات المشروع أضف متغيرات البيئة نفسها (.env).
4. Done 🎉 — الرابط هيكون جاهز.

## التقنيات
Next.js 14 · TypeScript · Tailwind CSS · @supabase/supabase-js
