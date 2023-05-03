class Post < ApplicationRecord
  belongs_to :user
  has_many :post_tags
  has_many :tags, through: :post_tags
  has_many :comments, dependent: :destroy
  acts_as_votable
  default_scope { where(deleted_at: nil) }
  
  def destroy
    update(deleted_at: Time.current)
  end

  def self.search(keyword)
    where("title like ? or content like ?", "%#{keyword}%", "%#{keyword}%")
  end

  # 狀態機
end
