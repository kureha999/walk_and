class RemoveImageFromPosts < ActiveRecord::Migration[7.2]
  def change
    remove_column :posts, :image, :string # ActiveStorageを使用するため削除
  end
end
