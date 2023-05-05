class CreateUserFollowRelationships < ActiveRecord::Migration[7.0]
  def change
    create_table :user_follow_relationships do |t|
      t.belongs_to :follower, null: false
      t.belongs_to :followee, null: false

      t.timestamps
    end
    add_foreign_key :user_follow_relationships, :users, column: :follower_id
    add_foreign_key :user_follow_relationships, :users, column: :followee_id
    add_index :user_follow_relationships, [:follower_id, :followee_id], unique: true
  end
end
