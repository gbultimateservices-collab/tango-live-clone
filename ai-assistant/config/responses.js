/**
 * JEEVA AI - Response Templates
 * AI ki personality - friendly, respectful, Hinglish mein baat kare
 */

const RESPONSES = {
  // ===== GREETINGS =====
  greetings: {
    morning: [
      "Good morning boss! ☀️ Aaj ka din shandar hone wala hai. Batao kya karna hai?",
      "Suprabhat! 🌅 Main JEEVA, aapki seva mein hazir. Kya command hai?",
      "Good morning! Chai pi li? ☕ Ab batao kya kaam hai aaj?"
    ],
    afternoon: [
      "Good afternoon boss! 🌤️ Lunch ho gaya? Batao kya help chahiye.",
      "Namaste! Dopahar ho gayi. Koi kaam hai toh batao, main hun na!",
      "Hello boss! Afternoon chal rahi hai. Kya kar dun aapke liye?"
    ],
    evening: [
      "Good evening boss! 🌆 Din kaisa raha? Ab batao kya karna hai.",
      "Shaam ho gayi! 🌇 Relax karo, main sab sambhal lunga. Kya chahiye?",
      "Good evening! Thak gaye honge. Batao kya help chahiye?"
    ],
    night: [
      "Good night boss! 🌙 Sone se pehle koi kaam hai?",
      "Raat ho gayi! 🌜 Alarm lagana hai ya kuch aur?",
      "Good night! Kal subah uthana hai toh alarm laga dun?"
    ],
    general: [
      "Hello boss! 👋 Main JEEVA, aapka personal AI assistant. Batao kya karna hai!",
      "Namaste! 🙏 JEEVA hazir hai. Aapki kya seva karun?",
      "Hey! Main sun raha hun. Bolo kya chahiye?",
      "Haan boss, batao! Main ready hun. 💪"
    ]
  },

  // ===== DEVICE CONTROL =====
  device: {
    volume_up: "Volume badha diya! 🔊 Ab sunai de raha hai?",
    volume_down: "Volume kam kar diya! 🔉 Theek hai ab?",
    volume_mute: "Mute kar diya! 🔇 Bilkul silent.",
    brightness_up: "Brightness badha di! ☀️ Ab dikh raha hai?",
    brightness_down: "Brightness kam kar di! 🌙 Aankhon ko aaram milega.",
    wifi_on: "WiFi on kar diya! 📶 Internet connect ho raha hai...",
    wifi_off: "WiFi off kar diya! 📴 Internet band.",
    bluetooth_on: "Bluetooth on kar diya! 🔵 Device connect karna hai?",
    bluetooth_off: "Bluetooth off kar diya! Band ho gaya.",
    flashlight_on: "Torch on kar diya! 🔦 Roshni aa gayi.",
    flashlight_off: "Torch off kar diya! Roshni band.",
    screenshot: "Screenshot le liya! 📸 Gallery mein save hai.",
    lock_device: "Phone lock kar diya! 🔒 Safe hai.",
    unlock_device: "Phone unlock kar diya! 🔓",
    battery_status: "Battery {level}% hai. {status}",
    tv_on: "TV on kar diya! 📺 Kya dekhna hai?",
    tv_off: "TV off kar diya! 📺",
    tv_channel: "Channel {channel} laga diya! 📺",
    laptop_lock: "Laptop lock kar diya! 💻🔒",
    laptop_shutdown: "Laptop shutdown ho raha hai! 💻",
    laptop_sleep: "Laptop sleep mode mein! 💻😴",
    not_found: "Ye device nahi mila. Pehle register karo.",
    command_sent: "Command bhej diya {device} ko! ✅"
  },

  // ===== APP CONTROL =====
  app: {
    opening: "{app} khol raha hun! 📱",
    closing: "{app} band kar raha hun!",
    not_found: "Ye app nahi mila. Naam sahi se batao.",
    whatsapp_sent: "WhatsApp message bhej diya {contact} ko! ✅",
    call_making: "{contact} ko call laga raha hun! 📞",
    sms_sent: "SMS bhej diya {contact} ko! 💬",
    camera_opened: "Camera khol diya! 📷 {mode} mode mein.",
    music_playing: "Gaana baja raha hun! 🎵 {song}",
    music_stopped: "Gaana band kar diya! 🎵",
    video_playing: "Video chala raha hun! 🎬",
    maps_opened: "Maps khol diya! 🗺️ {destination} ka rasta dikha raha hun."
  },

  // ===== TASK MANAGEMENT =====
  task: {
    reminder_set: "Reminder set kar diya! ⏰ '{text}' - {time} ko yaad dilaunga.",
    alarm_set: "Alarm laga diya! ⏰ {time} baje bajega.",
    timer_set: "Timer laga diya! ⏱️ {duration} ka countdown shuru.",
    todo_added: "Kaam add kar diya list mein! ✅ '{text}'",
    todo_shown: "Ye rahi aapki todo list:",
    todo_completed: "Shabash! 🎉 Kaam complete mark kar diya.",
    todo_empty: "Koi pending kaam nahi hai! 🎉 Sab ho gaya.",
    schedule_set: "Schedule kar diya! 📅 '{text}' - {date} {time}",
    reminder_fired: "⏰ YAAD DILANA THA: {text}"
  },

  // ===== STORAGE =====
  storage: {
    note_saved: "Note save kar diya! 📝 '{title}'",
    notes_shown: "Ye rahi aapki notes:",
    note_deleted: "Note delete kar diya! 🗑️",
    note_not_found: "Ye note nahi mila.",
    contact_saved: "Contact save kar diya! 👤 {name}",
    contact_found: "Ye raha contact: {name} - {phone}",
    contact_not_found: "Ye contact nahi mila. Naam sahi se batao.",
    files_listed: "Ye rahi files:",
    storage_status: "Storage: {used} used / {total} total. {free} free hai.",
    file_saved: "File save kar di! 💾",
    file_deleted: "File delete kar di! 🗑️"
  },

  // ===== AUTOMATION =====
  automation: {
    rule_created: "Automation rule bana diya! 🤖 Jab {trigger} toh {action}.",
    rules_shown: "Ye rahi automation rules:",
    rule_deleted: "Rule delete kar diya!",
    rule_triggered: "🤖 Auto-action: {action} (trigger: {trigger})",
    no_rules: "Koi automation rule nahi hai abhi."
  },

  // ===== CONVERSATION =====
  conversation: {
    time: "Abhi {time} baj rahe hain. ⏰",
    date: "Aaj {date} hai. 📅 {day}.",
    weather: "Mausam: {description}. Temperature: {temp}°C. 🌤️",
    jokes: [
      "Ek aadmi ne dusre se pucha: 'Tumhara phone itna slow kyun hai?' Dusra bola: 'Kyunki usme JEEVA nahi hai!' 😂",
      "Teacher: 'AI kya hai?' Student: 'JEEVA sir, jo sab kuch kar sakta hai!' 😄",
      "Wife: 'Tum meri baat nahi sunte!' Husband: 'JEEVA se seekho, wo har baat manta hai!' 🤣",
      "Doctor: 'Aapko rest chahiye.' Patient: 'JEEVA hai na, wo sab kar lega!' 😂",
      "Ek phone dusre se: 'Tere mein JEEVA hai?' Dusra: 'Nahi.' Pehla: 'Toh tu phone nahi, dabba hai!' 😄"
    ],
    unknown: [
      "Ye samajh nahi aaya boss. Thoda aur detail mein batao? 🤔",
      "Hmm, ye command nahi samjha. Kya matlab hai? Dobara batao.",
      "Sorry boss, ye nahi samjha. 'help' bolo toh saari commands dikha dun.",
      "Ye wala nahi aata mujhe abhi. Kuch aur try karo ya 'help' bolo."
    ],
    thinking: "Soch raha hun... 🤔",
    error: "Oops! Kuch gadbad ho gayi. Dobara try karo. 😅",
    welcome: "🤖 Namaste! Main JEEVA - aapka personal AI assistant!\nMain aapka phone, TV, laptop sab control kar sakta hun.\nAap jo bolo, main karunga. Bas command do!\n\n'help' bolo toh saari commands dikha dun. 💪"
  },

  // ===== HELP =====
  help: {
    main: `
🤖 JEEVA AI Assistant - Help Menu
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 DEVICE CONTROL:
  • "volume badha/kam karo"
  • "brightness badha/kam karo"  
  • "wifi on/off karo"
  • "bluetooth on/off karo"
  • "torch on/off karo"
  • "screenshot le"
  • "phone lock/unlock karo"
  • "battery kitni hai"
  • "tv on/off karo"
  • "laptop lock/shutdown karo"

📲 APP CONTROL:
  • "whatsapp kholo"
  • "camera kholo"
  • "whatsapp pe [naam] ko message bhejo"
  • "[naam] ko call karo"
  • "gaana bajao"
  • "youtube pe [video] chala"
  • "maps pe [jagah] dikha"

📋 TASKS:
  • "reminder set karo [kaam] [time]"
  • "alarm laga [time]"
  • "timer laga [minutes]"
  • "todo add karo [kaam]"
  • "todo dikha"

📝 STORAGE:
  • "note likh [title] [content]"
  • "notes dikha"
  • "contact save [naam] [number]"
  • "contact dhundh [naam]"
  • "storage kitna hai"

🤖 AUTOMATION:
  • "rule bana: jab [trigger] toh [action]"
  • "rules dikha"

💬 GENERAL:
  • "time kya hai"
  • "date kya hai"
  • "joke suna"
  • "help"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hindi, English ya Hinglish - jo bhi bolo, samajh jaunga! 🇮🇳
    `
  },

  // ===== SYSTEM =====
  system: {
    startup: "🤖 JEEVA AI Assistant shuru ho gaya! Ready to serve.",
    shutdown: "JEEVA band ho raha hai. Alvida boss! 👋",
    device_connected: "📱 Device connected: {device}",
    device_disconnected: "📱 Device disconnected: {device}",
    owner_verified: "✅ Owner verified. Welcome back boss!",
    unauthorized: "⛔ Aap authorized nahi ho. Sirf owner use kar sakta hai.",
    pin_required: "🔐 PIN daalo pehle.",
    setup_complete: "✅ Setup complete! JEEVA ready hai aapki seva mein."
  }
};

module.exports = RESPONSES;
