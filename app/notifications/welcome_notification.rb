# To deliver this notification:
#
# WelcomeNotification.with(post: @post).deliver_later(current_user)
# WelcomeNotification.with(post: @post).deliver(current_user)

class WelcomeNotification < Noticed::Base
  deliver_by :database

  param :user

  def message
    "Hello world, #{ params[:user].username ? params[:user].username : params[:user].email }"
  end

  def url
    root_path
  end
end
