fetch('bookings.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('calendar');

    data.forEach(b => {
      const el = document.createElement('p');
      el.textContent = `Booked: ${b.start} → ${b.end}`;
      container.appendChild(el);
    });
  });