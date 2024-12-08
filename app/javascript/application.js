// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import Rails from "@rails/ujs";
Rails.start();

// FullCalendar をインポート(カレンダー,日表示,イベント,日本語)
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';

document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');

  if (calendarEl) {
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: jaLocale,
      events: '/events.json', // イベントをサーバーから取得
      selectable: true,
      editable: true,

      // 日付をクリックした際の動作
      dateClick: (info) => {
        const title = prompt('イベントタイトルを入力してください:');
        if (title) {
          fetch('/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
            },
            body: JSON.stringify({
              event: {
                title: title,
                event_type: 0, // デフォルトでお散歩
                time: info.dateStr,
                comment: '',
              },
            }),
          })
            .then((response) => response.json())
            .then(() => {
              calendar.refetchEvents();
            });
        }
      },

      // イベントをクリックした際の動作
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

    // イベント追加ボタンの動作
    document.getElementById('add-event-button').addEventListener('click', () => {
      const title = prompt('イベントタイトルを入力してください:');
      const time = prompt('時間を HH:MM 形式で入力してください:');
      if (title && time) {
        fetch('/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
          },
          body: JSON.stringify({
            event: {
              title: title,
              event_type: 0, // デフォルトでお散歩
              time: time,
              comment: '',
            },
          }),
        })
          .then((response) => response.json())
          .then(() => {
            calendar.refetchEvents();
          });
      }
    });
  }
});
