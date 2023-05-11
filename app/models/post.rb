class Post < ApplicationRecord

  paginates_per 10
  attr_accessor :tag_list
  belongs_to :user
  has_many :post_tags
  has_many :tags, through: :post_tags
  has_many :comments, dependent: :destroy
  acts_as_votable
  validate :tags_cannot_be_more_than_5
  default_scope { where(deleted_at: nil) }
  scope :published, -> { where(status: "published") }
  
  def destroy
    update(deleted_at: Time.current)
  end

  def add_tags(tag_list)
    if tag_list
      tag_list = tag_list.split(/\s*,\s*/).map(&:downcase)
                                          .map(&:strip)
                                          .map(&:squish)
                                          .map { |tag| tag.gsub(/[\p{P}\p{S}\p{C}\p{Z}]+/, '_') }
                                          .uniq
      tag_list.each do |tag_name|
        tag = Tag.find_or_initialize_by(name: tag_name)
        if tag.new_record?
          self.tags.build(name: tag_name)
        else
          self.tags << tag
        end
      end
    end
  end

  def tags_cannot_be_more_than_5
    errors.add(:base, "文章最多只能有五個標籤！") if self.tags.size > 5
  end

end
