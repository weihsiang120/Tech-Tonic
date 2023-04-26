class TagsController < ApplicationController
  before_action :authenticate_user!, only: %i[ follow ]
  def show
    @tag = Tag.find(params[:id])
    @posts = @tag.posts
  end

  def follow
    @tag = Tag.find(params[:id])
    current_user.tags << @tag if !current_user.tags.include?(@tag)
    redirect_to tag_path(@tag.id), notice: "已追蹤#{@tag.name}"
  end
end
