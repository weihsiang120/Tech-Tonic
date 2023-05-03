class Post < ApplicationRecord

  paginates_per 10
  attr_accessor :tag_list
  belongs_to :user
  has_many :post_tags
  has_many :tags, through: :post_tags
  has_many :comments, dependent: :destroy

  validate :tags_cannot_be_more_than_5

  default_scope { where(deleted_at: nil) }
  
  def destroy
    update(deleted_at: Time.current)
  end

  def self.search(keyword)
    where("title like ? or content like ?", "%#{keyword}%", "%#{keyword}%")
  end

  def add_tags(tag_list)
    if tag_list
      tag_list = tag_list.split(",")
      tag_list.each do |tag_name|
        tag = Tag.find_or_create_by(name: tag_name.downcase.strip.squish.gsub(/[\p{P}\p{S}\p{C}\p{Z}]+/,"_"))
        self.tags.build(name: tag.name)
      end
    end
  end

  def tags_cannot_be_more_than_5
    errors.add(:base, "文章最多只能有五個標籤！") if self.tags.size > 5
  end
  # 狀態機
  


end
