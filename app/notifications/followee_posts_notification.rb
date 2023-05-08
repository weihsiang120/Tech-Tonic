class FolloweePostsNotification < Noticed::Base
  deliver_by :database

  param :post
  param :user

  def message
    "#{params[:user].username ? params[:user].username : params[:user].email}發布了新文章：#{params[:post].title}"
  end
  
  def url
    post_path(id: params[:post].id)
  end
end
