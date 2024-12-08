import { Controller } from "@hotwired/stimulus";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";

export default class extends Controller {
  connect() {
    const calendar = new Calendar(this.element, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: jaLocale,
      events: '/events.json',
      selectable: true,
      editable: true,

      dateClick: (info) => {
        const date = info.dateStr; // yyyy-mm-dd 形式の日付
        window.location.href = `/events/dates/${date}`;
      },

      eventClick: (info) => {
        if (confirm('このイベントを削除しますか？')) {
          fetch(`/events/${info.event.id}`, {
            method: 'DELETE',
            headers: {
              'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
            },
          })
            .then((response) => response.json())
            .then(() => {
              calendar.refetchEvents();
            });
        }
      },
    });

    calendar.render();
  }
}
