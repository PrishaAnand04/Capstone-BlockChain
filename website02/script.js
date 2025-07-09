const form = document.getElementById('qrForm');
const qrDiv = document.getElementById('qrcode');
const reportBtn = document.getElementById('reportBtn');
const tamperingLogs = document.getElementById('tamperingLogs');
const logList = document.getElementById('logList');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const managerID = document.getElementById('managerID').value;
  const stage = document.getElementById('stage').value;
  const sealStatus = document.getElementById('sealStatus').value;
  const timestamp = new Date().toLocaleString();

  const data = {
    managerID,
    stage,
    sealStatus,
    timestamp,
  };

  // Display QR Code
  qrDiv.innerHTML = '';
  QRCode.toCanvas(JSON.stringify(data), function (err, canvas) {
    if (err) console.error(err);
    qrDiv.appendChild(canvas);
  });

  // Update Display
  document.getElementById('prevStage').textContent = stage;
  document.getElementById('prevManager').textContent = managerID;
  document.getElementById('prevTimestamp').textContent = timestamp;
  document.getElementById('prevSeal').textContent = sealStatus;

  // Simulate blockchain log
  const logEntry = document.createElement('li');
  logEntry.innerHTML = `<strong>${stage}</strong> updated by <em>${managerID}</em> at ${timestamp} | Seal: ${sealStatus}`;
  logList.appendChild(logEntry);
});

// Report tampering
reportBtn.addEventListener('click', () => {
  const timestamp = new Date().toLocaleString();
  const tamperNote = document.createElement('p');
  tamperNote.style.color = "#e74c3c";
  tamperNote.style.fontWeight = "bold";
  tamperNote.innerText = `🚨 Tampering reported at ${timestamp}`;
  tamperingLogs.appendChild(tamperNote);

  // Blockchain-like log
  const tamperLog = document.createElement('li');
  tamperLog.innerHTML = `<span style="color:#c0392b; font-weight:bold;">🚨 Tampering Alert</span> logged at ${timestamp}`;
  logList.appendChild(tamperLog);
});

// Simulated sensor update (replace with real polling in production)
function simulateSensorUpdate() {
  const sampleData = {
    tagId: 'RFID123456',
    status: 'Scanned',
    location: 'Warehouse B',
    actor: 'Transporter',
    timestamp: new Date().toLocaleString(),
  };

  document.getElementById('sensorPackage').textContent = sampleData.tagId;
  document.getElementById('sensorStatus').textContent = sampleData.status;
  document.getElementById('sensorLocation').textContent = sampleData.location;
  document.getElementById('sensorTime').textContent = sampleData.timestamp;
  document.getElementById('sensorActor').textContent = sampleData.actor;

  // Optional: Add to blockchain log UI
  const logEntry = document.createElement('li');
  logEntry.innerHTML = `<strong>Sensor Scan</strong> from <em>${sampleData.actor}</em> at ${sampleData.timestamp} | Status: ${sampleData.status}`;
  logList.appendChild(logEntry);
}

// Simulate update every 15 seconds
setInterval(simulateSensorUpdate, 15000);
