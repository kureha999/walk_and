class CreateEvents < ActiveRecord::Migration[7.2]
  def change
    create_table :events do |t|
      t.string :title
      t.integer :event_type
      t.time :time
      t.text :comment

      t.timestamps
    end
  end
end
