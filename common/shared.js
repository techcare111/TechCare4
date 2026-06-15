// shared.js
const translations = {
    ar: {
        welcome: "👋 أهلاً بك",
        choose_role: "اختر نوع الحساب المناسب لك",
        customer: "مستهلك",
        customer_desc: "أبحث عن خدمات صيانة وتركيب",
        merchant: "تاجر",
        merchant_desc: "أمتلك محلاً أو أعرض منتجاتي",
        technician: "فني أفراد",
        technician_desc: "أقدم خدمات الصيانة والتركيب",
        coming_soon: "سيتم إضافة هذه الصفحة قريباً",
        full_name: "الاسم الكامل",
        mobile: "رقم الجوال",
        email: "البريد الإلكتروني (اختياري)",
        city: "المدينة",
        neighborhood: "الحي",
        map_location: "الموقع على الخريطة",
        use_current_location: "تحديد موقعي الحالي",
        save: "💾 حفظ",
        continue: "🚀 متابعة",
        enter_otp: "أدخل رمز التحقق",
        verify: "تحقق",
        otp_sent: "تم إرسال الرمز: 123456",
        please_enter_otp: "يرجى إدخال الرمز",
        invalid_otp: "الرمز غير صحيح",
        set_password: "إنشاء كلمة المرور",
        password: "كلمة المرور",
        confirm_password: "تأكيد كلمة المرور",
        password_requirements: "كلمة المرور لا تقل عن 8 أحرف أو أرقام أو رموز",
        login: "تسجيل الدخول",
        forgot_password: "نسيت كلمة المرور؟",
        register_with_email: "التسجيل بواسطة البريد الإلكتروني",
        no_account: "لا تملك حساباً؟",
        create_account: "إنشاء حساب"
    },
    en: {
        welcome: "👋 Welcome",
        choose_role: "Choose your account type",
        customer: "Customer",
        customer_desc: "Looking for maintenance & installation services",
        merchant: "Merchant",
        merchant_desc: "I own a shop or showcase products",
        technician: "Individual Technician",
        technician_desc: "I provide maintenance & installation services",
        coming_soon: "This page will be added soon",
        full_name: "Full Name",
        mobile: "Mobile Number",
        email: "Email (Optional)",
        city: "City",
        neighborhood: "Neighborhood",
        map_location: "Location on Map",
        use_current_location: "Use my current location",
        save: "💾 Save",
        continue: "🚀 Continue",
        enter_otp: "Enter verification code",
        verify: "Verify",
        otp_sent: "Code sent: 123456",
        please_enter_otp: "Please enter the code",
        invalid_otp: "Invalid code",
        set_password: "Set Password",
        password: "Password",
        confirm_password: "Confirm Password",
        password_requirements: "Password must be at least 8 characters, letters/numbers/symbols",
        login: "Login",
        forgot_password: "Forgot password?",
        register_with_email: "Register with email",
        no_account: "Don't have an account?",
        create_account: "Create account"
    },
    ur: {
        welcome: "👋 خوش آمدید",
        choose_role: "اپنے اکاؤنٹ کی قسم منتخب کریں",
        customer: "صارف",
        customer_desc: "مرمت اور تنصیب کی خدمات تلاش کریں",
        merchant: "تاجر",
        merchant_desc: "میرے پاس دکان ہے یا مصنوعات دکھاتا ہوں",
        technician: "انفرادی ٹیکنیشن",
        technician_desc: "میں مرمت اور تنصیب کی خدمات فراہم کرتا ہوں",
        coming_soon: "یہ صفحہ جلد شامل کیا جائے گا",
        full_name: "پورا نام",
        mobile: "فون نمبر",
        email: "ای میل (اختیاری)",
        city: "شہر",
        neighborhood: "محلہ",
        map_location: "نقشہ پر مقام",
        use_current_location: "میری موجودہ لوکیشن استعمال کریں",
        save: "💾 محفوظ کریں",
        continue: "🚀 جاری رکھیں",
        enter_otp: "تصدیقی کوڈ درج کریں",
        verify: "تصدیق کریں",
        otp_sent: "کوڈ بھیجا گیا: 123456",
        please_enter_otp: "براہ کرم کوڈ درج کریں",
        invalid_otp: "غلط کوڈ",
        set_password: "پاس ورڈ مرتب کریں",
        password: "پاس ورڈ",
        confirm_password: "پاس ورڈ کی تصدیق کریں",
        password_requirements: "پاس ورڈ کم از کم 8 حروف، اعداد یا علامات پر مشتمل ہو",
        login: "لاگ ان",
        forgot_password: "پاس ورڈ بھول گئے؟",
        register_with_email: "ای میل کے ساتھ رجسٹر کریں",
        no_account: "اکاؤنٹ نہیں ہے؟",
        create_account: "اکاؤنٹ بنائیں"
    }
};

function t(key) {
    let lang = localStorage.getItem('appLang') || 'ar';
    if (!translations[lang]) lang = 'ar';
    return translations[lang][key] || translations['ar'][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) el.innerText = t(key);
    });
}

// حفظ بيانات المستخدم في localStorage
function saveUserData(type, data) {
    let users = JSON.parse(localStorage.getItem(type + 's')) || [];
    const existing = users.find(u => u.mobile === data.mobile);
    if (existing) {
        Object.assign(existing, data);
    } else {
        users.push(data);
    }
    localStorage.setItem(type + 's', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ ...data, type }));
}

// التحقق من صحة رقم الجوال السعودي
function isValidSaudiMobile(mobile) {
    return /^05\d{8}$/.test(mobile);
}

// عرض رسالة منبثقة
function showToast(message, isError = false) {
    const toast = document.getElementById('toast') || (() => {
        const div = document.createElement('div');
        div.id = 'toast';
        div.style.cssText = `
            position: fixed; bottom: 30px; left: 20px; right: 20px;
            background: ${isError ? '#ef4444' : '#22c55e'}; color: white;
            padding: 12px 20px; border-radius: 60px; text-align: center;
            z-index: 9999; font-size: 14px; transition: 0.3s;
        `;
        document.body.appendChild(div);
        return div;
    })();
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

document.addEventListener('DOMContentLoaded', applyTranslations);