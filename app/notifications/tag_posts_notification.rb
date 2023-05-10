class TagPostsNotification < Noticed::Base

  deliver_by :database
  param :tag
  def message
    "標籤##{params[:tag].name}有新貼文"
  end
  
  def url
    tag_path(id: params[:tag].id)
  end
end
