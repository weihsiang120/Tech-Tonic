class ChangeStatusDefaultInPosts < ActiveRecord::Migration[7.0]
  def change
    change_column_default :posts, :status, from: "draft", to: nil
  end
end
