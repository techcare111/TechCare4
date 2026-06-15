// ========== العملاء (Customers) ==========
function saveCustomer(customerData) {
    let customers = getCustomers();
    const existingIndex = customers.findIndex(c => c.mobile === customerData.mobile);
    if (existingIndex !== -1) {
        customers[existingIndex] = { ...customers[existingIndex], ...customerData };
    } else {
        customers.push(customerData);
    }
    localStorage.setItem('customers', JSON.stringify(customers));
    return true;
}

function getCustomers() {
    const data = localStorage.getItem('customers');
    return data ? JSON.parse(data) : [];
}

function getCustomerByMobile(mobile) {
    return getCustomers().find(c => c.mobile === mobile);
}

// ========== التجار (Merchants) ==========
function saveMerchant(merchantData) {
    let merchants = getMerchants();
    const existingIndex = merchants.findIndex(m => m.mobile === merchantData.mobile);
    if (existingIndex !== -1) {
        merchants[existingIndex] = { ...merchants[existingIndex], ...merchantData };
    } else {
        merchants.push(merchantData);
    }
    localStorage.setItem('merchants', JSON.stringify(merchants));
    return true;
}

function getMerchants() {
    const data = localStorage.getItem('merchants');
    return data ? JSON.parse(data) : [];
}

// ========== الفنيين (Technicians) ==========
function saveTechnician(technicianData) {
    let technicians = getTechnicians();
    const existingIndex = technicians.findIndex(t => t.mobile === technicianData.mobile);
    if (existingIndex !== -1) {
        technicians[existingIndex] = { ...technicians[existingIndex], ...technicianData };
    } else {
        technicians.push(technicianData);
    }
    localStorage.setItem('technicians', JSON.stringify(technicians));
    return true;
}

function getTechnicians() {
    const data = localStorage.getItem('technicians');
    return data ? JSON.parse(data) : [];
}

function getTechnicianByMobile(mobile) {
    return getTechnicians().find(t => t.mobile === mobile);
}

// ========== المستخدم الحالي ==========
function saveCurrentUser(userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
}

function getCurrentUser() {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
}

// ========== طلبات الخدمة ==========
function getNextRequestNumber() {
    let lastNumber = localStorage.getItem('lastRequestNumber');
    if (!lastNumber) lastNumber = 0;
    const next = parseInt(lastNumber) + 1;
    localStorage.setItem('lastRequestNumber', next);
    return next;
}

function saveServiceRequest(requestData) {
    let requests = getServiceRequests();
    if (!requestData.requestNumber) requestData.requestNumber = getNextRequestNumber();
    requests.push(requestData);
    localStorage.setItem('serviceRequests', JSON.stringify(requests));
    return true;
}

function getServiceRequests() {
    const data = localStorage.getItem('serviceRequests');
    return data ? JSON.parse(data) : [];
}

function getServiceRequestsByCustomer(mobile) {
    return getServiceRequests().filter(req => req.customerMobile === mobile);
}

// ========== الشكاوى ==========
function saveComplaint(complaintData) {
    let complaints = getComplaints();
    complaintData.id = Date.now();
    complaintData.status = 'pending';
    complaints.push(complaintData);
    localStorage.setItem('complaints', JSON.stringify(complaints));
    return true;
}

function getComplaints() {
    const data = localStorage.getItem('complaints');
    return data ? JSON.parse(data) : [];
}

function getComplaintsByCustomer(mobile) {
    return getComplaints().filter(c => c.customerMobile === mobile);
}

// ========== المحادثات ==========
function saveChat(chatData) {
    let chats = getChats();
    const existing = chats.find(c => c.techId === chatData.techId);
    if (existing) {
        existing.lastMessage = chatData.lastMessage;
        existing.date = new Date().toISOString();
    } else {
        chats.push(chatData);
    }
    localStorage.setItem('chats', JSON.stringify(chats));
}

function getChats() {
    const data = localStorage.getItem('chats');
    return data ? JSON.parse(data) : [];
}

// ========== المفضلة ==========
function saveFavorite(item) {
    let favorites = getFavorites();
    favorites.push(item);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function getFavorites() {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
}

// ========== الإشعارات ==========
function saveNotification(notification) {
    let notifications = getNotifications();
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

function getNotifications() {
    const data = localStorage.getItem('notifications');
    return data ? JSON.parse(data) : [];
}

// ========== حالة الفنيين ==========
function updateTechnicianStatus(mobile, isActive, lat, lng) {
    let technicians = getTechnicians();
    const index = technicians.findIndex(t => t.mobile === mobile);
    if (index !== -1) {
        technicians[index].isActive = isActive;
        if (lat && lng) technicians[index].lastLocation = { lat, lng };
        else if (!isActive) technicians[index].lastLocation = null;
        technicians[index].lastActiveTime = new Date().toISOString();
        localStorage.setItem('technicians', JSON.stringify(technicians));
        let current = getCurrentUser();
        if (current && current.mobile === mobile && current.role === 'technician') {
            current.isActive = isActive;
            if (lat && lng) current.lastLocation = { lat, lng };
            saveCurrentUser(current);
        }
        return true;
    }
    return false;
}

function getActiveTechnicians() {
    return getTechnicians().filter(t => t.isActive === true && t.lastLocation);
}

// ========== تحديث موقع العميل ==========
function updateCustomerLocation(mobile, lat, lng) {
    let customers = getCustomers();
    const index = customers.findIndex(c => c.mobile === mobile);
    if (index !== -1) {
        customers[index].lastLocation = { lat, lng };
        localStorage.setItem('customers', JSON.stringify(customers));
        let current = getCurrentUser();
        if (current && current.mobile === mobile && current.role === 'customer') {
            current.lastLocation = { lat, lng };
            saveCurrentUser(current);
        }
        return true;
    }
    return false;
}

// ========== مسح البيانات ==========
function clearAllData() {
    localStorage.clear();
    console.log("تم مسح جميع البيانات");
}