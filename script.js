// subjects list
  const subjects = ["Türkçe","Tarih","Coğrafya","Din","Matematik","Fizik","Kimya","Biyoloji"];

  // helpers to create rows inside the correct <tbody>
  function createPreviousRows(){
    const tbody = document.querySelector('#previousTable tbody');
    tbody.innerHTML = '';
    subjects.forEach(sub=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${sub}</td>
        <td><input type=\"number\" id=\"prev-${sub}-correct\" min=\"0\" step=\"1\"></td>
        <td><input type=\"number\" id=\"prev-${sub}-wrong\" min=\"0\" step=\"1\"></td>
        <td><input type=\"number\" id=\"prev-${sub}-blank\" min=\"0\" step=\"1\"></td>
      `;
      tbody.appendChild(tr);
    });
  }

  function createInputRows(){
    const tbody = document.querySelector('#inputTable tbody');
    tbody.innerHTML = '';
    subjects.forEach(sub=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${sub}</td>
        <td><input type=\"number\" id=\"${sub}-correct\" min=\"0\" step=\"1\"></td>
        <td><input type=\"number\" id=\"${sub}-wrong\" min=\"0\" step=\"1\"></td>
        <td><input type=\"number\" id=\"${sub}-blank\" min=\"0\" step=\"1\"></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // NET calculation per user requirement (allow float)
  function calculateNET(correct, wrong){
    return correct - (wrong / 4);
  }

  // populate initial rows
  createPreviousRows();
  createInputRows();

  // main calculation
  function calculateResults(){
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = '';

    subjects.forEach(sub=>{
      const c = Number(document.getElementById(`${sub}-correct`).value) || 0;
      const w = Number(document.getElementById(`${sub}-wrong`).value) || 0;
      const b = Number(document.getElementById(`${sub}-blank`).value) || 0;
      const pc = Number(document.getElementById(`prev-${sub}-correct`).value) || 0;
      const pw = Number(document.getElementById(`prev-${sub}-wrong`).value) || 0;
      const pb = Number(document.getElementById(`prev-${sub}-blank`).value) || 0;
      const prev = calculateNET(pc, pw);

      const currentNET = calculateNET(c,w);
      const perc = calculatePercentage(currentNET, c, w, b);
      const progress = currentNET - prev;

      const tr = document.createElement('tr');
      
        // Percentage = NET / (correct+wrong+blank) * 100
  function calculatePercentage(net, correct, wrong, blank){
    const total = correct + wrong + blank;
    return ((currentNET - prev) / total) * 100;
  }
      tr.innerHTML = `
        <td>${sub}</td>
        <td>${prev.toFixed(2)}</td>
        <td>${currentNET.toFixed(2)}</td>
        <td style=\"color:${progress>=0? 'green':'red'}\">${progress.toFixed(2)}</td>
        <td>${perc.toFixed(2)}</td>
      `;
      resultsBody.appendChild(tr);
    });
  }

  // save current NET values into previous inputs (useful to quickly mark current as previous)
  function saveCurrentAsPrevious(){
    subjects.forEach(sub=>{
      const c = Number(document.getElementById(`${sub}-correct`).value) || 0;
      const w = Number(document.getElementById(`${sub}-wrong`).value) || 0;
      const b = Number(document.getElementById(`${sub}-blank`).value) || 0;
      document.getElementById(`prev-${sub}-correct`).value = c;
      document.getElementById(`prev-${sub}-wrong`).value = w;
      document.getElementById(`prev-${sub}-blank`).value = b;
    });
  }

  // wire buttons
  document.getElementById('calcBtn').addEventListener('click', calculateResults);
  document.getElementById('saveBtn').addEventListener('click', ()=>{ saveCurrentAsPrevious(); calculateResults(); });