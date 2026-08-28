function loadTimings() {
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;

  const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const t = data.data.timings;

      // Yeni kutulara yaz
      document.getElementById("imsak").innerText = t.Imsak;
      document.getElementById("gunes").innerText = t.Sunrise;
      document.getElementById("ogle").innerText = t.Dhuhr;
      document.getElementById("ikindi").innerText = t.Asr;
      document.getElementById("aksam").innerText = t.Maghrib;
      document.getElementById("yatsi").innerText = t.Isha;
    })
    .catch(err => {
      console.error(err);
    });
}

document.getElementById("loadBtn").addEventListener("click", loadTimings);
loadTimings();
