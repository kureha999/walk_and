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
      timeZone: 'Asia/Tokyo',
      locale: jaLocale,
      events: '/events.json',
      selectable: true,
      editable: true,

      dateClick: (info) => {
        const date = info.dateStr;
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
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to delete event');
              }
              return response.json();
            })
            .then(() => {
              info.event.remove(); // カレンダーから削除
              alert('イベントを削除しました');
            })
            .catch((error) => {
              alert('イベントの削除に失敗しました');
              console.error(error);
            });
        }
      },
    });

    calendar.render();
  }
}
