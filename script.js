// update
// ======================= Frastanz Koordinatları =======================
const LAT = 47.218; 
const LON = 9.634;

// ======================= Vakitleri Yükle =======================
async function loadTimings() {
  try {
    const url = `https://api.aladhan.com/v1/timings?latitude=${LAT}&longitude=${LON}&method=13`;

    const response = await fetch(url);
    const data = await response.json();
    const t = data.data.timings;

    // Vakit kutularını doldur
    document.getElementById("imsak").innerText = t.Imsak;
    document.getElementById("gunes").innerText = t.Sunrise;
    document.getElementById("ogle").innerText = t.Dhuhr;
    document.getElementById("ikindi").innerText = t.Asr;
    document.getElementById("aksam").innerText = t.Maghrib;
    document.getElementById("yatsi").innerText = t.Isha;

    // Sıradaki vakti hesapla
    updateNextPrayer(t);

  } catch (err) {
    console.error("Vakitler alınamadı:", err);
  }
}

// ======================= Sıradaki Vakit =======================
function updateNextPrayer(timings) {
  const order = [
    { key: "Imsak", label: "İmsak" },
    { key: "Sunrise", label: "Güneş" },
    { key: "Dhuhr", label: "Öğle" },
    { key: "Asr", label: "İkindi" },
    { key: "Maghrib", label: "Akşam" },
    { key: "Isha", label: "Yatsı" }
  ];

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  let next = null;

  for (let p of order) {
    const timeStr = timings[p.key];
    const prayerTime = new Date(`${today} ${timeStr}`);

    if (prayerTime > now) {
      next = { name: p.label, time: prayerTime };
      break;
    }
  }

  if (!next) {
    document.getElementById("next-name").innerText = "Yarın İmsak";
    document.getElementById("next-countdown").innerText = "--:--:--";
    return;
  }

  document.getElementById("next-name").innerText = next.name;

  // Geri sayım
  setInterval(() => {
    const now2 = new Date();
    const diff = next.time - now2;

    if (diff <= 0) {
      document.getElementById("next-countdown").innerText = "Vakit girdi";
      return;
    }

    const h = String(Math.floor(diff / 1000 / 3600)).padStart(2, "0");
    const m = String(Math.floor(diff / 1000 / 60) % 60).padStart(2, "0");
    const s = String(Math.floor(diff / 1000) % 60).padStart(2, "0");

    document.getElementById("next-countdown").innerText = `${h}:${m}:${s}`;
  }, 1000);
}

// ======================= Sayfa Açılınca =======================
loadTimings();
// update
