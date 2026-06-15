// إعدادات التطبيق الأساسية
const APP_CONFIG = {
    appName: "منصة الخدمات",
    adminPhones: ["0500000000"],  // أرقام المسؤولين (يمكن إضافة أكثر)
    primaryColor: "#2196f3",
    secondaryColor: "#0b5e9e"
};
// تطبيق اللون المحفوظ إن وجد
const savedColor = localStorage.getItem("appPrimaryColor");
if (savedColor) {
    document.documentElement.style.setProperty('--primary', savedColor);
} else {
    document.documentElement.style.setProperty('--primary', APP_CONFIG.primaryColor);
}