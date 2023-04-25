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
         :omniauthable, :confirmable, omniauth_providers: [:google_oauth2, :github]
  
  has_many :posts
  has_many :user_follow_tags
  has_many :tags, through: :user_follow_tags
  

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


end
