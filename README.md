# 📸 Web Photobooth – Capture, Edit, dan Bagikan Momenmu!

![photobooth-preview](/public/images/preview/preview-1.png)
![photobooth-preview](/public/images/preview/preview-2.png)
![photobooth-preview](/public/images/preview/preview-3.png)

Web Photobooth adalah aplikasi berbasis web yang memungkinkan pengguna mengambil foto langsung dari kamera atau galeri, menambahkan dekorasi seperti efek dan bingkai, lalu menyimpan atau membagikannya ke media sosial. Dibuat dengan teknologi web modern dan tampilan yang colorful serta responsif.

---

## 🚀 Fitur Utama

- 📷 **Ambil Foto Langsung** dari kamera (HTML5 Camera)
- 🖼️ **Unggah Foto dari Galeri**
- 🎨 **Tambahkan Filter & Efek** (grayscale, sepia, brightness, dll)
- 💠 **Tambahkan Bingkai Unik** (beberapa pilihan frame)
- 📥 **Download Foto** hasil edit
- 🔗 **Bagikan ke Media Sosial** (WhatsApp, Facebook, atau Copy Link)
- 📱 **Desain Responsif** dan modern dengan **TailwindCSS**

---

## ✨ Tampilan Antarmuka

- Gaya **colorful** dan **clean UI**
- Didukung oleh **TailwindCSS** untuk komponen modern
- Transisi dan efek halus untuk pengalaman pengguna yang menyenangkan
- Cocok digunakan di **mobile dan desktop**

---

## 🛠️ Teknologi yang Digunakan

- Rectjs - TypeScript + Vite
- TailwindCSS
- shadcn-ui
- HTML5 Camera API (`navigator.mediaDevices.getUserMedia`)
- `<canvas>` untuk rendering dan dekorasi
- Share API (jika didukung browser)

---

## 📦 Instalasi & Penggunaan

```bash
# 1. Clone repo ini
git clone https://github.com/Ahmadsani31/webcam-photobooth.git

# 2 Navigate into the project directory
cd web-photobooth

# 3. install dependencies
npm install && run build

# 4. Start the Expo development server
npm run dev

# 5. Buka file index.html di browser
localhost:8080/
