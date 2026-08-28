function loadTimings() {
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;

  const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`;

  document.getElementById("vakitler").innerHTML = "Yükleniyor...";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const t = data.data.timings;
      document.getElementById("vakitler").innerHTML = `
        <strong>İmsak:</strong> ${t.Imsak}<br>
        <strong>Güneş:</strong> ${t.Sunrise}<br>
        <strong>Öğle:</strong> ${t.Dhuhr}<br>
        <strong>İkindi:</strong> ${t.Asr}<br>
        <strong>Akşam:</strong> ${t.Maghrib}<br>
        <strong>Yatsı:</strong> ${t.Isha}
      `;
    })
    .catch(err => {
      document.getElementById("vakitler").innerHTML =
        "Bir hata oluştu, daha sonra tekrar dene.";
      console.error(err);
    });
}

document.getElementById("loadBtn").addEventListener("click", loadTimings);
loadTimings();
