class User < ApplicationRecord
  validates :line_user_id, presence: true, uniqueness: true
  validates :name, presence: true
  validates :picture, presence: true
end
