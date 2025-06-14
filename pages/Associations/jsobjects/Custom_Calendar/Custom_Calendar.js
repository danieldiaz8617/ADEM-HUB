export default {
  // Properly parse MM/DD/YYYY and 12-hour time into ISO format
  parseDate: (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return null;

    const [month, day, year] = dateStr.split('/');
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes, seconds] = time.split(':');

    hours = parseInt(hours);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const isoDateTime = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    const date = new Date(isoDateTime);

    return isNaN(date.getTime()) ? null : date.toISOString();
  },

  // Convert Activities.data into valid FullCalendar event format
  eventData: () => {
    return Activities.data
      .filter(item => item["Date"] && item["StartTime"] && item["EndTime"])
      .map(item => ({
        title: item["Activity"] || "Untitled Activity",
        start: Custom_Calendar.parseDate(item["Date"], item["StartTime"]),
        end: Custom_Calendar.parseDate(item["Date"], item["EndTime"]),
        extendedProps: {
          id: item["ID"],
          associationId: item["AssociationsID"],
          participants: item["Participants"],
          attendanceMode: item["AttendanceMode"],
          location: item["Location"],
          notes: item["Notes"],
          rowIndex: item["rowIndex"]
        }
      }));
  },

  htmlDoc: () => {
    return Custom_Calendar.buildHtml(Custom_Calendar.eventData());
  },

  buildHtml: (events) => {
    const eventsJson = JSON.stringify(events);
    return `
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='utf-8'/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script src='https://www.unpkg.com/fullcalendar@6.1.8/index.global.min.js'></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      var calendarEl = document.getElementById('calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        buttonIcons: true,
        weekends: true,
        eventColor: '${appsmith.theme.colors.primaryColor}',
        events: ${eventsJson},
        eventClick: function(info) {
          const event = info.event;
          const props = event.extendedProps;

          const content = \`
            <strong>\${event.title}</strong><br/>
            <b>Time:</b> \${event.start.toLocaleTimeString()} - \${event.end.toLocaleTimeString()}<br/>
            <b>Location:</b> \${props.location || "N/A"}<br/>
            <b>Attendance Mode:</b> \${props.attendanceMode || "N/A"}<br/>
            <b>Participants:</b> \${props.participants || "N/A"}<br/>
            <b>Notes:</b> \${props.notes || "N/A"}
          \`;

          const modal = document.getElementById('eventModal');
          document.getElementById('modalContent').innerHTML = content;
          modal.style.display = 'flex';
        },
        dateClick: function(info) {
          window.parent.postMessage(JSON.stringify(info), '*');
        }
      });
      calendar.render();

      document.getElementById('closeModal').onclick = function () {
        document.getElementById('eventModal').style.display = 'none';
      };
      window.onclick = function(event) {
        const modal = document.getElementById('eventModal');
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
    });
  </script>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
      font-family: 'Trebuchet MS', sans-serif;
    }
    #calendar {
      width: 100vw;
      height: 100vh;
    }
    .fc-event {
      font-size: 10pt;
    }
    button {
      background: ${appsmith.theme.colors.primaryColor} !important;
      border: none !important;
    }

    #eventModal {
      display: none;
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.4);
      justify-content: center;
      align-items: center;
    }
    #modalBox {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      box-sizing: border-box;
    }
    #closeModal {
      float: right;
      font-size: 1.2rem;
      cursor: pointer;
    }
    #modalContent {
      margin-top: 10px;
      font-size: 0.95rem;
      word-wrap: break-word;
    }
  </style>
</head>
<body>
  <div id='calendar'></div>
  <div id="eventModal">
    <div id="modalBox">
      <span id="closeModal">&times;</span>
      <div id="modalContent"></div>
    </div>
  </div>
</body>
</html>`;
  },

  objToRows: (obj = Custom_Calendar.eventData()[0]) =>
    Object.keys(obj).reduce((newArr, key) => newArr.concat({
      prop: key,
      value: obj[key]
    }), [])
};