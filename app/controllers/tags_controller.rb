class TagsController < ApplicationController
  def show
    @tag = Tag.find_by(id: params[:id])
    @posts = @tag.posts
  end
end
