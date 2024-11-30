class ChangeImageNullConstraintOnPosts < ActiveRecord::Migration[7.2]
  def change
    change_column_null :posts, :image, true # imageカラムをnull許可に変更
  end
end
