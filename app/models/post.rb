class Post < ApplicationRecord
  attr_accessor :tag_list
  belongs_to :user
  has_many :post_tags
  has_many :tags, through: :post_tags

  default_scope { where(deleted_at: nil) }
  
  def destroy
    update(deleted_at: Time.current)
  end
end
