const mockData = {
  "PKG123": [
    {
      stage: "Shipped",
      timestamp: "2025-06-01 10:30",
      managerId: "M123",
      sealStatus: "Sealed"
    },
    {
      stage: "In Transit",
      timestamp: "2025-06-03 14:00",
      managerId: "M456",
      sealStatus: "Sealed"
    },
    {
      stage: "Delivered",
      timestamp: "2025-06-05 16:45",
      managerId: "M789",
      sealStatus: "Sealed"
    }
  ]
};

const params = new URLSearchParams(window.location.search);
const pkgId = params.get("pkg");

if (pkgId && mockData[pkgId]) {
  const container = document.getElementById("timelineContainer");

  mockData[pkgId].forEach(stage => {
    const div = document.createElement("div");
    div.className = "timeline-stage";
    div.innerHTML = `
      <h3>${stage.stage}</h3>
      <div class="meta">📅 <strong>Timestamp:</strong> ${stage.timestamp}</div>
      <div class="meta">🧑 <strong>Manager ID:</strong> ${stage.managerId}</div>
      <div class="meta">🔐 <strong>Seal Status:</strong> ${stage.sealStatus}</div>
    `;
    container.appendChild(div);
  });
} else if (pkgId) {
  document.getElementById("timelineContainer").innerHTML = `<p>Package ID not found.</p>`;
}
