# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  provider               :string
#  uid                    :string
#  name                   :string
#  avatar                 :string
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2, :github]
         # :confirmable
  
  has_many :posts
  acts_as_voter
  has_many :user_follow_tags
  has_many :tags, through: :user_follow_tags
  
  has_many :followed_users, foreign_key: :follower_id, class_name: "UserFollowRelationship"
  has_many :followees, through: :followed_users

  has_many :following_users, foreign_key: :followee_id, class_name: "UserFollowRelationship"
  has_many :followers, through: :following_users

  has_many :notifications, as: :recipient

 def self.from_omniauth(auth)
   find_or_create_by(provider: auth.provider, uid: auth.uid) do |user|
    user.provider = auth.provider
     user.email = auth.info.email
     user.password = Devise.friendly_token[0, 20]
     user.name = auth.info.name   # assuming the user model has a name
     user.avatar = auth.info.image # assuming the user model has an image
     # If you are using confirmable and the provider(s) you use validate emails, 
     # uncomment the line below to skip the confirmation emails.
     # user.skip_confirmation!
   end
   
 end

 has_many :posts, dependent: :destroy
 has_many :comments

end
