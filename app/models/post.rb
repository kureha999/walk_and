class Post < ApplicationRecord
  belongs_to :user
  has_one_attached :image

  validates :body, presence: true, length: { maximum: 200 }
  validates :image, presence: true, unless: :image_optional?

  private

  def image_optional?
    body.blank? # 本文が空でない場合のみ画像を必須にする
  end
end
