class ChangeTimeColumnTypeInEvents < ActiveRecord::Migration[7.2]
  def change
    change_column :events, :time, :datetime, using: "TO_TIMESTAMP(CONCAT('2000-01-01 ', time::text), 'YYYY-MM-DD HH24:MI:SS')"
  end
end
