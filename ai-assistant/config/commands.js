/**
 * JEEVA AI - Command Definitions
 * Saare supported commands ka mapping
 * Hindi + English + Hinglish support
 */

const COMMAND_CATEGORIES = {
  DEVICE_CONTROL: 'device_control',
  APP_CONTROL: 'app_control',
  TASK_MANAGEMENT: 'task_management',
  STORAGE: 'storage',
  AUTOMATION: 'automation',
  SYSTEM: 'system',
  CONVERSATION: 'conversation'
};

// Intent detection keywords - Hindi/English/Hinglish
const INTENT_KEYWORDS = {
  // ===== DEVICE CONTROL =====
  volume_up: {
    keywords: ['volume up', 'volume badha', 'awaaz badha', 'awaz badha', 'loud karo', 'volume increase', 'zyada volume'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'volume_up',
    params: ['level']
  },
  volume_down: {
    keywords: ['volume down', 'volume kam', 'awaaz kam', 'awaz kam', 'quiet karo', 'volume decrease', 'dheere karo'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'volume_down',
    params: ['level']
  },
  volume_mute: {
    keywords: ['mute karo', 'chup karo', 'silent karo', 'awaaz band', 'volume mute', 'sound off'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'volume_mute',
    params: []
  },
  brightness_up: {
    keywords: ['brightness badha', 'roshni badha', 'bright karo', 'screen bright', 'brightness up', 'zyada roshni'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'brightness_up',
    params: ['level']
  },
  brightness_down: {
    keywords: ['brightness kam', 'roshni kam', 'dim karo', 'screen dim', 'brightness down', 'kam roshni'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'brightness_down',
    params: ['level']
  },
  wifi_on: {
    keywords: ['wifi on', 'wifi chalu', 'wifi start', 'internet on', 'wifi connect', 'net chalu'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'wifi_on',
    params: []
  },
  wifi_off: {
    keywords: ['wifi off', 'wifi band', 'wifi stop', 'internet off', 'wifi disconnect', 'net band'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'wifi_off',
    params: []
  },
  bluetooth_on: {
    keywords: ['bluetooth on', 'bluetooth chalu', 'bt on', 'bluetooth start'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'bluetooth_on',
    params: []
  },
  bluetooth_off: {
    keywords: ['bluetooth off', 'bluetooth band', 'bt off', 'bluetooth stop'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'bluetooth_off',
    params: []
  },
  flashlight_on: {
    keywords: ['torch on', 'flashlight on', 'torch chalu', 'light on', 'torch jala'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'flashlight_on',
    params: []
  },
  flashlight_off: {
    keywords: ['torch off', 'flashlight off', 'torch band', 'light off', 'torch bujha'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'flashlight_off',
    params: []
  },
  screenshot: {
    keywords: ['screenshot le', 'screenshot lo', 'screen capture', 'ss le', 'screenshot lena'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'screenshot',
    params: []
  },
  lock_device: {
    keywords: ['phone lock', 'lock karo', 'screen lock', 'device lock', 'phone band karo'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'lock_device',
    params: []
  },
  unlock_device: {
    keywords: ['phone unlock', 'unlock karo', 'screen unlock', 'phone kholo'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'unlock_device',
    params: []
  },
  battery_status: {
    keywords: ['battery kitni', 'battery status', 'charge kitna', 'battery check', 'kitni battery'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'battery_status',
    params: []
  },
  // TV Controls
  tv_on: {
    keywords: ['tv on', 'tv chalu', 'television on', 'tv start'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'tv_on',
    params: ['device_id']
  },
  tv_off: {
    keywords: ['tv off', 'tv band', 'television off', 'tv stop'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'tv_off',
    params: ['device_id']
  },
  tv_channel: {
    keywords: ['channel badal', 'channel change', 'channel laga', 'ye channel'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'tv_channel',
    params: ['channel']
  },
  // Laptop Controls
  laptop_lock: {
    keywords: ['laptop lock', 'computer lock', 'pc lock'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'laptop_lock',
    params: ['device_id']
  },
  laptop_shutdown: {
    keywords: ['laptop band', 'computer shutdown', 'pc off', 'laptop off'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'laptop_shutdown',
    params: ['device_id']
  },
  laptop_sleep: {
    keywords: ['laptop sleep', 'computer sleep', 'pc sleep'],
    category: COMMAND_CATEGORIES.DEVICE_CONTROL,
    action: 'laptop_sleep',
    params: ['device_id']
  },

  // ===== APP CONTROL =====
  open_app: {
    keywords: ['open', 'kholo', 'chalu karo', 'start karo', 'launch'],
    category: COMMAND_CATEGORIES.APP_CONTROL,
    action: 'open_app',
    params: ['app_name']
  },
  close_app: {
    keywords: ['close', 'band karo', 'bnd karo', 'stop karo', 'hatao'],
    category: COMMAND_CATEGORIES.APP_CONTROL,
    action: 'close_app',
    params: ['app_name']
  },
  send_whatsapp: {
    keywords: ['whatsapp bhejo', 'whatsapp message', 'whatsapp pe bhej', 'wa message', 'whatsapp karo'],
    category: COMMAND_CATEGORIES.APP_CONTROL,
    action: 'send_whatsapp',
    params: ['contact', 'message']
  },
  make_call: {
    keywords: ['call karo', 'phone karo', 'call laga', 'ring karo', 'dial karo'],
    category: COMMAND_CATEGORIES.APP_CONTROL,
    action: 'make_call',
    params: ['contact']
  },
  send_sms: {
    keywords: ['sms bhejo', 'message bhejo', 'text karo', 'sms send'],
    category: COMMAND_CATEGORIES.APP_CONTROL,
    action: 'send_sms',
    params: ['contact', 'message']
  },
  open_camera: {
    keywords: ['camera kholo', 'photo lo', 'photo le', 'selfie lo', 'camera on'],
    category: COMMAND_CATEGORIES.APP_CONTROL,
    action: 'open_camera',
    params: ['mode']
  },
  play_music: {
    keywords: ['gaana bajao', 'music play', 'song play', 'gaana chalu', 'music bajao', 'gana suna'],
    category: COMMAND_CATEGORIES.APP_CONTROL,
    action: 'play_music',
    params: ['song_name']
  },
  stop_music: {
    keywords: ['gaana band', 'music stop', 'song stop', 'gaana roko', 'music band'],
    category: COMMAND_CATEGORIES.APP_CONTROL,
    action: 'stop_music',
    params: []
  },
  play_video: {
    keywords: ['video chala', 'video play', 'youtube chala', 'video dikha'],
    category: COMMAND_CATEGORIES.APP_CONTROL,
    action: 'play_video',
    params: ['query']
  },
  open_maps: {
    keywords: ['map kholo', 'navigate karo', 'rasta dikha', 'direction do', 'kaise jaun'],
    category: COMMAND_CATEGORIES.APP_CONTROL,
    action: 'open_maps',
    params: ['destination']
  },

  // ===== TASK MANAGEMENT =====
  set_reminder: {
    keywords: ['yaad dila', 'remind karo', 'reminder set', 'yaad rakh', 'reminder laga'],
    category: COMMAND_CATEGORIES.TASK_MANAGEMENT,
    action: 'set_reminder',
    params: ['text', 'time']
  },
  set_alarm: {
    keywords: ['alarm laga', 'alarm set', 'alarm baja', 'uthana', 'jagana'],
    category: COMMAND_CATEGORIES.TASK_MANAGEMENT,
    action: 'set_alarm',
    params: ['time', 'label']
  },
  set_timer: {
    keywords: ['timer laga', 'timer set', 'countdown', 'timer chalu'],
    category: COMMAND_CATEGORIES.TASK_MANAGEMENT,
    action: 'set_timer',
    params: ['duration']
  },
  add_todo: {
    keywords: ['todo add', 'kaam add', 'list mein daal', 'kaam likh', 'task add', 'kaam jod'],
    category: COMMAND_CATEGORIES.TASK_MANAGEMENT,
    action: 'add_todo',
    params: ['text', 'priority']
  },
  show_todos: {
    keywords: ['todo dikha', 'kaam dikha', 'list dikha', 'kya karna hai', 'tasks dikha', 'pending kaam'],
    category: COMMAND_CATEGORIES.TASK_MANAGEMENT,
    action: 'show_todos',
    params: []
  },
  complete_todo: {
    keywords: ['kaam ho gaya', 'task done', 'complete karo', 'ho gaya', 'khatam'],
    category: COMMAND_CATEGORIES.TASK_MANAGEMENT,
    action: 'complete_todo',
    params: ['task_id']
  },
  set_schedule: {
    keywords: ['schedule karo', 'plan bana', 'calendar mein daal', 'event add'],
    category: COMMAND_CATEGORIES.TASK_MANAGEMENT,
    action: 'set_schedule',
    params: ['text', 'date', 'time']
  },

  // ===== STORAGE =====
  save_note: {
    keywords: ['note likh', 'likh de', 'save karo', 'note bana', 'yaad rakh ye'],
    category: COMMAND_CATEGORIES.STORAGE,
    action: 'save_note',
    params: ['title', 'content']
  },
  read_notes: {
    keywords: ['notes dikha', 'notes padh', 'kya likha tha', 'notes kya hai'],
    category: COMMAND_CATEGORIES.STORAGE,
    action: 'read_notes',
    params: []
  },
  delete_note: {
    keywords: ['note delete', 'note hata', 'note mita'],
    category: COMMAND_CATEGORIES.STORAGE,
    action: 'delete_note',
    params: ['note_id']
  },
  save_contact: {
    keywords: ['contact save', 'number save', 'contact add', 'number rakh'],
    category: COMMAND_CATEGORIES.STORAGE,
    action: 'save_contact',
    params: ['name', 'phone', 'email']
  },
  search_contact: {
    keywords: ['contact dhundh', 'number dhundh', 'contact search', 'kiska number'],
    category: COMMAND_CATEGORIES.STORAGE,
    action: 'search_contact',
    params: ['query']
  },
  list_files: {
    keywords: ['files dikha', 'folder dikha', 'kya hai storage mein', 'files list'],
    category: COMMAND_CATEGORIES.STORAGE,
    action: 'list_files',
    params: ['path']
  },
  storage_status: {
    keywords: ['storage kitna', 'space kitna', 'memory kitni', 'storage check'],
    category: COMMAND_CATEGORIES.STORAGE,
    action: 'storage_status',
    params: []
  },

  // ===== AUTOMATION =====
  create_rule: {
    keywords: ['rule bana', 'automation bana', 'jab', 'automatic karo', 'auto set'],
    category: COMMAND_CATEGORIES.AUTOMATION,
    action: 'create_rule',
    params: ['trigger', 'action']
  },
  list_rules: {
    keywords: ['rules dikha', 'automation dikha', 'kya kya auto hai'],
    category: COMMAND_CATEGORIES.AUTOMATION,
    action: 'list_rules',
    params: []
  },
  delete_rule: {
    keywords: ['rule hata', 'automation hata', 'rule delete', 'auto band'],
    category: COMMAND_CATEGORIES.AUTOMATION,
    action: 'delete_rule',
    params: ['rule_id']
  },

  // ===== SYSTEM =====
  device_status: {
    keywords: ['status dikha', 'device status', 'sab theek hai', 'system check'],
    category: COMMAND_CATEGORIES.SYSTEM,
    action: 'device_status',
    params: []
  },
  help: {
    keywords: ['help', 'madad', 'kya kar sakta', 'kya kya hota', 'commands dikha'],
    category: COMMAND_CATEGORIES.SYSTEM,
    action: 'help',
    params: []
  },

  // ===== CONVERSATION =====
  greeting: {
    keywords: ['hello', 'hi', 'hey', 'namaste', 'kaise ho', 'kya haal', 'good morning', 'good night', 'suno'],
    category: COMMAND_CATEGORIES.CONVERSATION,
    action: 'greeting',
    params: []
  },
  time_query: {
    keywords: ['time kya', 'kitne baje', 'waqt kya', 'samay kya', 'what time'],
    category: COMMAND_CATEGORIES.CONVERSATION,
    action: 'time_query',
    params: []
  },
  date_query: {
    keywords: ['date kya', 'aaj kya date', 'tarikh kya', 'aaj kya din', 'what date'],
    category: COMMAND_CATEGORIES.CONVERSATION,
    action: 'date_query',
    params: []
  },
  weather_query: {
    keywords: ['mausam kaisa', 'weather kya', 'barish hogi', 'garmi hai', 'thand hai'],
    category: COMMAND_CATEGORIES.CONVERSATION,
    action: 'weather_query',
    params: ['location']
  },
  joke: {
    keywords: ['joke suna', 'mazak suna', 'hasa de', 'funny bata', 'chutkula'],
    category: COMMAND_CATEGORIES.CONVERSATION,
    action: 'joke',
    params: []
  }
};

// App name mappings (Hindi/English to package names)
const APP_MAPPINGS = {
  'whatsapp': { package: 'com.whatsapp', name: 'WhatsApp' },
  'instagram': { package: 'com.instagram.android', name: 'Instagram' },
  'facebook': { package: 'com.facebook.katana', name: 'Facebook' },
  'youtube': { package: 'com.google.android.youtube', name: 'YouTube' },
  'camera': { package: 'com.android.camera', name: 'Camera' },
  'gallery': { package: 'com.google.android.apps.photos', name: 'Gallery' },
  'music': { package: 'com.google.android.music', name: 'Music' },
  'maps': { package: 'com.google.android.apps.maps', name: 'Google Maps' },
  'chrome': { package: 'com.android.chrome', name: 'Chrome' },
  'settings': { package: 'com.android.settings', name: 'Settings' },
  'phone': { package: 'com.android.dialer', name: 'Phone' },
  'messages': { package: 'com.google.android.apps.messaging', name: 'Messages' },
  'calculator': { package: 'com.google.android.calculator', name: 'Calculator' },
  'clock': { package: 'com.google.android.deskclock', name: 'Clock' },
  'calendar': { package: 'com.google.android.calendar', name: 'Calendar' },
  'telegram': { package: 'org.telegram.messenger', name: 'Telegram' },
  'spotify': { package: 'com.spotify.music', name: 'Spotify' },
  'netflix': { package: 'com.netflix.mediaclient', name: 'Netflix' },
  'amazon': { package: 'in.amazon.mShop.android.shopping', name: 'Amazon' },
  'flipkart': { package: 'com.flipkart.android', name: 'Flipkart' },
  'paytm': { package: 'net.one97.paytm', name: 'Paytm' },
  'phonepe': { package: 'com.phonepe.app', name: 'PhonePe' },
  'gpay': { package: 'com.google.android.apps.nbu.paisa.user', name: 'Google Pay' },
  'zomato': { package: 'com.application.zomato', name: 'Zomato' },
  'swiggy': { package: 'in.swiggy.android', name: 'Swiggy' },
  'uber': { package: 'com.ubercab', name: 'Uber' },
  'ola': { package: 'com.olacabs.customer', name: 'Ola' },
  'twitter': { package: 'com.twitter.android', name: 'Twitter/X' },
  'snapchat': { package: 'com.snapchat.android', name: 'Snapchat' },
  'tiktok': { package: 'com.zhiliaoapp.musically', name: 'TikTok' },
  'file manager': { package: 'com.google.android.documentsui', name: 'Files' },
  'notes': { package: 'com.google.android.keep', name: 'Google Keep' }
};

module.exports = {
  COMMAND_CATEGORIES,
  INTENT_KEYWORDS,
  APP_MAPPINGS
};
