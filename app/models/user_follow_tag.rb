# frozen_string_literal: true

class UserFollowTag < ApplicationRecord
  belongs_to :user
  belongs_to :tag
end
