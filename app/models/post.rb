class Post < ApplicationRecord
  paginates_per 10
  attr_accessor :tag_list
  belongs_to :user
  has_many :post_tags
  has_many :tags, through: :post_tags
  has_many :comments, dependent: :destroy
  acts_as_votable
  default_scope { where(deleted_at: nil) }
  
  def destroy
    update(deleted_at: Time.current)
  end
end
