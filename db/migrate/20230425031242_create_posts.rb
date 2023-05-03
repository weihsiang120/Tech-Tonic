class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.string :status
      t.datetime :deleted_at
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
