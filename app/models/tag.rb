# frozen_string_literal: true

class Tag < ApplicationRecord
  has_many :post_tags
  has_many :posts, through: :post_tags

  has_many :user_follow_tags
  has_many :users, through: :user_follow_tags
end
