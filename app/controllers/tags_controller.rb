
class TagsController < ApplicationController
  before_action :authenticate_user!, only: %i[ follow ]
  def show
    @tag = Tag.find(params[:id])
    @posts = @tag.posts
  end

  def follow
    @tag = Tag.find(params[:id])

    if !current_user.tags.include?(@tag)
      current_user.tags << @tag
      redirect_to tag_path(@tag.id), notice: "已追蹤#{@tag.name}"
    else
      current_user.tags.delete(@tag)
      redirect_to tag_path(@tag.id), notice: "已退追#{@tag.name}"
    end
     
  end
end
