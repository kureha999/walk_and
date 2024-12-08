class Event < ApplicationRecord
  belongs_to :user

  enum event_type: { Walk: 0, Food: 1 }

  validates :title, presence: true
  validates :time, presence: true
end
