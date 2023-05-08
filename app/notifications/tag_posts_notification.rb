class TagPostsNotification < Noticed::Base

  deliver_by :database
  param :tag
  def message
    "你追蹤的標籤##{params[:tag].name}有新的貼文"
  end
  
  def url
    tag_path(id: params[:tag].id)
  end
end
