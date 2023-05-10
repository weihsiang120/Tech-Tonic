# To deliver this notification:
#
# FollowedNotification.with(post: @post).deliver_later(current_user)
# FollowedNotification.with(post: @post).deliver(current_user)

class FollowedNotification < Noticed::Base
  deliver_by :database

  param :user

  def message
    "#{ params[:user].username ? params[:user].username : params[:user].email }追蹤了你"
  end

  def url
    user_path(id: params[:user].id)
  end
end
