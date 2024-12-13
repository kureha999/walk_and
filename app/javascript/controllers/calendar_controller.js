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

      dateClick: (info) => {
        const date = info.dateStr;
        window.location.href = `/events/${date}`;  // IDを使ったイベント詳細ページへの遷移
      }
    });

    calendar.render();
  }
}
